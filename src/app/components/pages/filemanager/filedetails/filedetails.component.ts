import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import {
 Image,
 ModalGalleryService,
  ModalGalleryRef,

} from '@ks89/angular-modal-gallery';
import { GalleryItem, ImageItem } from 'ng-gallery';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { fromEvent } from 'rxjs';
interface ImageData {
  srcUrl: string;
  previewUrl: string;
}
// interface Photo {
//   previewUrl: string | undefined;
//   srcUrl: any;
//   src: string;
//   title?: string;
//   alt?: string;
//   id:number;
//   jpg:string;
//   size:string;
// }

@Component({
  selector: 'app-filedetails',
  templateUrl: './filedetails.component.html',
  styleUrls: ['./filedetails.component.scss']
})

export class FiledetailsComponent implements OnInit {
  items!: GalleryItem[];
  emptyImagesArray: Image[] = [];

  imagesRect: Image[] = [
     new Image( 0, {img:"./assets/images/media/27.jpg", }, { img: "./assets/images/media/27.jpg" }  ),
     new Image(1, {img: "./assets/images/media/28.jpg" }, { img: "./assets/images/media/28.jpg" }),
     new Image( 2, { img:"./assets/images/media/29.jpg" },{ img: "./assets/images/media/29.jpg", } ),
     new Image( 3, {img:"./assets/images/media/30.jpg",  }, { img:"./assets/images/media/30.jpg"} ),
     new Image(4, {img: "./assets/images/media/31.jpg" }, { img: "./assets/images/media/31.jpg"}),
     new Image(5, {img:  "./assets/images/media/32.jpg" },{img: "./assets/images/media/32.jpg" }),
    ];

  imageData!: ImageData[];

   constructor(private modalGalleryService: ModalGalleryService, private sanitizer: DomSanitizer) {}
   ngOnInit(): void {
    const ltr = document.querySelectorAll('#myonoffswitch54');
    const rtl = document.querySelectorAll('#myonoffswitch55');
    fromEvent(ltr, 'click').subscribe(() => {
      this.customOptions = { ...this.customOptions, rtl: false }; // this will make the carousel refresh
    });
    fromEvent(rtl, 'click').subscribe(() => {
      this.customOptions = { ...this.customOptions, rtl: true }; // this will make the carousel refresh
    });
    if(document.body.classList.contains("rtl")){
      this.customOptions = { ...this.customOptions, rtl: true }; // this will make the carousel refresh
    }

    // Creat gallery items
    this.items = this.imageData?.map((item: ImageData) => {
      return new ImageItem({ src: item.srcUrl, thumb: item.previewUrl });
    });
  }

   openImageModalRowDescription(id: number, image: Image): void {
     console.log('Opening modal gallery from custom plain gallery row and description, with image: ', image);
     const index: number = this.getCurrentIndexCustomLayout(image, this.imagesRect);
 this.modalGalleryService.open({
       id,
       images: this.imagesRect,
       currentImage: this.imagesRect[index]
     }) as ModalGalleryRef;
   }

   addRandomImage(): void {

     // add also to imagesRect
     const imageRectToCopy: Image = this.imagesRect[Math.floor(Math.random() * this.imagesRect.length)];
     const newImageRect: Image = new Image(this.imagesRect.length - 1 + 1, imageRectToCopy.modal, imageRectToCopy.plain);
     this.imagesRect = [...this.imagesRect, newImageRect];
   }

   trackById(index: number, item: Image): number {
     return item.id;
   }

   private getCurrentIndexCustomLayout(image: Image, images: Image[]): number {
     return image ? images.indexOf(image) : -1;
   }
   customOptions: OwlOptions = {
    loop: true,
    rtl: false,

    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<', '>'],
    center: true,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  };

  slidesStore = [
    {
      id: '1',
      src:"./assets/images/media/27.jpg" ,
      height:'124',
      width:'100',
      alt: 'img',
     title: 'image2.jpg',
      size: '66 KB',
    },
    {
      id: '2',
      src: "./assets/images/media/28.jpg",
      height:'124',
      width:'100',
      alt: 'img',
      size: '32 KB',
      title: 'image3.jpg',
    },
    {
      id: '3',
      src: "./assets/images/media/29.jpg",
      height:'124',
      width:'100',
      alt: 'img',
      size: '76 KB',
      title: 'image1.jpg',
    },
    {
      id: '4',
      src: "./assets/images/media/30.jpg",
      height:'124',
      width:'100',
      alt: 'img',
      size: '34 KB',
      title: 'image4.jpg',
    },
    {
      id: '5',
      src:"./assets/images/media/31.jpg",
      height:'124',
      width:'100',
      alt: 'img',
      size: '66 KB',
      title: 'image5.jpg',
    },
    {
      id: '6',
      src: "./assets/images/media/32.jpg",
      height:'124',
      width:'100',
      alt: 'img',
      size: '67 KB',
      title: 'image6.jpg',
    },
    {
      id: '7',
      src: "./assets/images/media/33.jpg",
     alt: 'img',
      height:'124',
      width:'100',
      size: '76 KB',
      title: 'image1.jpg',
    },

  ];
}

