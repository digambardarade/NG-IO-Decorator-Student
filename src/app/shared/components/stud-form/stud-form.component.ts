import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Student } from '../../models/student.interface';

@Component({
  selector: 'app-stud-form',
  templateUrl: './stud-form.component.html',
  styleUrls: ['./stud-form.component.scss']
})

export class StudFormComponent implements OnInit, OnChanges, AfterViewInit {
    @ViewChild('nameInput') nameInputRef!: ElementRef;
    ngAfterViewInit(): void {
      this.setFocusToName();
    }

    setFocusToName() {
      setTimeout(() => {
        if (this.nameInputRef) {
          this.nameInputRef.nativeElement.focus();
        }
      });
    }
  @Input() student: Student | null = null;
  @Output() addStudent = new EventEmitter<Student>();
  @Output() updateStudent = new EventEmitter<Student>();
  @Output() cancelEdit = new EventEmitter<void>();

  form: Student = { rollNo: 0, name: '', gender: 'Male', dob: '', department: '' };
  isEdit = false;

  constructor() { }


  ngOnInit(): void {
    if (this.student) {
      this.form = { ...this.student };
      this.isEdit = true;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['student']) {
      if (this.student) {
        this.form = { ...this.student };
        this.isEdit = true;
      } else {
        this.form = { rollNo: 0, name: '', gender: 'Male', dob: '', department: '' };
        this.isEdit = false;
      }
      this.setFocusToName();
    }
  }

  onSubmit() {
    if (this.isEdit) {
      this.updateStudent.emit(this.form);
    } else {
      this.addStudent.emit(this.form);
      this.form = { rollNo: 0, name: '', gender: 'Male', dob: '', department: '' };
      this.setFocusToName();
    }
  }

  onReset() {
    this.form = { rollNo: 0, name: '', gender: 'Male', dob: '', department: '' };
    this.setFocusToName();
  }

  onCancel() {
    this.cancelEdit.emit();
    this.form = { rollNo: 0, name: '', gender: 'Male', dob: '', department: '' };
    this.isEdit = false;
  }
}
