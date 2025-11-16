import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Student } from '../../models/student.interface';

@Component({
  selector: 'app-stud-form',
  templateUrl: './stud-form.component.html',
  styleUrls: ['./stud-form.component.scss']
})

export class StudFormComponent implements OnInit, OnChanges, AfterViewInit {
  nameError: string = '';
  genderError: string = '';
  departmentError: string = '';
  maxDate: string = new Date().toISOString().split('T')[0];
  dobError: string = '';
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
    this.nameError = '';
    this.genderError = '';
    this.departmentError = '';
    this.dobError = '';

    let valid = true;
    if (!this.form.name.trim()) {
      this.nameError = 'Name is required.';
      valid = false;
    }
    if (!this.form.gender) {
      this.genderError = 'Gender is required.';
      valid = false;
    }
    if (!this.form.dob) {
      this.dobError = 'DOB is required.';
      valid = false;
    } else if (new Date(this.form.dob) > new Date()) {
      this.dobError = 'Future date is not allowed.';
      valid = false;
    }
    if (!this.form.department) {
      this.departmentError = 'Department is required.';
      valid = false;
    }
    if (!valid) {
      this.setFocusToName();
      return;
    }
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
