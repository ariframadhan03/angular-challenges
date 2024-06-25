import { NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardType } from '../../model/card.model';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [style]="style">
      <img [src]="imageUrl" width="200px" />

      <section>
        <app-list-item
          *ngFor="let item of list"
          [name]="item[label]"
          [id]="item.id"
          [type]="type"
          (delete)="delete.emit($event)"></app-list-item>
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem.emit()">
        Add
      </button>
    </div>
  `,
  standalone: true,
  imports: [NgIf, NgFor, ListItemComponent, NgStyle],
})
export class CardComponent {
  @Input() list: any[] | null = null;
  @Input() type!: CardType;
  @Input() style = '';
  @Input() imageUrl!: string;
  @Input() label!: string;

  @Output() addNewItem: EventEmitter<string> = new EventEmitter<string>();
  @Output() delete: EventEmitter<number> = new EventEmitter<number>();

  CardType = CardType;
}
