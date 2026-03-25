import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostListener, Input, Output, signal, ViewChild } from '@angular/core';
import {RouterLink, } from '@angular/router';
import {SearchComponent} from '../search/search';
import { SearchMobileComponent } from '../mobile-search/mobile-search';

@Component({
  selector: 'app-header',
  imports: [RouterLink, SearchComponent, SearchMobileComponent],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  isOpened = signal(false)
  isAnimated = signal(false)
  isMobileMenu = signal(false)
  @Output() openSearchEvrnt = new EventEmitter<void>();

  @HostListener('window:resize')
    onResize() {
      if (this.isMobile()) {
        let wasOpened = this.isOpened()
        this.isAnimated.set(false);
        this.isOpened.set(false);
        if(wasOpened){
          console.log('emit')
          this.openSearchEvrnt.emit()
        }
      }
    }

  isMobile(){
    return window.innerWidth <= 650
  }

  toggleMenu():void{
    this.isMobileMenu.update(v => !v)
  }
  openSearch():void{
    if(this.isMobile()){
      this.openSearchEvrnt.emit()
    } else{
      this.isOpened.set(true)
      this.isAnimated.set(true)
    }
  }
  closeSearch():void{
    this.isOpened.set(false)
    setTimeout(()=>{
      this.isAnimated.set(false)
    }, 1000)
  }
}
