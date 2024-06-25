import { Component, OnInit } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardType } from '../../model/card.model';
import { City } from '../../model/city.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="cities"
      [type]="cardType"
      imageUrl="assets/img/city.png"
      style="background-color: rgba(250, 0, 0, 0.1)"
      label="name"
      (addNewItem)="addNewCity()"
      (delete)="deleteCity($event)"></app-card>
  `,
  standalone: true,
  imports: [CardComponent],
})
export class CityCardComponent implements OnInit {
  cities: City[] = [];
  cardType = CardType.CITY;

  constructor(
    private http: FakeHttpService,
    private store: CityStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));

    this.store.cities$.subscribe((c) => (this.cities = c));
    console.log('cities', this.cities);
  }

  addNewCity(): void {
    this.store.addOne(randomCity());
  }

  deleteCity(id: number): void {
    this.store.deleteOne(id);
  }
}
