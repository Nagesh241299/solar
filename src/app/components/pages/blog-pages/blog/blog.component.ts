import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  currentRoute:  string | undefined;
  urlData:  string[] | undefined;
  constructor(private router:Router) {

   this.router.events.pipe(filter((event)=> event instanceof NavigationEnd)).subscribe( (event) => {
      const navigationEndEvent = event as NavigationEnd;

      this.currentRoute = navigationEndEvent.url;
      this.urlData = navigationEndEvent.url.split("/");
    });
  }
  ngOnInit(): void {
  }

}
