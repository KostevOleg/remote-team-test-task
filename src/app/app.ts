import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { HeaderComponent } from './layout/header/header';
import { SearchMobileComponent } from './layout/mobile-search/mobile-search';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, SearchMobileComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, OnDestroy {
  private readonly MOBILE_BREAKPOINT = 650;

  isSearchOpen = signal(false);
  isMobile = signal(false);

  private media!: MediaQueryList;

  ngOnInit() {
    this.media = window.matchMedia(`(max-width: ${this.MOBILE_BREAKPOINT}px)`);
    this.isMobile.set(this.media.matches);
    this.media.addEventListener('change', this.onChange);
  }

  openSearch() {
    if (this.isMobile()) {
      this.isSearchOpen.set(true);
    }
  }

  closeSearch() {
    this.isSearchOpen.set(false);
  }

  private onChange = (e: MediaQueryListEvent) => {
    this.isMobile.set(e.matches);
    if (!e.matches) {
      this.isSearchOpen.set(false);
    }
  };

  ngOnDestroy() {
    this.media.removeEventListener('change', this.onChange);
  }
}
