import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop/shop.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ECommerceoutingModule } from './e-commerce-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckoutComponent } from './checkout/checkout.component';
import { WishlistComponent } from './wishlist/wishlist.component';

@NgModule({
  declarations: [
    ShopComponent,
    ProductDetailsComponent,
    ShoppingCartComponent,
    CheckoutComponent,
    WishlistComponent
  ],
  imports: [
    CommonModule,
    ECommerceoutingModule,
    SharedModule,
    NgbModule,
    NgSelectModule,
    CarouselModule,
    FormsModule, 
    ReactiveFormsModule,
    
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ECommerceModule { }
