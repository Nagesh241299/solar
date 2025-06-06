import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import {  Subscription } from 'rxjs';
import { SwitcherService } from 'src/app/shared/services/switcher.service';
import * as switcher from 'src/app/shared/components/switcher/switcher';

@Component({
  selector: 'app-switcher',
  templateUrl: './switcher.component.html',
  styleUrls: ['./switcher.component.scss'],
})
export class SwitcherComponent implements OnInit {
  layoutSub: Subscription;

  body = document.querySelector('body');

  @ViewChild('switcher', { static: false }) switcher!: ElementRef;
  constructor(
    public renderer: Renderer2,
    public switcherServic: SwitcherService,

  ) {
    this.layoutSub = switcherServic.changeEmitted.subscribe((value) => {

      if (value) {
        this.renderer.addClass(this.switcher.nativeElement.firstElementChild,'active');
        this.renderer.setStyle(this.switcher.nativeElement.firstElementChild,'right','0px');
        value = true;
      } else {
        this.renderer.removeClass(this.switcher.nativeElement.firstElementChild,'active');
        this.renderer.setStyle(this.switcher.nativeElement.firstElementChild,'right','-270px');
        value = false;
      }
    });
    document.querySelector(".slide-leftRTL")?.classList.add("d-none");
    document.querySelector(".slide-rightRTL")?.classList.add("d-none");
  }
  ngOnInit(): void {
    switcher.localStorageBackUp();
    switcher.customClickFn();
    switcher.updateChanges();
    if(document.body.classList.contains("transparent-mode") || document.body.classList.contains("dark-mode")){
      console.log("true");
      const light = document.getElementById('myonoffswitch1') as HTMLInputElement;
      light.checked = false;
      const dark = document.getElementById('myonoffswitch2') as HTMLInputElement;
      dark.checked = true;
    }
    else{
      // console.log("false")
      const light = document.getElementById('myonoffswitch1') as HTMLInputElement;
      light.checked = true;

    }

  }
  reset(){
    const light = document.getElementById('myonoffswitch1') as HTMLInputElement;
    light.checked = true;
    const lightmenu = document.getElementById('myonoffswitch3') as HTMLInputElement;
    lightmenu.checked = true;
    const vertical = document.getElementById('myonoffswitch34') as HTMLInputElement;
    vertical.checked = true;
    const ltr = document.getElementById('myonoffswitch23') as HTMLInputElement;
    ltr.checked = true;
    const lightheader = document.getElementById('myonoffswitch6') as HTMLInputElement;
    lightheader.checked = true;
    const fullwidth = document.getElementById('myonoffswitch9') as HTMLInputElement;
    fullwidth.checked = true;
    const fixed = document.getElementById('myonoffswitch11') as HTMLInputElement;
    fixed.checked = true;
   
    localStorage.clear();
    const html:HTMLHtmlElement | null = document.querySelector('html');
    const body = document.querySelector('body');
  
    body?.classList.remove('rtl');
    body?.classList.remove('dark-mode');
    body?.classList.remove('dark-header');
    body?.classList.remove('color-header');
    body?.classList.remove('color-menu');
    body?.classList.remove('dark-menu');
    body?.classList.remove('layout-boxed');
    body?.classList.remove('scrollable-layout');

    switcher.updateChanges();
    switcher.checkOptions();
    html?.setAttribute('dir', 'ltr');
    const styleId = document.querySelector('#style');
    styleId?.setAttribute('href','./assets/plugins/bootstrap/css/bootstrap.css');
    localStorage.removeItem('Volghhorizontal');
    localStorage.removeItem('VolghhorizontalHover');
    const mainContent = document.querySelector('.main-content');
    const mainContainer = document.querySelectorAll('.main-container');
    const appSidebar= document.querySelector('.app-sidebar');
    const header = document.querySelector('.header');
    const mainSidemenu = document.querySelector('.main-side-menu');
    mainContent?.classList.add('app-content');
    mainContainer.forEach((e)=>{
      e.classList.add('container-fluid');
    });
    header?.classList.add('app-header');
    body?.classList.add('sidebar-mini');
    //remove
    body?.classList.remove('horizontal');
    body?.classList.remove('horizontal-hover');
    appSidebar?.classList.remove('horizontal-main');
    mainSidemenu?.classList.remove('container');
    mainContent?.classList.remove('hor-content');
   
    mainContainer.forEach((e: { classList: { remove: (arg0: string) => void; }; })=>{
      e.classList.remove('container');
    });
    document.querySelector('.slide-left')?.classList.add('d-none');
    document.querySelector('.slide-right')?.classList.add('d-none');
    document.querySelector('.slide-leftRTL')?.classList.add('d-none');
    document.querySelector('.slide-rightRTL')?.classList.add('d-none');
    localStorage.setItem('VolghsidebarMini', 'true');
    localStorage.removeItem('Volghhorizontal');
    localStorage.removeItem('VolghhorizontalHover');
  }
  public color4: string = '#5e2dd8';
  public color1: string = '#5e2dd8';
  public color2: string = '#5e2dd8';
  public color3: string = '#5e2dd8';

  LightTheme(){
    // localStorage.clear()

    // Adding
    this.body?.classList.add('light-mode');

    // Removing
    localStorage.setItem("VolghLightTheme","true");
    this.body?.classList.remove("transparent-mode");
    this.body?.classList.remove("dark-mode");
    localStorage.removeItem("VolghTransparentTheme");
    localStorage.removeItem("VolghDarkTheme");
  }

  DarkTheme(){
    // localStorage.clear()
    const dark = document.getElementById('myonoffswitch2') as HTMLInputElement;
    dark.checked = true;
    const darkHeader = document.getElementById('myonoffswitch8') as HTMLInputElement;
    darkHeader.checked = true;
    const darkMenu = document.getElementById('myonoffswitch5') as HTMLInputElement;
    darkMenu.checked = true;
    //Adding
    localStorage.setItem("VolghDarkTheme","true");
    this.body?.classList.add("dark-mode");

    // Removing
    this.body?.classList.remove("transparent-mode");
    this.body?.classList.remove("light-mode");
    localStorage.removeItem("VolghTransparentTheme");
    localStorage.removeItem("VolghLightTheme");
  }

  public dynamicBgPrimary(data: string): void {
    this.color3 = data;
    
    switcher.dynamicBgPrimaryColor( this.color1);
    localStorage.setItem('volgh-primary-color', this.color1);
    localStorage.setItem('volgh-primary-hover', this.color1);
    localStorage.setItem('volgh-primary-border', this.color1);
    localStorage.setItem('volgh-primary-transparent', this.color1);
  
    const transparent = document.getElementById(
      'myonoffswitch1'
    ) as HTMLInputElement;
    transparent.checked = true;

    // Adding
    this.body?.classList.add('light-theme');
    localStorage.setItem('slicadarkTheme', 'true');

    this.body?.classList.remove('light-theme');
    localStorage.removeItem('slicaDarkTheme');
    localStorage.removeItem('slicaLightTheme');
    this.body?.classList.remove('header-light');
    this.body?.classList.remove('dark-header');
    this.body?.classList.remove('color-header');
    this.body?.classList.remove('gradient-header');
    this.body?.classList.remove('light-menu');
    this.body?.classList.remove('color-menu');
    this.body?.classList.remove('dark-menu');
    this.body?.classList.remove('gradient-menu');
    document
      .querySelector('.app-header')
      ?.classList.add(
        'hor-header',
        'fixed-header',
        'visible-title',
        'stickyClass'
      );

    localStorage.removeItem('slicalight-primary-color');
    localStorage.removeItem('slicalight-primary-hover');
    localStorage.removeItem('slicalight-primary-border');
    localStorage.removeItem('slicadark-primary-color');
    localStorage.removeItem('slicadark-primary-hover');
    localStorage.removeItem('slicadark-primary-border');
    localStorage.removeItem('slicadark-body');
    switcher.removeForTransparent();
    switcher.updateChanges();
  }
  public dynamicBgDarkPrimary(data: string): void {
    document.body.classList.add('dark-mode');

    this.color4 = data;

    const dynamicPrimaryBgDark= document.querySelectorAll('.color-bg-Dark');
    const dynamicPrimaryBgDarkArray = Array.from(dynamicPrimaryBgDark) as HTMLElement[];

    switcher.dynamicBgDarkPrimaryColor(dynamicPrimaryBgDarkArray, this.color4);
    
    localStorage.setItem('Volghdark-background', this.color4);
    localStorage.setItem('Volghdark-theme', this.color4);

    const lightbtn = document.getElementById('myonoffswitch1') as HTMLInputElement;
    lightbtn.checked = false;
    const btndark = document.getElementById('myonoffswitch2') as HTMLInputElement;
    btndark.checked = true;
    const darkheader = document.getElementById('myonoffswitch8') as HTMLInputElement;
    darkheader.checked = true;

    const darkmenu = document.getElementById('myonoffswitch5') as HTMLInputElement;
    darkmenu.checked = true;

    // Removing
    localStorage.removeItem('slicaLightTheme');
    this.body?.classList.remove('light-theme');
    this.body?.classList.remove('header-light');
    this.body?.classList.remove('dark-header');
    this.body?.classList.remove('color-header');
    this.body?.classList.remove('gradient-header');
    this.body?.classList.remove('light-menu');
    this.body?.classList.remove('color-menu');
    this.body?.classList.remove('dark-menu');
    this.body?.classList.remove('gradient-menu');
    document
      .querySelector('.app-header')
      ?.classList.add(
        'hor-header',
        'fixed-header',
        'visible-title',
        'stickyClass'
      );

    localStorage.removeItem('slicalight-primary-color');
    localStorage.removeItem('slicalight-primary-hover');
    localStorage.removeItem('slicalight-primary-border');
    localStorage.removeItem('slicadark-primary-color');
    localStorage.removeItem('slicaBgImage');
    switcher.removeForTransparent();
    switcher.updateChanges();
  }
}

