import { Component, OnInit } from '@angular/core';
import { SwitcherService } from 'src/app/shared/services/switcher.service';

@Component({
  selector: 'app-content-style',
  templateUrl: './content-style.component.html',
  styleUrls: ['./content-style.component.scss']
})
export class ContentStyleComponent implements OnInit {

  constructor( public SwitcherService: SwitcherService) { }

  ngOnInit(): void {

  }
  scrolled: boolean = false;
  toggleSwitcherBody() {
    this.SwitcherService.emitChange(false);

  }
}
