import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
export interface ShopDataState {

  id:string,
  ribbon:string,
  photo: string,
  offerprice:string,
  price: string,
  item:string,
  Quantity: number,

}
import { ShopService } from 'src/app/shared/services/e-commerce/shop.service';
export interface childImg {
  img:string,
};

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  basicPage = 1;

  currentRoute:  string | undefined;
  urlData:  string[] | undefined;
  store!: { dispatch: (arg0: string) => void; };
  productData = this.ShopService.getPosta();
      constructor(private router:Router,public ShopService: ShopService) {
 
   this.router.events.pipe(filter((event)=> event instanceof NavigationEnd)).subscribe( (event) => {
      const navigationEndEvent = event as NavigationEnd;

      this.currentRoute = navigationEndEvent.url;
      this.urlData = navigationEndEvent.url.split("/");
    });
  }
  ngOnInit(): void {
  }
  click = (id:string)=>{
    const data = this.productData.filter((x: { id: string; }) =>{
      return x.id != id;
    });
    this.productData = data;
  };

  onSelect(ele: { id: number; }){
    this.router.navigate(["/ecommerce/product-details/1",ele.id]);
    this.router.navigate(["/ecommerce/product-details/2",ele.id]);
  
  }
  
}
