import { Component, signal } from '@angular/core';
import {HeaderComponent} from './layout/header/header';
import {SearchComponent} from './layout/search/search'

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, SearchComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('frontend');
  isOpened= signal(false);
  openSearchEvent(){
    this.isOpened.set(true)
  }
  closeSearchEvent(){
    this.isOpened.set(false)
  }
}
