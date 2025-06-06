import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
interface DropzoneState {
  addedFiles: File[];
  // Add any other properties that are relevant to your specific use case
}
@Component({
  selector: 'app-blogpost',
  templateUrl: './blogpost.component.html',
  styleUrls: ['./blogpost.component.scss']
})
export class BlogpostComponent implements OnInit {

  constructor() {

  }
  //Angular Editor
  public config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };
ngOnInit(): void {

  }
  files: File[] = [];

  onSelect(event: DropzoneState) {
    // console.log(event);
    this.files.push(...event.addedFiles);
  }
  onRemove(event: File) {
    // console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

}

