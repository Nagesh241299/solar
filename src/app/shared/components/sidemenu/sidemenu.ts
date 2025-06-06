import { fromEvent } from 'rxjs';

export function switcherArrowFn() {
  const slideLeft = document.getElementsByClassName('.slide-left');
  const slideRight = document.getElementsByClassName('.slide-right');

  fromEvent(slideLeft, 'click').subscribe(() => {
    slideClick();
  });
  fromEvent(slideRight, 'click').subscribe(() => {
    slideClick();
  });

  // used to remove is-expanded class and remove class on clicking arrow buttons
  function slideClick() {
    const slide = document.querySelectorAll<HTMLElement>('.slide');
    const slideMenu = document.querySelectorAll<HTMLElement>('.slide-menu');
    slide.forEach((element) => {
      if (element.classList.contains('is-expanded') == true) {
        element.classList.remove('is-expanded');
      }
    });
    slideMenu.forEach((element) => {
      if (element.classList.contains('open') == true) {
        element.classList.remove('open');
        element.style.display = 'none';
      }
    });
  }

  checkHoriMenu();

  const slideLeftLTR: any = document.querySelector('.slide-left');
  const slideRightLTR: HTMLElement | any = document.querySelector('.slide-right');

  fromEvent(slideLeftLTR, 'click').subscribe(() => {
    console.log(slideLeftLTR);

    const menuWidth: any =
      document.querySelector<HTMLElement>('.horizontal-main');
    const menuItems: any = document.querySelector<HTMLElement>('.side-menu');
    const mainSidemenuWidth: any =
      document.querySelector<HTMLElement>('.main-sidemenu');

    const menuContainerWidth =
      menuWidth?.offsetWidth - mainSidemenuWidth?.offsetWidth;
    const marginLeftValue =
      Math.ceil(
        Number(window.getComputedStyle(menuItems).marginLeft.split('px')[0])
      ) + 100;

    if (marginLeftValue < 0) {
      // menuItems.style.marginRight = 0;
      menuItems.style.marginLeft =
        Number(menuItems.style.marginLeft.split('px')[0]) + 100 + 'px';
      if (menuWidth?.offsetWidth - menuContainerWidth < menuItems.scrollWidth) {
        document.querySelector('.slide-left')?.classList.remove('d-none');
        document.querySelector('.slide-right')?.classList.remove('d-none');
      }
    } else {
      document.querySelector('.slide-left')?.classList.add('d-none');
    }

    if (marginLeftValue >= 0) {
      // menuItems.style.marginRight = 0;
      menuItems.style.marginLeft = '0px';
      if (menuWidth?.offsetWidth < menuItems.scrollWidth) {
        document.querySelector('.slide-left')?.classList.add('d-none');
      }
    }

    // to remove dropdown when clicking arrows in horizontal menu
    const subNavSub = document.querySelectorAll<HTMLElement>('.sub-nav-sub');
    subNavSub.forEach((e) => {
      e.style.display = '';
    });
    const subNav = document.querySelectorAll<HTMLElement>('.nav-sub');
    subNav.forEach((e) => {
      e.style.display = '';
    });
    //
  });
  fromEvent(slideRightLTR, 'click').subscribe(() => {
    console.log(Math.random());
    
    const menuWidth: any =
      document.querySelector<HTMLElement>('.horizontal-main');
    const menuItems: any = document.querySelector<HTMLElement>('.side-menu');
    const mainSidemenuWidth: any =
      document.querySelector<HTMLElement>('.main-sidemenu');
    const menuContainerWidth =
      menuWidth?.offsetWidth - mainSidemenuWidth?.offsetWidth;
    const marginLeftValue =
      Math.ceil(
        Number(window.getComputedStyle(menuItems).marginLeft.split('px')[0])
      ) - 100;
    const check =
      menuItems.scrollWidth + (0 - menuWidth?.offsetWidth) + menuContainerWidth;

    if (marginLeftValue > -check) {
      // menuItems.style.marginRight = 0;
      menuItems.style.marginLeft =
        Number(menuItems.style.marginLeft.split('px')[0]) - 100 + 'px';
    } else {
      // menuItems.style.marginRight = 0;
      menuItems.style.marginLeft = -check + 'px';
      document.querySelector('.slide-right')?.classList.add('d-none');
    }
    if (marginLeftValue != 0) {
      document.querySelector('.slide-left')?.classList.remove('d-none');
    }
    // to remove dropdown when clicking arrows in horizontal menu
    const subNavSub = document.querySelectorAll<HTMLElement>('.sub-nav-sub');
    subNavSub.forEach((e) => {
      e.style.display = '';
    });
    const subNav = document.querySelectorAll<HTMLElement>('.nav-sub');
    subNav.forEach((e) => {
      e.style.display = '';
    });
    //
  });

}
export function checkHoriMenu() {
  
  const menuWidth: any = document.querySelector<HTMLElement>('.horizontal-main');
  const menuItems: any = document.querySelector<HTMLElement>('.side-menu');
  const mainSidemenuWidth: any =
    document.querySelector<HTMLElement>('.main-sidemenu');

  const menuContainerWidth =
    menuWidth?.offsetWidth - mainSidemenuWidth?.offsetWidth;
  const marginLeftValue = Math.ceil(
    Number(window.getComputedStyle(menuItems).marginLeft.split('px')[0])
  );
  const marginRightValue = Math.ceil(
    Number(window.getComputedStyle(menuItems).marginRight.split('px')[0])
  );
  const check =
    menuItems.scrollWidth + (0 - menuWidth?.offsetWidth) + menuContainerWidth;

  if (document.querySelector('body')?.classList.contains('ltr')) {
    menuItems.style.marginRight = 0;
  } else {
    menuItems.style.marginLeft = 0;
  }

  setTimeout(() => {
    if (
      menuItems.scrollWidth - 2 <
      menuWidth?.offsetWidth - menuContainerWidth
    ) {
      document.querySelector('.slide-left')?.classList.add('d-none');
      document.querySelector('.slide-right')?.classList.add('d-none');
      document.querySelector('.slide-leftRTL')?.classList.add('d-none');
      document.querySelector('.slide-rightRTL')?.classList.add('d-none');
    } else if (marginLeftValue != 0 || marginRightValue != 0) {
      document.querySelector('.slide-right')?.classList.remove('d-none');
      document.querySelector('.slide-rightRTL')?.classList.remove('d-none');
    } else if (marginLeftValue != -check || marginRightValue != -check) {
      document.querySelector('.slide-left')?.classList.remove('d-none');
      document.querySelector('.slide-leftRTL')?.classList.remove('d-none');
    }
    if (
      menuItems.scrollWidth - 2 >
      menuWidth?.offsetWidth - menuContainerWidth
    ) {
      document.querySelector('.slide-left')?.classList.remove('d-none');
      document.querySelector('.slide-right')?.classList.remove('d-none');
      document.querySelector('.slide-leftRTL')?.classList.remove('d-none');
      document.querySelector('.slide-rightRTL')?.classList.remove('d-none');
    }
    if (marginLeftValue == 0 || marginRightValue == 0) {
      document.querySelector('.slide-left')?.classList.add('d-none');
      document.querySelector('.slide-leftRTL')?.classList.add('d-none');
    }
    if (marginLeftValue !== 0 || marginRightValue !== 0) {
      document.querySelector('.slide-left')?.classList.remove('d-none');
      document.querySelector('.slide-leftRTL')?.classList.remove('d-none');
    }
  }, 500);
}

export function parentNavActive() {
  const slideItemActive = document.querySelector(
    '.slide-item.active:not([href="/"])'
  );
  const SubslideItemActive = document.querySelector(
    '.sub-slide-item.active:not([href="/"])'
  );
  if (slideItemActive) {
    slideItemActive.parentElement?.parentElement?.parentElement?.firstElementChild?.classList.add(
      'active'
    );
  }
  if (SubslideItemActive) {
    SubslideItemActive.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.firstElementChild?.classList.add(
      'active'
    );
    SubslideItemActive.parentElement?.parentElement?.parentElement?.firstElementChild?.classList.add(
      'active'
    );
  }
}
