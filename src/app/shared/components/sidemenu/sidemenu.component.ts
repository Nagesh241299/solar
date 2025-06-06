import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Subscription, fromEvent } from 'rxjs';
import { Menu, NavService } from '../../services/nav.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { checkHoriMenu, parentNavActive, switcherArrowFn } from './sidemenu';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {
  public windowSubscribe$!: Subscription;

  public menuItems!: Menu[];
  public url!: string;

  sidenavtoggled1!: string | void;

  //For Horizontal Menu
  public margin = 0;
  public width = window.innerWidth;
  profile: any = '';

  constructor(
    private breakpointObserver: BreakpointObserver,

    private router: Router,
    private navServices: NavService,
    public elementRef: ElementRef
  ) {
    this.navServices.items.subscribe(menuItems => {
      this.menuItems = menuItems;
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          menuItems.filter(items => {
            if (items.path === event.url) {
              this.setNavActive(items);
            }
            if (!items.children) { return false; }
            items.children.filter(subItems => {
              if (subItems.path === event.url) {
                this.setNavActive(subItems);
              }
              if (!subItems.children) { return false; }
              subItems.children.filter(subSubItems => {
                if (subSubItems.path === event.url) {
                  this.setNavActive(subSubItems);
                }
              });

              return true;
            });

            return true;
          });
        }
      });
    });
    this.checkNavActiveOnLoad();
  }
  checkNavActiveOnLoad() {
    this.navServices.items.subscribe((menuItems) => {
      this.menuItems = menuItems;

      this.router.events.subscribe((event) => {
        if (event instanceof NavigationStart) {
          this.closeNavActive();
          setTimeout(() => {
            const sidemenu = document.querySelectorAll('.side-menu__item.active');
            const subSidemenu = document.querySelectorAll(
              '.sub-side-menu__item.active'
            );
            sidemenu.forEach((e) => e.classList.remove('active'));
            subSidemenu.forEach((e) => e.classList.remove('active'));
          }, 100);
        }
        if (event instanceof NavigationEnd) {
          menuItems.filter((items) => {
            if (items.path === event.url) {
              this.setNavActive(items);
            }
            if (!items.children) {
              return false;
            }
            items.children.filter((subItems) => {
              if (subItems.path === event.url) {
                this.setNavActive(subItems);
              }
              if (!subItems.children) {
                return false;
              }
              subItems.children.filter((subSubItems) => {
                if (subSubItems.path === event.url) {
                  this.setNavActive(subSubItems);
                }
              });
              return true;
            });
            return true;
          });
          setTimeout(() => {
            parentNavActive();
          }, 200);
        }
      });
    });
  }
  //Active NavBar State
  setNavActive(item: Menu) {
    this.menuItems.filter((menuItem) => {
      if (menuItem !== item) {
        menuItem.active = false;
        const App = document.querySelector('.sidebar-mini');
        this.navServices.collapseSidebar = !this.navServices.collapseSidebar;
        App?.classList.remove('sidenav-toggled');

      }
      if (menuItem.children && menuItem.children.includes(item)) {
        menuItem.active = true;
      }
      if (menuItem.children) {
        menuItem.children.filter((submenuItems) => {
          if (submenuItems.children && submenuItems.children.includes(item)) {
            menuItem.active = true;
            submenuItems.active = true;
          }
        });
      }
    });
  }

  // Click Toggle menu
  toggleNavActive(item: Menu) {
    if (!item.active) {
      this.menuItems.forEach((a) => {
        if (this.menuItems.includes(item)) {
          a.active = false;
        }
        if (!a.children) { return false; }
        a.children.forEach((b) => {
          if (a.children && a.children.includes(item)) {
            b.active = false;
          }
        });

        return true;
      });
    }
    item.active = !item.active;
  }
  checkCurrentActive() {
    this.navServices.items.subscribe((menuItems) => {
      this.menuItems = menuItems;
      const currentUrl = this.router.url;
      menuItems.filter((items) => {
        if (items.path === currentUrl) {
          this.setNavActive(items);
        }
        if (!items.children) {
          return false;
        }
        items.children.filter((subItems) => {
          if (subItems.path === currentUrl) {
            this.setNavActive(subItems);
          }
          if (!subItems.children) {
            return false;
          }
          subItems.children.filter((subSubItems) => {
            if (subSubItems.path === currentUrl) {
              this.setNavActive(subSubItems);
            }
          });
          return true;
        });
        return true;
      });
    });
  }
  closeNavActive() {
    this.menuItems.forEach((a) => {
      if (this.menuItems) {
        a.active = false;
      }
      if (!a.children) {
        return false;
      }
      a.children.forEach((b) => {
        if (a.children) {
          b.active = false;
        }
      });
      return true;
    });
  }
  ngOnInit(): void {
    switcherArrowFn();
    this.profile = localStorage.getItem('user')
    // detect screen size changes
    this.breakpointObserver
      .observe(['(max-width: 992px)'])
      .subscribe((result: BreakpointState) => {
        if (result.matches) {
          // small screen
          this.checkCurrentActive();
        } else {
          // large screen
          document
            .querySelector('body.horizontal')
            ?.classList.remove('sidenav-toggled');
          if (document.querySelector('.horizontal')) {
            this.closeNavActive();
            setTimeout(() => {
              parentNavActive();
            }, 100);
          }
        }
      });

    const horizontal = document.querySelectorAll('#myonoffswitch35');
    const vertical = document.querySelectorAll('#myonoffswitch34');
    const horizontalHover = document.querySelectorAll('#myonoffswitch111');
    fromEvent(vertical, 'click').subscribe(() => {
      this.checkCurrentActive();
    });
    fromEvent(horizontal, 'click').subscribe(() => {
      this.closeNavActive();
    });
    fromEvent(horizontalHover, 'click').subscribe(() => {
      this.closeNavActive();
    });

    const WindowResize = fromEvent(window, 'resize');
    // subscribing the Observable
    this.windowSubscribe$ = WindowResize.subscribe(() => {

      checkHoriMenu();
    });

    const maincontent = document.querySelectorAll('.main-content');
    fromEvent(maincontent, 'click').subscribe(() => {
      if (document.querySelector('body')?.classList.contains('horizontalmenu')) {
        this.closeNavActive();

        setTimeout(() => { parentNavActive(); }, 100);
      }
    });
  }
  sidebarToggle() {
    const App = document.querySelector('.app');
    if ((this.navServices.collapseSidebar = !this.navServices.collapseSidebar)) {
      App?.classList.remove('sidenav-toggled');
    }
    else {
      App?.classList.add('sidenav-toggled');
    }
  }
  hoverEffect($event: { type: string; }) {

    this.sidenavtoggled1 = $event.type == 'mouseover' ? this.removeSidemini() : '';
  }

  removeSidemini() {
    if (window.innerWidth >= 768) {
      const App = document.querySelector('.sidebar-mini');
      this.navServices.collapseSidebar = !this.navServices.collapseSidebar;
      App?.classList.remove('sidenav-toggled');
    }

  }

  sidebarClose() {
    if ((this.navServices.collapseSidebar = true)) {
      document.querySelector('.app')?.classList.remove('sidenav-toggled');
      this.navServices.collapseSidebar = false;
    }
  }
  scrolled: boolean = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrolled = window.scrollY > 74;
  }

}
