import { Directive, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from "@angular/common";

@Directive({
  selector: '[appFullscreen]'
})
export class FullscreenDirective {
  public fullScreen: boolean = false;
  public elem: HTMLElement | any; 
  idata: HTMLElement | any;
  idd!: HTMLElement | null;
  data!: string ;
  idata1: HTMLElement | any;
  idd1: HTMLElement | any;

  constructor(
    @Inject(DOCUMENT) private document:any
  ) {
   
   }

  ngOnInit(){
    this.elem = document.documentElement;
    const body = document.documentElement.querySelector('body');
    if (body) {
      const fullScreenLink = body.querySelector('.nav-link.full-screen-link');
      if (fullScreenLink) {
        this.idata = fullScreenLink.querySelector('i');
      }
    }
    document.addEventListener('fullscreenchange', this.exitHandler);
    document.addEventListener('webkitfullscreenchange', this.exitHandler);
    document.addEventListener('mozfullscreenchange', this.exitHandler);
    document.addEventListener('MSFullscreenChange', this.exitHandler);
  }
  @HostListener('click')
  
  onClick(){
    this.data = this.idata.classList.value;
    console.log(this.data);
    if (this.data == "fe fe-maximize") {
      if (this.elem.requestFullscreen) {
        this.elem.requestFullscreen();
        this.idata.classList.add('fe-minimize');
        this.idata.classList.remove('fe-maximize');
      } else if (this.elem.mozRequestFullScreen) {
        /* Firefox */
        this.elem.mozRequestFullScreen();
        this.idata.classList.add('fe-minimize');
        this.idata.classList.remove('fe-maximize');
      } else if (this.elem.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        this.elem.webkitRequestFullscreen();
        this.idata.classList.add('fe-minimize');
        this.idata.classList.remove('fe-maximize');
      } else if (this.elem.msRequestFullscreen) {
        /* IE/Edge */
        this.elem.msRequestFullscreen();
        this.idata.classList.add('fe-minimize');
        this.idata.classList.remove('fe-maximize');
      }
    } 
    else {
      
      if (!this.document.exitFullscreen) {
        this.document.exitFullscreen();
        this.idata.classList.remove('fe-minimize');
        this.idata.classList.add('fe-maximize');
      } else if (this.document.mozCancelFullScreen) {
        /* Firefox */
        this.document.mozCancelFullScreen();
        this.idata.classList.remove('fe-minimize');
        this.idata.classList.add('fe-maximize');
      } else if (this.document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        this.document.webkitExitFullscreen();
        this.idata.classList.remove('fe-minimize');
        this.idata.classList.add('fe-maximize');
        
      } else if (this.document.msExitFullscreen) {
        /* IE/Edge */
        this.document.msExitFullscreen();
        this.idata.classList.remove('fe-minimize');
        this.idata.classList.add('fe-maximize');
      }
    }
  }
  exitHandler() {
    if (!document.fullscreenElement) {
      const body = document.querySelector('body');
      const link = body?.querySelector('.nav-link.full-screen-link');
      if (link instanceof HTMLElement) {
        this.idd = link.querySelector('i');
        if (this.idd instanceof HTMLElement) {
          this.idd.classList.remove('fe-minimize');
          this.idd.classList.add('fe-maximize');
        }
      }
    }
  }
  // For simple code use below code
 // public fullScreen: boolean = false;
  // public elem: any;

  // constructor(
  //   @Inject(DOCUMENT) private document: any
  // ) { }

  // ngOnInit(){
  //   this.elem = document.documentElement;
  // }

  // @HostListener('click')

  // onClick(){
  //   this.fullScreen = !this.fullScreen;
  //   if (this.fullScreen) {
  //     if (this.elem.requestFullscreen) {
  //       this.elem.requestFullscreen();
  //     } else if (this.elem.mozRequestFullScreen) {
  //       /* Firefox */
  //       this.elem.mozRequestFullScreen();
  //     } else if (this.elem.webkitRequestFullscreen) {
  //       /* Chrome, Safari and Opera */
  //       this.elem.webkitRequestFullscreen();
  //     } else if (this.elem.msRequestFullscreen) {
  //       /* IE/Edge */
  //       this.elem.msRequestFullscreen();
  //     }
  //   } else {
  //     if (!this.document.exitFullscreen) {
  //       this.document.exitFullscreen();
  //     } else if (this.document.mozCancelFullScreen) {
  //       /* Firefox */
  //       this.document.mozCancelFullScreen();
  //     } else if (this.document.webkitExitFullscreen) {
  //       /* Chrome, Safari and Opera */
  //       this.document.webkitExitFullscreen();
  //     } else if (this.document.msExitFullscreen) {
  //       /* IE/Edge */
  //       this.document.msExitFullscreen();
  //     }
  //   }
  // }

}
