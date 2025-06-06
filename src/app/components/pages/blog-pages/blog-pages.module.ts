import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogPagesRoutingModule } from './blog-pages-routing.module';
import { BlogpostComponent } from './blogpost/blogpost.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { BlogComponent } from './blog/blog.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxEditorModule } from 'ngx-editor';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    BlogpostComponent,
    BlogDetailsComponent,
    BlogComponent

  ],
  imports: [
    CommonModule,
    SharedModule,
    NgSelectModule,
    BlogPagesRoutingModule,
    NgxEditorModule,
    NgxDropzoneModule,
      FormsModule,
    ReactiveFormsModule,
    AngularEditorModule,
    HttpClientModule
  
  ]
})
export class BlogPagesModule { }
