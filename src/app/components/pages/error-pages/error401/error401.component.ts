import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-error401',
  templateUrl: './error401.component.html',
  styleUrls: ['./error401.component.scss']
})
export class Error401Component implements OnInit {

  constructor(@Inject(DOCUMENT) private document: Document,private renderer: Renderer2) { }

  ngOnInit(): void {
    this.renderer.addClass(this.document.body, "login-img");
    this.renderer.removeClass(this.document.body, "app");
    this.renderer.removeClass(this.document.body, "ltr");
    this.renderer.removeClass(this.document.body, "sidebar-mini");
    this.renderer.removeClass(this.document.body, "light-mode");
    this.renderer.removeClass(this.document.body, "default-menu");

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
