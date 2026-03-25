import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  signal,
  OnInit,
  OnDestroy
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { SearchComponent } from '../search/search';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, SearchComponent],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {

  private readonly MOBILE_BREAKPOINT = 650;

  isOpened = signal(false);
  isAnimated = signal(false);
  isMobileMenu = signal(false);

  @Output() openSearchEvrnt = new EventEmitter<void>();

  private media!: MediaQueryList;

  ngOnInit() {
    this.media = window.matchMedia(`(max-width: ${this.MOBILE_BREAKPOINT}px)`);
    this.media.addEventListener('change', this.onMediaChange);
  }

  private onMediaChange = (e: MediaQueryListEvent) => {
    // если перешли на мобилку — закрываем десктопный поиск
    if (e.matches) {
      const wasOpened = this.isOpened();

      this.isOpened.set(false);
      this.isAnimated.set(false);

      if (wasOpened) {
        this.openSearchEvrnt.emit();
      }
    }
  };

  private isMobile(): boolean {
    return this.media.matches;
  }

  toggleMenu(): void {
    this.isMobileMenu.update(v => !v);
  }

  openSearch(): void {
    if (this.isMobile()) {
      this.openSearchEvrnt.emit();
    } else {
      this.isOpened.set(true);
      this.isAnimated.set(true);
    }
  }

  closeSearch(): void {
    this.isOpened.set(false);
    this.isAnimated.set(false);
  }

  ngOnDestroy() {
    this.media.removeEventListener('change', this.onMediaChange);
  }
}
