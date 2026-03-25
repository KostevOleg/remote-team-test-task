import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from "@angular/core"

@Component({
  selector: 'app-search-mobile',
  templateUrl: './mobile-search.html',
  styleUrl: 'mobile-search.scss',
  imports: [],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchMobileComponent {
  @Input() isOpen = false
  @Output() close = new EventEmitter<void>()

}
