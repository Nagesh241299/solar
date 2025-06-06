import { Component, Input, OnInit } from '@angular/core';
import { Menu, NavService } from '../../services/nav.service';
import { SidebarRightService } from '../../services/sidebar-right.service';
import { SwitcherService } from '../../services/switcher.service';

@Component({
  selector: 'app-header-breadcrumb',
  templateUrl: './header-breadcrumb.component.html',
  styleUrls: ['./header-breadcrumb.component.scss']
})
export class HeaderBreadcrumbComponent implements OnInit {

  @Input() title!: string;
  @Input() title1!: string;

  @Input() items!: Menu[];
  @Input() activeitem!: string;

  constructor(
    private sidebarRightservice: SidebarRightService,
    public navServices: NavService,
    public SwitcherService : SwitcherService,
  ) { }
  ngOnInit(): void {
  }

  toggleSidebarNotification() {
    this.sidebarRightservice.emitSidebarNotifyChange(true);
  }
  toggleSwitcher() {
    this.SwitcherService.emitChange(true);
    document.querySelector('body')?.classList.remove("sidenav-toggled-open");
  }
}
