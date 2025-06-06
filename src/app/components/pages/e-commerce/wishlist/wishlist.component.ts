import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

interface Book {
  id: number;
  image: string;
  title: string;
  price1: string;
  price2: string;
}

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  objectArray: Book[];
  currentRoute:  string | undefined;
  urlData:  string[] | undefined;
  constructor(private router:Router) {

   this.router.events.pipe(filter((event)=> event instanceof NavigationEnd)).subscribe( (event) => {
      const navigationEndEvent = event as NavigationEnd;

      this.currentRoute = navigationEndEvent.url;
      this.urlData = navigationEndEvent.url.split("/");
    });
  
    this.objectArray = [
      { id: 1, image: "./assets/images/pngs/9.png", title : "Perfume", price1 : "$16,599", price2 : "$19,799"},
      { id: 2, image: "./assets/images/pngs/1.png", title : "Camera", price1 : "$529", price2 : "$799"},
      { id: 3, image: "./assets/images/pngs/7.png", title : "Smart Watch", price1 : "$25,239", price2 : "$34,399"},
      { id: 4, image: "./assets/images/pngs/2.png", title : "Flower Pot", price1 : "$345", price2 : "$459"},
      { id: 5, image: "./assets/images/pngs/4.png", title : "Womens Bag", price1 : "$277", price2 : "$456"},
      { id: 6, image: "./assets/images/pngs/8.png", title : "Stylish Shoes", price1 : "$567", price2 : "$866"},
      { id: 7, image: "./assets/images/pngs/3.png", title : "HeadPhones", price1 : "$455", price2 : "$567"},
      { id: 8, image: "./assets/images/pngs/5.png", title : "Chair", price1 : "$345", price2 : "$499"}

    ];
  }
  ngOnInit(): void {
  }

  RemoveElementFromObjectArray(key: number) {
    this.objectArray.forEach((value,index)=>{
        if(value.id==key) this.objectArray.splice(index,1);
    });
  }

}
