import { Component, OnInit } from '@angular/core';
import { Student } from '../../models/student.interface';
import { STUDENTS } from '../../data/students.data';

@Component({
  selector: 'app-stud-dashboard',
  templateUrl: './stud-dashboard.component.html',
  styleUrls: ['./stud-dashboard.component.scss']
})

export class StudDashboardComponent implements OnInit {
  students: Student[] = STUDENTS;
  selectedStudent: Student | null = null;
  isEdit = false;

  constructor() { }

  ngOnInit(): void {}

  onAddStudent(student: Student) {
    const maxRollNo = this.students.length ? Math.max(...this.students.map(s => s.rollNo)) : 0;
    student.rollNo = maxRollNo + 1;
    this.students = [...this.students, { ...student }];
  }

  onEditStudent(student: Student) {
    this.selectedStudent = { ...student };
    this.isEdit = true;
  }

  onUpdateStudent(student: Student) {
    this.students = this.students.map(s => s.rollNo === student.rollNo ? { ...student } : s);
    this.selectedStudent = null;
    this.isEdit = false;
  }

  onRemoveStudent(rollNo: number) {
    this.students = this.students.filter(s => s.rollNo !== rollNo);
    if (this.selectedStudent && this.selectedStudent.rollNo === rollNo) {
      this.selectedStudent = null;
      this.isEdit = false;
    }
  }

  onCancelEdit() {
    this.selectedStudent = null;
    this.isEdit = false;
  }

}
