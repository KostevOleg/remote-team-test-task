import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, signal, ViewChild } from '@angular/core';
import {RouterLink, } from '@angular/router';
import {SearchComponent} from '../search/search'
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Output() openSearchEvent = new EventEmitter<HTMLElement>();
  @ViewChild('btn') btn!: ElementRef;
  @Input() isOpened = false
  openSearch() {
    this.openSearchEvent.emit(this.btn.nativeElement);
  }
}
