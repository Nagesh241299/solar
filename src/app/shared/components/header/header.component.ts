import { Component, OnInit, HostListener, TemplateRef, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { ShopService } from '../../services/e-commerce/shop.service';
import { LayoutService } from '../../services/layout.service';
import { Menu, NavService } from '../../services/nav.service';
import { SidebarRightService } from '../../services/sidebar-right.service';
import { SwitcherService } from '../../services/switcher.service';
import { SearchService } from '../../services/search.service';
import { ReminderService } from '../../services/reminder.service';
import { Subscription } from 'rxjs';
import { AdminService } from '../../services/admin.service';
import { NotificationService } from '../../services/notification.service';
interface Item {
  id: number;
  name: string;
  type: string;
  title: string;
  // Add other properties as needed
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  pendingNotification: number = 0;
  public isCollapsed = true;
  notifications: any = [];
  refreshSubscription!: Subscription;
  interactionSubscription!: Subscription;
  delectOutData: string | undefined;
  @Input() showBellNotification: boolean = false;
  creditData: any;
  profile: any;
  constructor(
    private notificationService: NotificationService,
    private reminderService: ReminderService,
    private sidebarRightservice: SidebarRightService,
    private mapService: SearchService,
    private layoutService: LayoutService,
    public navServices: NavService,
    private modalService: NgbModal,
    public SwitcherService: SwitcherService,
    private router: Router,
    public ShopService: ShopService,
    private store: Store,
    private adminService: AdminService,

  ) {

  }
  public scrolled: boolean = false;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrolled = window.scrollY > 74;
  }
  notificationList: any = [];
  ngOnInit(): void {


    this.navServices.items.subscribe((menuItems) => {
      this.items = menuItems;
    });
    this.profile = localStorage.getItem('user');
    // To clear and close the search field by clicking on body
    document.querySelector('.main-content')?.addEventListener('click', () => {
      this.clearSearch();
    });

    this.text = '';
    
    this.interactionSubscription = this.reminderService.interactionOccurred.subscribe(() => {
      this.fetchCreditData();
    });
    
    this.refreshSubscription = this.reminderService.refreshHeader$.subscribe(() => {
      this.reminderService.getNotifications().subscribe(
        async (response: any) => {
          //console.log(response)
          this.notifications = [];
          this.notifications = response
          this.pendingNotification = 0
          const unreadNotifications = response.filter((notification: any) => notification.is_read == false);
          this.pendingNotification = unreadNotifications.length;
          this.notifications = response.sort((a: { reminder_date: string | number | Date; }, b: { reminder_date: string | number | Date; }) => {

            return new Date(b.reminder_date).getTime() - new Date(a.reminder_date).getTime();
          });
        },
        (error: any) => {
          console.error(error);

        })
    });
    this.reminderService.getNotifications().subscribe(
      async (response: any) => {
        // console.log(response)
        this.notifications = [];
        this.notifications = response.sort((a: { reminder_date: string | number | Date; }, b: { reminder_date: string | number | Date; }) => {

          return new Date(b.reminder_date).getTime() - new Date(a.reminder_date).getTime();
        });
        this.pendingNotification = 0
        const unreadNotifications = response.filter((notification: any) => notification.is_read == false);
        this.pendingNotification = unreadNotifications.length;

      },
      (error: any) => {
        console.error(error);

      })
    setInterval(() => {
      this.showBellNotification = true;

      this.reminderService.getPendingNotificationsList().subscribe(
        async (response: any) => {
          //console.log(response)
          if (response.length > 0) {
            this.notifications = [];
            this.notifications = response.sort((a: { reminder_date: string | number | Date; }, b: { reminder_date: string | number | Date; }) => {

              return new Date(b.reminder_date).getTime() - new Date(a.reminder_date).getTime();
            });
            this.pendingNotification = 0
            const unreadNotifications = response.filter((notification: any) => notification.is_read == false);
            this.pendingNotification = unreadNotifications.length;
            this.playBellSound()
          }
          // this.playBellSound()
          //console.log('15 minute complete')
        },
        (error: any) => {
          console.error(error);

        })

    }, 15 * 60 * 1000);

    

    this.notificationService.fetchTriggered$.subscribe(() => {
      // console.log("fetchTriggered$ emitted! Calling fetchCreditData...");
      this.fetchCreditData();
    });

    setTimeout(() => {
      // console.log("Manually triggering fetch...");
      this.notificationService.triggerFetchData();
    }, 50);

    


  }

  ngOnDestroy(): void {
    this.interactionSubscription.unsubscribe();
    this.refreshSubscription.unsubscribe();
  }
  markAsReadAndNavigate(notification: any) {
    if (notification.is_read == false) {
      let payload = {
        "reminder_date": notification.reminder_date,
        "notes": notification.notes,
        "is_notification_sent": true,
        "is_read": true
      }
      let id = notification.id
      this.reminderService.readRemainder(payload, id).subscribe(() => {

        // this.router.navigate(['/pages/notification-list']);
        this.reminderService.getNotifications().subscribe(
          async (response: any) => {
            // console.log(response)
            this.notifications = [];
            this.notifications = response.sort((a: { reminder_date: string | number | Date; }, b: { reminder_date: string | number | Date; }) => {

              return new Date(b.reminder_date).getTime() - new Date(a.reminder_date).getTime();
            });
            this.pendingNotification = 0
            const unreadNotifications = response.filter((notification: any) => notification.is_read == false);
            this.pendingNotification = unreadNotifications.length;
            //console.log(this.pendingNotification)
            this.router.navigate(['/pages/notification-list']);
          },
          (error: any) => {
            console.error(error);

          })
      });
    } else {

      //  this.router.navigate(['/pages/notification-list']);
    }
  }


  playBellSound() {
    const audio = new Audio();
    audio.src = './assets/notification-bell.mp3';
    audio.load();
    audio.play();
  }
  toggleSidebar() {
    if ((this.navServices.collapseSidebar == true)) {
      document.querySelector("body")?.classList.toggle("sidenav-toggled");
    }
    console.log("from header" + " ", this.ShopService.retunData());
  }

  open(content: TemplateRef<string>) {
    this.modalService.open(content, { backdrop: 'static', windowClass: 'modalCusSty', size: 'lg' });
  }

  toggleSwitcher() {
    this.SwitcherService.emitChange(true);
    document.querySelector('body')?.classList.remove("sidenav-toggled-open");
  }

  toggleSidebarNotification() {
    this.sidebarRightservice.emitSidebarNotifyChange(true);
  }

  signout() {
    // this.auth.SignOut();
    this.mapService.logout().subscribe(
      async (response: any) => {
        return this.router.navigate(['/auth/login']);

      },
      (error: any) => {
        console.error(error);

      }
    );
    // this.router.navigate(['/auth/login']);
  }

  // Search
  public menuItems!: Menu[];
  public items!: Menu[];
  public text!: string;
  public SearchResultEmpty: boolean = false;

  Search(searchText: string) {
    if (!searchText) return this.menuItems = [];
    // items array which stores the elements
    const items: Item[] = [];
    // Converting the text to lower case by using toLowerCase() and trim() used to remove the spaces from starting and ending
    searchText = searchText.toLowerCase().trim();
    this.items.filter((menuItems: Menu) => {
      // checking whether menuItems having title property, if there was no title property it will return
      if (!menuItems?.title) return false;
      //  checking wheteher menuitems type is text or string and checking the titles of menuitems
      if (menuItems.type === 'link' && menuItems.title.toLowerCase().includes(searchText)) {
        // Converting the menuitems title to lowercase and checking whether title is starting with same text of searchText
        if (menuItems.title.toLowerCase().startsWith(searchText)) { // If you want to get all the data with matching to letter entered remove this line(condition and leave items.push(menuItems))
          // If both are matching then the code is pushed to items array
          items.push(menuItems as Item);
        }
      }
      //  checking whether the menuItems having children property or not if there was no children the return
      if (!menuItems.children) return false;
      menuItems.children.filter((subItems: Menu) => {
        if (!subItems?.title) return false;
        if (subItems.type === 'link' && subItems.title.toLowerCase().includes(searchText)) {
          if (subItems.title.toLowerCase().startsWith(searchText)) {         // If you want to get all the data with matching to letter entered remove this line(condition and leave items.push(subItems))
            items.push(subItems as Item);
          }

        }
        if (!subItems.children) return false;
        subItems.children.filter((subSubItems: Menu) => {
          if (subSubItems.title?.toLowerCase().includes(searchText)) {
            if (subSubItems.title.toLowerCase().startsWith(searchText)) { // If you want to get all the data with matching to letter entered remove this line(condition and leave items.push(subSubItems))
              items.push(subSubItems as Item);

            }
          }
        });
        return true;
      });
      return this.menuItems = items;
    });
    // Used to show the No search result found box if the length of the items is 0
    if (!items.length) {
      this.SearchResultEmpty = true;
    }
    else {
      this.SearchResultEmpty = false;
    }
    return true;
  }

  //  Used to clear previous search result
  clearSearch() {
    this.text = '';
    this.menuItems = [];
    this.SearchResultEmpty = false;
    return this.text, this.menuItems;
  }
  sidebarToggle() {
    if ((this.navServices.collapseSidebar = true)) {
      document.querySelector("body")?.classList.toggle("sidenav-toggled");
    }

  }
  OpenCreditPointHistory() {
    this.router.navigate(['/pages/creditPointsHistory/']);

    //console.log("open credit")
  }

  fetchCreditData() {
    this.adminService.AllCreditpointsData().subscribe(
       (response: any) => {
        // console.log(response, 'listdata');
        this.creditData = response.results[0];

        // console.log(this.creditData
        //   , "points")


      },
      (error: any) => {
        console.error(error);

      }
    );

  }

}
