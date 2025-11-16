import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Student } from '../../models/student.interface';

@Component({
  selector: 'app-stud-table',
  templateUrl: './stud-table.component.html',
  styleUrls: ['./stud-table.component.scss'],
})

export class StudTableComponent implements OnInit {
  @Input() students: Student[] = [];
  @Output() editStudent = new EventEmitter<Student>();
  @Output() removeStudent = new EventEmitter<number>();

  // Pagination
  page: number = 1;
  pageSize: number = 9;

  constructor() {}

  ngOnInit(): void {}

  get pagedStudents(): Student[] {
    const start = (this.page - 1) * this.pageSize;
    return this.students.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.students.length / this.pageSize) || 1;
  }

  onEditStudent(student: Student) {
    this.editStudent.emit(student);
  }

  onRemoveStudent(rollNo: number) {
    this.removeStudent.emit(rollNo);
  }

  getAge(dob: string): number {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  prevPage() {
    if (this.page > 1) this.page--;
  }

  nextPage() {
    if (this.page < this.totalPages) this.page++;
  }

  goToPage(p: number) {
    if (p >= 1 && p <= this.totalPages) this.page = p;
  }
}
