import { Component,HostListener, OnInit } from '@angular/core';
import { Menu, NavService } from 'src/app/shared/services/nav.service';
import { SwitcherService } from 'src/app/shared/services/switcher.service';

@Component({
  selector: 'app-full-content',
  templateUrl: './full-content.component.html',
  styleUrls: ['./full-content.component.scss']
})
export class FullContentComponent implements OnInit {
  public menuItems!: Menu[];

  constructor(       public SwitcherService: SwitcherService, public navServices: NavService,
    ) {
      this.navServices.items.subscribe((menuItems) => {
        this.menuItems = menuItems;
      });
   }
   scrolled:boolean=false;

  ngOnInit(): void {
    document.querySelector(".slide-leftRTL")?.classList.add("d-none");
    document.querySelector(".slide-rightRTL")?.classList.add("d-none");
  }
  toggleSwitcherBody() {
    this.SwitcherService.emitChange(false);

  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrolled = window.scrollY > 74;
  }
  ngOnDestroy(){
    location.reload();
  }
}
