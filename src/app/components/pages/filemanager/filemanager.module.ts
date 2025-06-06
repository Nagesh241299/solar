import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilemanagerRoutingModule } from './filemanager-routing.module';
import { FilemanagerComponent } from './filemanager/filemanager.component';
import { FilemanagerlistComponent } from './filemanagerlist/filemanagerlist.component';
import { FiledetailsComponent } from './filedetails/filedetails.component';
import { FileattachmentsComponent } from './fileattachments/fileattachments.component';
import { SharedModule } from 'src/app/shared/shared.module';

import { GalleryModule } from '@ks89/angular-modal-gallery';
import'hammerjs';
import 'mousetrap';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    FilemanagerComponent,
    FilemanagerlistComponent,
    FiledetailsComponent,
    FileattachmentsComponent
  ],
  imports: [
    CommonModule,
    FilemanagerRoutingModule,
    SharedModule,
    GalleryModule,
 NgCircleProgressModule.forRoot(),
CarouselModule,
NgbDropdownModule,
NgbModule

  ]
})
export class FilemanagerModule { }
