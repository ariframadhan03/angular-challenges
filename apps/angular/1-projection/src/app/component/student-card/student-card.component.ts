import { NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardType } from '../../model/card.model';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      [list]="students"
      [type]="cardType"
      imageUrl="assets/img/student.webp"
      style="background-color: rgba(0, 250, 0, 0.1)"
      label="firstName"
      (addNewItem)="addNewStudent()"
      (delete)="deleteStudent($event)"></app-card>
  `,
  standalone: true,
  imports: [CardComponent, NgStyle],
})
export class StudentCardComponent implements OnInit {
  students: Student[] = [];
  cardType = CardType.STUDENT;

  constructor(
    private http: FakeHttpService,
    private store: StudentStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));

    this.store.students$.subscribe((s) => (this.students = s));
  }

  addNewStudent(): void {
    this.store.addOne(randStudent());
  }

  deleteStudent(id: number): void {
    this.store.deleteOne(id);
  }
}
