import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appToggleTheme]'
})
export class ToggleThemeDirective {
  private body = document.querySelector('body');
  constructor() { }

  @HostListener('click') toggleTheme(){

    if (this.body instanceof HTMLBodyElement) {
      this.body.classList.toggle('dark-mode');
      const dark = document.getElementById('myonoffswitch2') as HTMLInputElement;
    dark.checked = true;
 
      this.body.classList.remove('bg-img1');
      this.body.classList.remove('bg-img2');
      this.body.classList.remove('bg-img3');
      this.body.classList.remove('bg-img4');
    }
    
  }
}
