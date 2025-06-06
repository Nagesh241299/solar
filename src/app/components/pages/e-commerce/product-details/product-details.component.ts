import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ShopService } from 'src/app/shared/services/e-commerce/shop.service';
import { ProductdetailsService } from './productdetails.service';
import { Store } from '@ngrx/store';
import { addShopData, getShopData } from 'src/app/shared/ngrx/e-commerce/shop.action';
import KeenSlider,{ KeenSliderInstance, KeenSliderPlugin } from 'keen-slider';
function ThumbnailPlugin(main: KeenSliderInstance): KeenSliderPlugin {
  return (slider) => {
    function removeActive() {
      slider.slides.forEach((slide) => {
        slide.classList.remove("active")
      })
    }
    function addActive(idx: number) {
      slider.slides[idx].classList.add("active")
    }

    function addClickEvents() {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener("click", () => {
          main.moveToIdx(idx)
        })
      })
    }

    slider.on("created", () => {
      addActive(slider.track.details.rel)
      addClickEvents()
      main.on("animationStarted", (main) => {
        removeActive()
        const next = main.animator.targetIdx || 0
        addActive(main.track.absToRel(next))
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next))
      })
    })
  }
}

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  images=[
    {
      id:1,
    src:"./assets/images/pngs/13.png"
  },
  {
    id:2,
    src:"./assets/images/pngs/14.png"
  },
  {
    id:3,
    src:"./assets/images/pngs/12.png"
  },
  {
    id:4,
    src:"./assets/images/pngs/11.png"
  },
]
children=[{
  src:"./assets/images/pngs/13.png"
},
{
  src:"./assets/images/pngs/14.png"
},
{
  src:"./assets/images/pngs/12.png"
},
{
  src:"./assets/images/pngs/11.png"
},]
  @ViewChild("sliderRef") sliderRef: ElementRef<HTMLElement> | any
  @ViewChild("thumbnailRef") thumbnailRef: ElementRef<HTMLElement> | any
  thumbnailSlider: any;
  slider: any;



  ngAfterViewInit() {
    this.slider = new KeenSlider(this.sliderRef.nativeElement)
    this.thumbnailSlider = new KeenSlider(
      this.thumbnailRef.nativeElement,
      {
        initial: 0,
        slides: {
          perView: 4,
          spacing: 10,
        },
      },
      [ThumbnailPlugin(this.slider)]
    )
  }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy()
    if (this.thumbnailSlider) this.thumbnailSlider.destroy()
  }
  TabStyle1:any;
  showNavigationIndicators = false;
  currentRoute: any;
  urlData: any;
  customOptions!: OwlOptions
  constructor(private router:Router) {

    router.events.pipe(filter((event:any)=> event instanceof NavigationEnd)).subscribe( (event:any) => {
      this.currentRoute = event.url;
      this.urlData = event.url.split("/")
    })
  }
  ngOnInit(): void {
    this.customOptions = {
      loop: true,
      rewind: false,
      slideTransition: 'linear',
      margin: 25,
      autoplay: true,
      autoplayTimeout: 5000,
      // autoplayHoverPause: false,
      dots: false,
      navText: [ '&#8249', '&#8250;' ],
      responsive: {
        0: {
          items: 1,
          nav: true
        },
        1900 :{
          items:1,
          nav: true
        }
      }

    }
  }

  owlCarouselData = [
    { id: 1, img: './assets/images/pngs/1.png', details: 'Laptop Bags', oldValue:'$99.00', newValue:'$79.00' },
    { id: 2, img: './assets/images/pngs/2.png', details: 'Sandals', oldValue:'$87.00', newValue:'$25.00' },
    { id: 3, img: './assets/images/pngs/3.png', details: 'Laptop', oldValue:'$159.00', newValue:'$134.00' },
    { id: 4, img: './assets/images/pngs/4.png', details: 'Flowers',  oldValue:'$59.00', newValue:'$34.00' },
    { id: 5, img: './assets/images/pngs/5.png', details: 'Chairs',  oldValue:'$37.00', newValue:'$25.00' },
    { id: 6, img: './assets/images/pngs/6.png', details: 'Smart Bands',  oldValue:'$64.00', newValue:'$25.00'  },
    { id: 7, img: './assets/images/pngs/7.png', details: 'Computers',  oldValue:'$135.00', newValue:'$119.00'  },
    { id: 8, img: './assets/images/pngs/8.png', details: 'Hand bags',  oldValue:'$44.00', newValue:'$35.00' },

  ]

}
