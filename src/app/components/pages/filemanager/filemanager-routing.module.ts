import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileattachmentsComponent } from './fileattachments/fileattachments.component';
import { FiledetailsComponent } from './filedetails/filedetails.component';
import { FilemanagerComponent } from './filemanager/filemanager.component';
import { FilemanagerlistComponent } from './filemanagerlist/filemanagerlist.component';
const routes: Routes = [
  {
    path: 'filemanager',
    children: [

      { path: "filemanager", component: FilemanagerComponent },
      { path: "filemanagerlist", component: FilemanagerlistComponent },
      { path: "filedetails", component: FiledetailsComponent },
      { path: "fileattachments", component: FileattachmentsComponent },

    ]
  }

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilemanagerRoutingModule { }
