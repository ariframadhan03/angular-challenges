import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StudentStore } from '../../data-access/student.store';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardType } from '../../model/card.model';

@Component({
  selector: 'app-list-item',
  template: `
    <div class="border-grey-300 flex justify-between border px-2 py-1">
      {{ name }}
      <button (click)="delete.emit(id)">
        <img class="h-5" src="assets/svg/trash.svg" />
      </button>
    </div>
  `,
  standalone: true,
})
export class ListItemComponent {
  @Input() id!: number;
  @Input() name!: string;
  @Input() type!: CardType;

  @Output() delete: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private teacherStore: TeacherStore,
    private studentStore: StudentStore,
  ) {}

  // delete(id: number) {
  //   if (this.type === CardType.TEACHER) {
  //     this.teacherStore.deleteOne(id);
  //   } else if (this.type === CardType.STUDENT) {
  //     this.studentStore.deleteOne(id);
  //   }
  // }
}
