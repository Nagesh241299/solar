import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { Store } from '@ngrx/store';
// import { deleteShopData } from '../../ngrx/e-commerce/shop.action';
import { ShopService } from '../../services/e-commerce/shop.service';
import { LayoutService } from '../../services/layout.service';
import { Menu, NavService } from '../../services/nav.service';
import { SidebarRightService } from '../../services/sidebar-right.service';
import { SwitcherService } from '../../services/switcher.service';
interface Item {
  id: number;
  name: string;
  type: string;
  title: string;
  // Add other properties as needed
}

@Component({
  selector: 'app-header-switcher',
  templateUrl: './header-switcher.component.html',
  styleUrls: ['./header-switcher.component.scss']
})
export class HeaderSwitcherComponent implements OnInit {

  public isCollapsed = true;

  constructor(
    private sidebarRightservice: SidebarRightService,

    private layoutService: LayoutService,
    public navServices: NavService,
    private modalService: NgbModal,
    public SwitcherService : SwitcherService,
    private router: Router,
    public ShopService: ShopService,
    // private store: Store<any>
  ){
   
  }

  ngOnInit(): void {
    this.navServices.items.subscribe((menuItems) => {
      this.items = menuItems;
    });
    // To clear and close the search field by clicking on body
    document.querySelector('.main-content')?.addEventListener('click',()=>{
      this.clearSearch();
    });
    this.text = '';
  }

  toggleSidebar(){
    if ((this.navServices.collapseSidebar == true)) {
      document.querySelector("body")?.classList.toggle("sidenav-toggled");
    }

  }

  open(content: TemplateRef<string>) {
    this.modalService.open(content, {backdrop : 'static' , windowClass : 'modalCusSty', size: 'lg' });
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
    this.router.navigate(['/auth/login']);
  }

  // Search
  public menuItems!: Menu[];
    public items!: Menu[];
    public text!: string;
    public SearchResultEmpty:boolean = false;

    Search(searchText: string) {
      if (!searchText) return this.menuItems = [];
      // items array which stores the elements
      const items:Item[] = [];
      // Converting the text to lower case by using toLowerCase() and trim() used to remove the spaces from starting and ending
      searchText = searchText.toLowerCase().trim();
      this.items.filter((menuItems:Menu) => {
        // checking whether menuItems having title property, if there was no title property it will return
        if (!menuItems?.title) return false;
        //  checking wheteher menuitems type is text or string and checking the titles of menuitems
        if (menuItems.type === 'link' && menuItems.title.toLowerCase().includes(searchText)) {
          // Converting the menuitems title to lowercase and checking whether title is starting with same text of searchText
          if( menuItems.title.toLowerCase().startsWith(searchText)){ // If you want to get all the data with matching to letter entered remove this line(condition and leave items.push(menuItems))
            // If both are matching then the code is pushed to items array
            items.push(menuItems as Item);
          }
        }
        //  checking whether the menuItems having children property or not if there was no children the return
        if (!menuItems.children) return false;
        menuItems.children.filter((subItems:Menu) => {
          if (!subItems?.title) return false; 
          if (subItems.type === 'link' && subItems.title.toLowerCase().includes(searchText)) {
            if( subItems.title.toLowerCase().startsWith(searchText)){         // If you want to get all the data with matching to letter entered remove this line(condition and leave items.push(subItems))
              items.push(subItems as Item);
            }
  
          }
          if (!subItems.children) return false;
          subItems.children.filter((subSubItems:Menu) => {
            if (subSubItems.title?.toLowerCase().includes(searchText)) {
              if( subSubItems.title.toLowerCase().startsWith(searchText)){ // If you want to get all the data with matching to letter entered remove this line(condition and leave items.push(subSubItems))
                items.push(subSubItems as Item);
                
              }
            }
          });
          return true;
        });
        return this.menuItems = items;
      });
      // Used to show the No search result found box if the length of the items is 0
      if(!items.length){
        this.SearchResultEmpty = true;
      }
      else{
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
  sidebarToggle(){
    if ((this.navServices.collapseSidebar = true)) {
      document.querySelector("body")?.classList.toggle("sidenav-toggled");
    }

}
}
