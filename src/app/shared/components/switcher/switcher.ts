import { fromEvent } from 'rxjs';
import * as sidebarFn from '../sidemenu/sidemenu';

export function localStorageBackUp() {
  const html = document.querySelector('html')?.style;
  const body = document.querySelector('body');
  if (localStorage.getItem('Volgh-primary-rgb') !== null ) {
    body?.classList.add('light-mode');
    const light = document.getElementById('myonoffswitch1') as HTMLInputElement;
    light.checked = true;
  
    body?.classList.remove('dark-mode');
    document.documentElement.style.setProperty('--volgh-primary-rgb', localStorage.getItem('Volgh-primary-rgb'));
  }
  if (localStorage.getItem('Volgh-primary-rgb1') !== null ) {
    body?.classList.add('light-mode');
    const light = document.getElementById('myonoffswitch1') as HTMLInputElement;
    light.checked = true;
  
    body?.classList.remove('dark-mode');
    document.documentElement.style.setProperty('--volgh-primary-rgb1', localStorage.getItem('Volgh-primary-rgb1'));
  }
  if (localStorage.getItem('Volghdark-background') !== null) {
    body?.classList.add('dark-mode');
    const dark = document.getElementById('myonoffswitch2') as HTMLInputElement;
    dark.checked = true;

    body?.classList.remove('light-mode');
    html?.setProperty('--volgh-dark-background', localStorage.getItem('Volghdark-background'));
    body?.classList.remove('light-mode');
    html?.setProperty('--volgh-dark-theme', localStorage.getItem('Volghdark-theme'));

  }

  if (localStorage.getItem('Volghdark-theme') !== null) {
    body?.classList.add('dark-mode');
    const dark = document.getElementById('myonoffswitch2') as HTMLInputElement;
    dark.checked = true;

  }

  if(localStorage.getItem('Volghlight-theme') !== null){
    body?.classList.add('light-mode');
    const light = document.getElementById('myonoffswitch1') as HTMLInputElement;
    light.checked = true;
  }
  if(localStorage.getItem('Volghdark-theme') !== null){
    body?.classList.add('dark-mode');
    const dark = document.getElementById('myonoffswitch2') as HTMLInputElement;
    dark.checked = true;
  }

  if(localStorage.getItem('Volghrtl')){
    const rtl = document.getElementById('myonoffswitch24') as HTMLInputElement;
    rtl.checked = true;
    const styleId = document.querySelector('#style');
    document.querySelector('body')?.classList.add('rtl');
    document.querySelector('html')?.setAttribute('dir', 'rtl');
    styleId?.setAttribute('href','./assets/plugins/bootstrap/css/bootstrap.rtl.css');
    //remove
    body?.classList.remove('ltr');
    sidebarFn.checkHoriMenu();
  }
  if(localStorage.getItem('Volghhorizontal') !== null){
    const horizontal = document.getElementById('myonoffswitch35') as HTMLInputElement;
    horizontal.checked = true;
    const body:HTMLBodyElement | null= document.querySelector('body');
    const mainContent = document.querySelector('.main-content');
    const mainContainer = document.querySelectorAll('.main-container');
    const appSidebar = document.querySelector('.app-sidebar');
    const header = document.querySelector('.header');
    const mainSidemenu = document.querySelector('.main-sidemenu');
    const sideMenu = document.querySelector('.horizontal .side-main');

    body?.classList.add('horizontal');
    mainContainer.forEach((e: { classList: { add: (arg0: string) => void; }; })=>{
      e.classList.add('container');
    });
    appSidebar?.classList.add('horizontal-main');
    mainSidemenu?.classList.add('container');
    sideMenu?.classList.add('flex-nowrap');
    // // remove
    sideMenu?.classList.remove('flex-wrap');
    mainContent?.classList.remove('app-content');
    mainContent?.classList.add('hor-content');
    mainContainer.forEach((e: { classList: { remove: (arg0: string) => void; }; })=>{
      e.classList.remove('container-fluid');
    });

    header?.classList.add('hor-header');
    header?.classList.remove('app-header');
    body?.classList.remove('sidebar-mini');
    body?.classList.remove('sidenav-toggled');
    body?.classList.remove('horizontal-hover');
    const li = document.querySelectorAll('.side-menu li');
    li.forEach((e) => {
      e.classList.remove('is-expanded');
    });
    sidebarFn.checkHoriMenu();
    setTimeout(()=>{
      sidebarFn.parentNavActive();
    }, 300);
  }
  if(localStorage.getItem('VolghsidebarMini') !== null){
   //add
   const header = document.querySelector('.header');
   header?.classList.add('app-header');
  
   document.querySelector('.slide-left')?.classList.add('d-none');
   document.querySelector('.slide-right')?.classList.add('d-none');
   document.querySelector('.slide-leftRTL')?.classList.add('d-none');
   document.querySelector('.slide-rightRTL')?.classList.add('d-none');
  }
  if(localStorage.getItem('VolghhorizontalHover') !== null){
    const horizontalHover = document.getElementById('myonoffswitch111') as HTMLInputElement;
    horizontalHover.checked = true;
    const mainContent = document.querySelector('.main-content');
    const mainContainer = document.querySelectorAll('.main-container');
    const appSidebar = document.querySelector('.app-sidebar');
    const header = document.querySelector('.header');
    const mainSidemenu = document.querySelector('.main-sidemenu');
    const sideMenu = document.querySelector('.horizontal .side-menu');
    //add
    body?.classList.add('horizontal');
    body?.classList.add('horizontal-hover');
    mainContent?.classList.add('hor-content');
    mainContainer.forEach((e: { classList: { add: (arg0: string) => void; }; })=>{
      e.classList.add('container');
    });
    console.log(mainContainer);
    appSidebar?.classList.add('horizontal-main');
    mainSidemenu?.classList.add('container');
    sideMenu?.classList.add('flex-nowrap');
    // remove
    sideMenu?.classList.remove('flex-wrap');
    mainContent?.classList.remove('app-content');
    mainContainer.forEach((e: { classList: { remove: (arg0: string) => void; }; })=>{
      e.classList.remove('container-fluid');
    });
    header?.classList.remove('app-header');
    header?.classList.add('hor-header');
    body?.classList.remove('sidebar-mini');
    body?.classList.remove('sidenav-toggled');

    const li = document.querySelectorAll('.side-menu li');
    li.forEach((e) => {
      e.classList.remove('is-expanded');
    });
    sidebarFn.checkHoriMenu();
    setTimeout(()=>{
      sidebarFn.parentNavActive();
    }, 300);
  }
  if(localStorage.getItem('Volghcenter-logo')!==null){
    body?.classList.add('center-logo');
    body?.classList.remove('default-logo');

    const centerLogo = document.getElementById('center-logo') as HTMLInputElement;
    centerLogo.checked = true;
  }
  if(localStorage.getItem('Volghlight-menu')!==null){
    body?.classList.add('light-menu');
    body?.classList.remove('dark-menu');

    const lightMenu = document.getElementById('myonoffswitch3') as HTMLInputElement;
    lightMenu.checked = true;
  }
  if(localStorage.getItem('Volghcolor-menu')!==null){
    body?.classList.add('color-menu');
    body?.classList.remove('light-menu');

    const colorMenu = document.getElementById('myonoffswitch4') as HTMLInputElement;
    colorMenu.checked = true;
  }

  if(localStorage.getItem('Volghdark-menu')!==null){
    body?.classList.add('dark-menu');
    body?.classList.remove('light-menu');

    const darkMenu = document.getElementById('myonoffswitch5') as HTMLInputElement;
    darkMenu.checked = true;
  }
  if(localStorage.getItem('Volghlight-header')!==null){
    body?.classList.add('header-light');
    body?.classList.remove('dark-header');
    body?.classList.remove('color-header');

    const lightHeader = document.getElementById('myonoffswitch6') as HTMLInputElement;
    lightHeader.checked = true;
  }
  if(localStorage.getItem('Volghcolor-header')!==null){
    body?.classList.add('color-header');
    body?.classList.remove('header-light');
    body?.classList.remove('dark-header');
    const colorHeader = document.getElementById('myonoffswitch7') as HTMLInputElement;
    colorHeader.checked = true;
  }
  if(localStorage.getItem('Volghdark-header')!==null){
    body?.classList.add('dark-header');
    body?.classList.remove('header-light');
    body?.classList.remove('color-header');
    const darkHeader = document.getElementById('myonoffswitch8') as HTMLInputElement;
    darkHeader.checked = true;
  }
  if(localStorage.getItem('Volghfullwidth')!==null){
    body?.classList.add('layout-fullwidth');
    body?.classList.remove('layout-boxed');

    const fullwidth = document.getElementById('myonoffswitch9') as HTMLInputElement;
    fullwidth.checked = true;
  }
  if(localStorage.getItem('Volghboxed')!==null){
    body?.classList.add('layout-boxed');
    body?.classList.remove('layout-fullwidth');

    const boxed = document.getElementById('myonoffswitch10') as HTMLInputElement;
    boxed.checked = true;
  }
  if(localStorage.getItem('Volghfixed')!==null){
    body?.classList.add('fixed-layout');
    body?.classList.remove('scrollable-layout');

    const fixedLayout = document.getElementById('myonoffswitch11') as HTMLInputElement;
    fixedLayout.checked = true;
  }
  if(localStorage.getItem('Volghscrollable')!==null){
    body?.classList.remove('fixed-layout');
    body?.classList.add('scrollable-layout');

    const scrollableLayout = document.getElementById('myonoffswitch12') as HTMLInputElement;
    scrollableLayout.checked = true;
  }

}

export function handleThemeUpdate(cssVars: { [x: string]: string | null; }) {
  const root = document.querySelector(':root') as HTMLElement | null ;
  if (root) {
    const keys = Object.keys(cssVars);
console.log('working');
  keys.forEach((key) => {
    root.style.setProperty(key, cssVars[key]);
    
  });
}
}
export function handleThemeUpdate1(cssVars: { [x: string]: string | null; }) {
  const root = document.querySelector(':root') as HTMLElement | null ;
  if (root) {
    const keys = Object.keys(cssVars);
    keys.forEach((key) => {
      root.style.setProperty(key, cssVars[key]);

    });
}
}
// to check the value is hexa or not
const isValidHex = (hexValue: string ) =>
  /^#([A-Fa-f0-9]{3,4}){1,2}$/.test(hexValue);

const getChunksFromString = (st: string, chunkSize: number) =>
  st.match(new RegExp(`.{${chunkSize}}`, 'g'));
// convert hex value to 256
const convertHexUnitTo256 = (hexStr: string) =>
  parseInt(hexStr.repeat(2 / hexStr.length), 16);
// get alpha value is equla to 1 if there was no value is asigned to alpha in function
const getAlphafloat = (a: number, alpha: number) => {
  if (typeof a !== 'undefined') {
    return a / 255;
  }
  if (typeof alpha != 'number' || alpha < 0 || alpha > 1) {
    return 1;
  }
  return alpha;
};
// convertion of hex code to rgba code
export function hexToRgba(hexValue: string, alpha = 1) {
  if (!isValidHex(hexValue)) {
    return null;
  }
  const chunkSize = Math.floor((hexValue.length - 1) / 3);
  const hexArr:RegExpMatchArray | null = getChunksFromString(hexValue.slice(1), chunkSize);
  if (hexArr === null) {
    // Handle the case where hexArr is null
    return '';
  }

  const [r, g, b, a] = hexArr.map(convertHexUnitTo256);
  console.log('working2');
  return `rgba(${r}, ${g}, ${b}, ${getAlphafloat(a, alpha)})`;
}
// convertion of hex code to rgb code
export function hexToRgb(hexValue: string ) {
  if (!isValidHex(hexValue)) { return null ; }
  const chunkSize = Math.floor((hexValue.length - 1) / 3);
  const hexArr = getChunksFromString(hexValue.slice(1), chunkSize);
  if (hexArr === null) {
    console.log('wdd');
    
    // Handle the case where hexArr is null
    return '';
  }
  console.log('wdd');
  const [r, g, b] = hexArr.map(convertHexUnitTo256);
  return `${r}, ${g}, ${b}`;

}
//////Bg Transparent  primary
export function dynamicBgPrimaryColor(color: string) {
  console.log("dynamicBgPrimaryColor");
  
  const cssPropName = `--volgh-primary-rgb`;
  const cssPropName1 = `--volgh-primary-rgb1`;
  handleThemeUpdate1({
    [cssPropName]: hexToRgb(color),
    [cssPropName1]: (color),
  });
  
}
///background dark
export function dynamicBgDarkPrimaryColor(primaryColor: HTMLElement[], color: string) {
  primaryColor.forEach((item: { getAttribute: (arg0: string) => string| null; }) => {
    const cssPropName1 = `--volgh-dark-${item.getAttribute('data-id5')}`;
    const cssPropName2 = `--volgh-dark-${item.getAttribute('data-id6')}`;
    handleThemeUpdate({
      [cssPropName1]: hexToRgba(color, 0.9),
      [cssPropName2]: hexToRgba(color, 1.2),
    });
  });
}

export function customClickFn() {
  const body:HTMLBodyElement | null = document.querySelector('body');
  const html = document.querySelector('html');
  const ltr = document.querySelectorAll('#myonoffswitch23');
  const rtl = document.querySelectorAll('#myonoffswitch24');
  const vertical = document.querySelectorAll('#myonoffswitch34') ;
  const horizontal = document.querySelectorAll('#myonoffswitch35');
  const horizontalHover = document.querySelectorAll('#myonoffswitch111');
  const centerLogo = document.querySelectorAll('#center-logo');
  const defaultLogo = document.querySelectorAll('#default-logo');
  const defaultTheme = document.querySelector('#myonoffswitch9')as HTMLInputElement;
  const boxed = document.querySelector('#myonoffswitch10') as HTMLInputElement;
  const fixedLayout = document.querySelector('#myonoffswitch11') as HTMLInputElement;
  const scrollableLayout = document.querySelector('#myonoffswitch12') as HTMLInputElement;
  const mainContent = document.querySelector('.main-content') as HTMLInputElement;
  const mainContainer = document.querySelectorAll('.main-container');
  const appSidebar = document.querySelector('.app-sidebar') as HTMLInputElement;
  const header = document.querySelector('.header') as HTMLInputElement;
  const mainSidemenu = document.querySelector('.main-sidemenu');
  const lightBtn = document.getElementById('myonoffswitch1') as HTMLInputElement;
  const darkBtn = document.getElementById('myonoffswitch2') as HTMLInputElement;
  const sideMenu = document.querySelector('.horizontal .side-main') as HTMLInputElement;
  const lightMenu = document.querySelector('#myonoffswitch3') as HTMLInputElement;
  const colorMenu = document.querySelector('#myonoffswitch4') as HTMLInputElement;
  const darkMenu = document.querySelector('#myonoffswitch5') as HTMLInputElement;

  const lightHeader = document.querySelector('#myonoffswitch6') as HTMLInputElement;
  const darkHeader = document.querySelector('#myonoffswitch8') as HTMLInputElement;

  const colorHeader = document.querySelector('#myonoffswitch7') as HTMLInputElement;

  const styleId = document.querySelector('#style');
  // LTR
  fromEvent(ltr, 'click').subscribe(() => {
    //add
    body?.classList.add('ltr');
    html?.setAttribute('dir', 'ltr');
    styleId?.setAttribute(
      'href',
      './assets/plugins/bootstrap/css/bootstrap.css'
    );
    //remove
    body?.classList.remove('rtl');
    sidebarFn.checkHoriMenu();
    localStorage.setItem('Volghltr', 'true');
    localStorage.removeItem('Volghrtl');
  });
  // RTL
  fromEvent(rtl, 'click').subscribe(() => {
    //add
    body?.classList.add('rtl');
    html?.setAttribute('dir', 'rtl');
    styleId?.setAttribute(
      'href',
      './assets/plugins/bootstrap/css/bootstrap.rtl.css'
    );
    //remove
    body?.classList.remove('ltr');
    sidebarFn.checkHoriMenu();
    localStorage.setItem('Volghrtl', 'true');
    localStorage.removeItem('Volghltr');
  });
  // Layouts
  fromEvent(vertical, 'click').subscribe(() => {
    //add
    mainContent?.classList.add('app-content');
    mainContainer.forEach((e: { classList: { add: (arg0: string) => void; }; })=>{
      e.classList.add('container-fluid');
    });
    header?.classList.add('app-header');
    header?.classList.remove('hor-header');
    body?.classList.add('sidebar-mini');
    //remove
    body?.classList.remove('horizontal');
    body?.classList.remove('horizontal-hover');
    appSidebar?.classList.remove('horizontal-main');
    mainSidemenu?.classList.remove('container');
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
  });
  fromEvent(horizontal, 'click').subscribe(() => {
    //add
    body?.classList.add('horizontal');
    mainContainer.forEach((e: { classList: { add: (arg0: string) => void; }; })=>{
      e.classList.add('container');
    });
    appSidebar?.classList.add('horizontal-main');
    mainSidemenu?.classList.add('container');
    sideMenu?.classList.add('flex-nowrap');
    // // remove
    sideMenu?.classList.remove('flex-wrap');
    mainContent?.classList.remove('app-content');
    mainContent?.classList.add('hor-content');
    mainContainer.forEach((e: { classList: { remove: (arg0: string) => void; }; })=>{
      e.classList.remove('container-fluid');
    });
    header?.classList.add('hor-header');
    header?.classList.remove('app-header');
    body?.classList.remove('sidebar-mini');
    body?.classList.remove('sidenav-toggled');
    body?.classList.remove('horizontal-hover');
    const li = document.querySelectorAll('.side-menu li');
    li.forEach((e) => {
      e.classList.remove('is-expanded');
    });
    sidebarFn.checkHoriMenu();
    setTimeout(()=>{
      sidebarFn.parentNavActive();
    }, 300);
    localStorage.setItem('Volghhorizontal', 'true');
    localStorage.removeItem('VolghhorizontalHorizontal');
    localStorage.removeItem('VolghsidebarMini');

  });
  fromEvent(horizontalHover, 'click').subscribe(() => {
    //add
    body?.classList.add('horizontal');
    body?.classList.add('horizontal-hover');
    mainContent?.classList.add('hor-content');
    mainContainer.forEach((e: { classList: { add: (arg0: string) => void; }; })=>{
      e.classList.add('container');
    });
    console.log(mainContainer);
    appSidebar?.classList.add('horizontal-main');
    mainSidemenu?.classList.add('container');
    sideMenu?.classList.add('flex-nowrap');
    // remove
    sideMenu?.classList.remove('flex-wrap');
    mainContent?.classList.remove('app-content');
    mainContainer.forEach((e: { classList: { remove: (arg0: string) => void; }; })=>{
      e.classList.remove('container-fluid');
    });
    header?.classList.add('hor-header');
    header?.classList.remove('app-header');
    body?.classList.remove('sidebar-mini');
    body?.classList.remove('sidenav-toggled');

    const li = document.querySelectorAll('.side-menu li');
    li.forEach((e) => {
      e.classList.remove('is-expanded');
    });
    sidebarFn.checkHoriMenu();
    setTimeout(()=>{
      sidebarFn.parentNavActive();
    }, 300);
    localStorage.setItem('VolghhorizontalHover', 'true');
    localStorage.removeItem('Volghhorizontal');
    localStorage.removeItem('VolghsidebarMini');
  });
  //logo
  fromEvent(centerLogo,'click').subscribe(()=>{
    body?.classList.add('center-logo');
    body?.classList.remove('default-logo');
    localStorage.setItem('Volghcenter-logo','true');
    localStorage.removeItem('Volghdefault-logo');

  });
  fromEvent(defaultLogo,'click').subscribe(()=>{
    body?.classList.add('default-logo');
    body?.classList.remove('center-logo');

  });
  // LTR
  fromEvent(ltr, 'click').subscribe(() => {
    //add
    body?.classList.add('ltr');
    html?.setAttribute('dir', 'ltr');
    styleId?.setAttribute(
      'href',
      './assets/plugins/bootstrap/css/bootstrap.css'
    );
    //remove
    body?.classList.remove('rtl');
    sidebarFn.checkHoriMenu();
    localStorage.setItem('volghltr', 'true');
    localStorage.removeItem('volghrtl');
  });
    // RTL
    fromEvent(rtl, 'click').subscribe(() => {
      //add
      body?.classList.add('rtl');
      html?.setAttribute('dir', 'rtl');
      styleId?.setAttribute(
        'href',
        './assets/plugins/bootstrap/css/bootstrap.rtl.css'
      );
      //remove
      body?.classList.remove('ltr');
      sidebarFn.checkHoriMenu();
      localStorage.setItem('volghrtl', 'true');
      localStorage.removeItem('volghltr');
    });
  // Theme
  fromEvent(lightBtn, 'click').subscribe(() => {
    lightBtn.checked = true;
    // add
    document.querySelector('body')?.classList.add('light-mode');
    // remove
    document.querySelector('body')?.classList.remove('dark-mode');
    document.querySelector('body')?.classList.remove('bg-img1');
    document.querySelector('body')?.classList.remove('bg-img2');
    document.querySelector('body')?.classList.remove('bg-img3');
    document.querySelector('body')?.classList.remove('bg-img4');
    localStorage.clear();
    localStorage.setItem('Volghlight-theme', 'true');
    localStorage.removeItem('Volghdark-theme');
    console.log('ok');

  });
  fromEvent(darkBtn, 'click').subscribe(() => {
    darkBtn.checked = true;
    // add
    document.querySelector('body')?.classList.add('dark-mode');
    // remove
    document.querySelector('body')?.classList.remove('light-mode');
    document.querySelector('body')?.classList.remove('bg-img1');
    document.querySelector('body')?.classList.remove('bg-img2');
    document.querySelector('body')?.classList.remove('bg-img3');
    document.querySelector('body')?.classList.remove('bg-img4');
    localStorage.clear();
    localStorage.setItem('Volghdark-theme', 'true');
    localStorage.removeItem('Volghlight-theme');
  });
  // layout width  style
  fromEvent(defaultTheme, 'click').subscribe(() => {
    body?.classList.add('layout-fullwidth');
    body?.classList.remove('layout-boxed');
    localStorage.setItem('Volghfullwidth','true');
    localStorage.removeItem('Volghboxed');
    sidebarFn.checkHoriMenu();
  });

  fromEvent(boxed, 'click').subscribe(() => {
    body?.classList.add('layout-boxed');
    body?.classList.remove('layout-fullwidth');
    localStorage.setItem('Volghboxed','true');
    localStorage.removeItem('Volghfullwidth');
    sidebarFn.checkHoriMenu();
  });
  // layout position
  fromEvent(fixedLayout, 'click').subscribe(() => {
    body?.classList.add('fixed-layout');
    body?.classList.remove('scrollable-layout');
    localStorage.setItem('Volghfixed','true');
    localStorage.removeItem('Volghscrollable');
  });
  fromEvent(scrollableLayout, 'click').subscribe(() => {
    body?.classList.add('scrollable-layout');
    body?.classList.remove('fixed-layout');
    localStorage.setItem('Volghscrollable','true');
    localStorage.removeItem('Volghfixed');
  });
  // menu
  fromEvent(lightMenu, 'click').subscribe(() => {
    body?.classList.add('light-menu');
    body?.classList.remove('color-menu');
    body?.classList.remove('dark-menu');
    localStorage.setItem('Volghlight-menu','true');
    localStorage.removeItem('Volghcolor-menu');
    localStorage.removeItem('Volghdark-menu');
  });
  fromEvent(colorMenu, 'click').subscribe(() => {
    body?.classList.add('color-menu');
    body?.classList.remove('light-menu');
    body?.classList.remove('dark-menu');
    localStorage.setItem('Volghcolor-menu','true');
    localStorage.removeItem('Volghlight-menu');
    localStorage.removeItem('Volghdark-menu');

  });
  fromEvent(darkMenu, 'click').subscribe(() => {
    body?.classList.add('dark-menu');
    body?.classList.remove('color-menu');
    body?.classList.remove('light-menu');
    localStorage.setItem('Volghdark-menu','true');
    localStorage.removeItem('Volghlight-menu');
    localStorage.removeItem('Volghcolor-menu');
  });

  // header
  fromEvent(lightHeader, 'click').subscribe(() => {
    body?.classList.add('header-light');
    body?.classList.remove('color-header');
    body?.classList.remove('dark-header');
    localStorage.removeItem('Volghdark-header');
    localStorage.setItem('Volghlight-header','true');
    localStorage.removeItem('Volghcolor-header');
  });
  fromEvent(darkHeader, 'click').subscribe(() => {
    body?.classList.add('dark-header');
    body?.classList.remove('header-light');
    body?.classList.remove('color-header');
    localStorage.setItem('Volghdark-header','true');
    localStorage.removeItem('Volghlight-header');
    localStorage.removeItem('Volghcolor-header');

  });
  fromEvent(colorHeader, 'click').subscribe(() => {
    body?.classList.add('color-header');
    body?.classList.remove('header-light');
    body?.classList.remove('dark-header');
    localStorage.setItem('Volghcolor-header','true');
    localStorage.removeItem('Volghlight-header');
    localStorage.removeItem('Volghdark-header');
  });

}

export function removeForTransparent() {
  if (document.querySelector('body')?.classList.contains('header-light')) {
    document.querySelector('body')?.classList.remove('header-light');
  }
  // color header
  if (document.querySelector('body')?.classList.contains('color-header')) {
    document.querySelector('body')?.classList.remove('color-header');
  }

  // dark header
  if (document.querySelector('body')?.classList.contains('dark-header')) {
    document.querySelector('body')?.classList.remove('dark-header');
  }

  // light menu
  if (document.querySelector('body')?.classList.contains('light-menu')) {
    document.querySelector('body')?.classList.remove('light-menu');
  }
  // color menu
  if (document.querySelector('body')?.classList.contains('color-menu')) {
    document.querySelector('body')?.classList.remove('color-menu');
  }

  // dark menu
  if (document.querySelector('body')?.classList.contains('dark-menu')) {
    document.querySelector('body')?.classList.remove('dark-menu');
  }
}

export function checkOptions() {
  // light header
  if (document.querySelector('body')?.classList.contains('light-header')) {
    const light = document.getElementById('myonoffswitch6') as HTMLInputElement;
    light.checked = true;
  }
  // color header
  if (document.querySelector('body')?.classList.contains('color-header')) {
    const light = document.getElementById('myonoffswitch7') as HTMLInputElement;
    light.checked = true;
  }

  // dark header
  if (document.querySelector('body')?.classList.contains('dark-header')) {
    const light = document.getElementById('myonoffswitch8') as HTMLInputElement;
    light.checked = true;
  }

  // light menu
  if (document.querySelector('body')?.classList.contains('light-menu')) {
    const light = document.getElementById('myonoffswitch3') as HTMLInputElement;
    light.checked = true;
  }
  // color menu
  if (document.querySelector('body')?.classList.contains('color-menu')) {
    const light = document.getElementById('myonoffswitch4') as HTMLInputElement;
    light.checked = true;
  }

  // dark menu
  if (document.querySelector('body')?.classList.contains('dark-menu')) {
    const light = document.getElementById('myonoffswitch5') as HTMLInputElement;
    light.checked = true;
  }
  if (document.querySelector('body')?.classList.contains('dark-menu')) {
    const light = document.getElementById('myonoffswitch5') as HTMLInputElement;
    light.checked = true;
  }

}

let myVarVal:string='';
// let myVarVal1:string='';
export function updateChanges() {
  const primaryColorVal = getComputedStyle(document.documentElement)
    .getPropertyValue('--volgh-primary-bg-color')
    .trim();

  //get variable
  myVarVal =
    localStorage.getItem('Volghlight-primary-color') ||
    localStorage.getItem('Volghdark-primary-color') ||
    primaryColorVal;
    // myVarVal1 = localStorage.getItem("volghprimaryColor") ? hexToRgba(localStorage.getItem("volghprimaryColor"), 0.8) : null;

    const colorData5 = hexToRgba(myVarVal, 0.5);
    document.querySelector('html')?.style.setProperty('--primary05', colorData5);
    
    const colorData1 = hexToRgba(myVarVal, 0.1);
    document.querySelector('html')?.style.setProperty('--primary01', colorData1);
    
      const colorData2 = hexToRgba(myVarVal, 0.2);
      document.querySelector('html')?.style.setProperty('--primary02', colorData2);
  const colorData3 = hexToRgba(myVarVal, 0.3);
  document.querySelector('html')?.style.setProperty('--volgh-primary03', colorData3);

  const colorData6 = hexToRgba(myVarVal, 0.6);
  document.querySelector('html')?.style.setProperty('--volgh-primary06', colorData6);
  const colorData9 = hexToRgba(myVarVal, 0.9);
  document.querySelector('html')?.style.setProperty('--volgh-primary09', colorData9);

}
updateChanges();

