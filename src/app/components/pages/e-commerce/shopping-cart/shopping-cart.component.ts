import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
const DATA=[
  {
src:"./assets/images/pngs/1.png",
item:"Digital Camera",
price:"$568",
subtotal:"$1,589",
},
{
  src:"./assets/images/pngs/4.png",
  item:"Stylish BackPack",
  price:"$1027",
  subtotal:"$,3500",
  },
   
];
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  @ViewChild('bagCount' , {static: true}) bagCount!: ElementRef;
  @ViewChild('flowers' , {static: true}) flowers!: ElementRef;
  @ViewChild('handBag' , {static: true}) handBag!: ElementRef;
  
  currentRoute:  string | undefined;
  urlData:  string[] | undefined;
  constructor(private router:Router) {

   this.router.events.pipe(filter((event)=> event instanceof NavigationEnd)).subscribe( (event) => {
      const navigationEndEvent = event as NavigationEnd;

      this.currentRoute = navigationEndEvent.url;
      this.urlData = navigationEndEvent.url.split("/");
    });
  }

  ngOnInit(): void {
  }

  bagCountInc(){
    this.bagCount.nativeElement.value++ ;
 }
 bagCountdec(){
   if( this.bagCount.nativeElement.value  > 0){
     this.bagCount.nativeElement.value-- ;
   }
 }
 
 flowersInc(){
    this.flowers.nativeElement.value++ ;
 }
 flowersdec(){
   if( this.flowers.nativeElement.value > 0){
     this.flowers.nativeElement.value-- ;
   }
 }
 
 handBagInc(){
    this.handBag.nativeElement.value++ ;
 }
 handBagdec(){
    if(this.handBag.nativeElement.value > 0){
     this.handBag.nativeElement.value-- ;
    }
 }
 Products=DATA;
 click = (item:string)=>{
  const data = this.Products.filter(x =>{
    return x.item != item;
  });
  this.Products = data;
};

}
