import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostListener, inject, Input, Output, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule],
  templateUrl: './search.html',
  styleUrl: './search.scss',
   standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent {
  searchValue = new FormControl('');
  isFocused = signal(false);

  el = inject(ElementRef);
  @Input() ignoreSelector?: string;
  @Output() close = new EventEmitter<void>();

  @HostListener('document:click', ['$event'])
  handleClick(event: MouseEvent) {
    const target = event.target as HTMLElement;

    if (!this.el.nativeElement.contains(target)) {
      this.isFocused.set(false);
      this.close.emit();
    }
  }

  onFocus() {
    this.isFocused.set(true);
  }
}
