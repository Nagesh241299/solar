import { Component, OnInit } from '@angular/core';
import { SwitcherService } from 'src/app/shared/services/switcher.service';
import { Menu, NavService } from 'src/app/shared/services/nav.service';

@Component({
  selector: 'app-switcher-layout',
  templateUrl: './switcher-layout.component.html',
  styleUrls: ['./switcher-layout.component.scss']
})
export class SwitcherLayoutComponent implements OnInit {
  public menuItems!: Menu[];

  constructor(public SwitcherService : SwitcherService,
    public navServices: NavService,
    ) {
      this.navServices.items.subscribe((menuItems) => {
        this.menuItems = menuItems;
      });
   }

  ngOnInit(): void {
  }
  scrolled:boolean=false;

  ngOnDestroy(){
    location.reload();
  }
  toggleSwitcherBody() {
    this.SwitcherService.emitChange(false);

  }
  mainSidebarOpen!: string;
  hoverEffect($event: { type: string; }) {
    this.mainSidebarOpen = $event.type == 'mouseover' ? 'sidenav-toggled-open' : '';
  }
}
