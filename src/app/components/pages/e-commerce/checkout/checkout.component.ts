import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  TabStyle1=1;
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

  successAlert(){
    Swal.fire({
      icon: 'success',
      title: 'Congrats Your Order Is Placed Successfully!',
      text: 'Thank You!',
      confirmButtonColor: '#0162e8'
    });
  }
}
