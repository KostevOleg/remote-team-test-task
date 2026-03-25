import { Component, HostListener, OnInit, signal } from '@angular/core';
import {HeaderComponent} from './layout/header/header';
import { SearchMobileComponent } from './layout/mobile-search/mobile-search';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, SearchMobileComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App  implements OnInit{
  isSearchOpen = signal(false);
  isMobile = signal(window.matchMedia('(max-width: 650px)').matches);
  media! :MediaQueryList

  ngOnInit() {
    this. media = window.matchMedia('(max-width: 650px)');

    this.media.addEventListener('change', (e) => {
      this.isMobile.set(e.matches);
    });
  }
  @HostListener('window:resize')
    onResize() {
      if (window.innerWidth > 650) {
        this.isSearchOpen.set(false);
      }
  }

  openSearch() {
    if (this.isMobile()) {
      this.isSearchOpen.set(true);
    }
  }
  closeSearch(){
    this.isSearchOpen.set(false)
  }
  onChange = (e: MediaQueryListEvent) => {
    this.isMobile.set(e.matches);
  };
  ngOnDestroy() {
    this.media.removeEventListener('change', this.onChange);
  }
}
