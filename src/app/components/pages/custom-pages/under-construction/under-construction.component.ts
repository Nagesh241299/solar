import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import {CdTimerComponent} from 'angular-cd-timer';

@Component({
  selector: 'app-under-construction',
  templateUrl: './under-construction.component.html',
  styleUrls: ['./under-construction.component.scss']
})
export class UnderConstructionComponent implements OnInit {

  @ViewChild('basicTimer', { static: true }) basicTimer!: CdTimerComponent;

  timerInfo = '';
  constructor(@Inject(DOCUMENT) private document: Document,private renderer: Renderer2) { 
    this.timerInfo = '';
  }

  onComplete(data: { elt: { nativeElement: { classList: { add: (arg0: string) => void; }; }; }; }) {
    data.elt.nativeElement.classList.add("muteCount");
  }
 onTick() {
    this.timerInfo = '';
  }

  onStart() {
    // console.log('Timer started.');
  }

  doActionBasicTimer(action: string) {
    switch (action) {
      case 'start':
        this.basicTimer.start();
        break;
      case 'resume':
        this.basicTimer.resume();
        break;
      case 'reset':
        this.basicTimer.reset();
        break;
      default:
        this.basicTimer.stop();
        break;
    }
  }
  public days!: number;
  public hours!: number;
  public minutes!: number;
  public seconds!: number;
  
  ngOnInit(): void {
    this.renderer.addClass(this.document.body, "login-img");
    this.renderer.removeClass(this.document.body, "app");
    this.renderer.removeClass(this.document.body, "ltr");
    this.renderer.removeClass(this.document.body, "sidebar-mini");
    this.renderer.removeClass(this.document.body, "light-mode");
    this.renderer.removeClass(this.document.body, "default-menu");
    const countDown = new Date('jul 1, 2024 00:00:00').getTime();
    const time = setInterval(()=>{
      const now = new Date().getTime();
      const distance = countDown - now;
      this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / ( 1000 * 60 * 60));
      this.minutes = Math.floor((distance % (1000 * 60 * 60)) / ( 1000 * 60 ));
      this.seconds = Math.floor((distance % (1000 * 60 )) / 1000);
  
      if(distance < 0){
        clearInterval(time);
      }
    }, 1000);
  }
  ngOnDestroy(): void {
    this.renderer.removeClass(this.document.body, "login-img");
    this.renderer.addClass(this.document.body, "app");
    this.renderer.addClass(this.document.body, "ltr");
    this.renderer.addClass(this.document.body, "sidebar-mini");
    this.renderer.addClass(this.document.body, "light-mode");
    this.renderer.addClass(this.document.body, "default-menu");

}
}
