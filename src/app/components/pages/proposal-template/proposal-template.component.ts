import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';;
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PastProjectsService } from 'src/app/shared/services/past-projects.service';
import Swal from 'sweetalert2';
import { envDetails } from 'src/config/env.utils'; // Adjust path based on location of env.utils.ts



@Component({
  selector: 'app-proposal-template',
  templateUrl: './proposal-template.component.html',
  styleUrls: ['./proposal-template.component.scss']
})


export class ProposalTemplateComponent implements OnInit {

  flag: any;
  baseUrl = envDetails.apiUrl;
  isLoader: boolean = false;
  modalRef: any;
  templateForm!: FormGroup;
  isEdit: boolean = false; // Set dynamically to toggle between create and edit modes
  fileError: string | null = null; // For specific file validation errors
  uploadedFile: File | null = null;
  totalItems: number = 0;
  pageSizeOptions: number[] = [5, 10, 50, 100];
  pageSize: number = 10;
  currentPage: number = 1;
  maxPage = 4; // This should match the maxSize property in the template
  paginatedData: any[] = [];
  id: any;
  Data: any = [];
  templatrData: any;
  filePreviewUrl: any;
  existingFile: any
  newFile: any;
  isUpload: any = false;



  constructor(private modalService: NgbModal, private fb: FormBuilder, private pastProjectservice: PastProjectsService) {
    this.templateForm = this.fb.group({
      title: ['', Validators.required], // Title is required
      file: [null, Validators.required] // File is required
    });

  }


  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.onPageChange(1);
  }

  downloadSample() {
    // download sample template
    this.templateForm.get('title')?.markAsUntouched();
    this.isLoader = true;
    this.pastProjectservice.downloadProposalTemplate().subscribe(
      //for download, we are taking response as a blob
      (response: Blob) => {
        this.isLoader = false;
        // Create a URL for the Blob
        const downloadUrl = window.URL.createObjectURL(response);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'Sample_template.docx';  // Name of the downloaded file
        link.click();

        Swal.fire({
          icon: 'success',
          title: "Success",
          html: 'Proposal Sample Template Download Successfully!',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      },
      (error: any) => {
        this.isLoader = false;
        console.error(error);

      }
    );
  }

  // getTemplateDataList() {

  //   this.isLoader = true;
  //   this.pastProjectservice.getProposalTemplateList().subscribe(
  //     async (response: any) => {
  //       this.isLoader = false;
  //       const newData = response.data
  //       this.Data = []
  //       this.Data = response.data;

  //       this.totalItems = response.count;
  //       this.pageSize = response.data.length;

  //       this.updatePagination();
  //       this.paginateData();
  //     },
  //     (error: any) => {
  //       this.isLoader = false;
  //       console.error(error);
  //     }
  //   );

  // }

  paginateData(): void {

    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.totalItems);
    this.paginatedData = this.Data.slice(startIndex, endIndex);
  }

  updatePagination(): void {
    this.maxPage = Math.ceil(this.totalItems / this.pageSize);
    if (this.maxPage > 10) {
      this.maxPage = 0; // Set to 0 to display all pages
    }
  }

  // get nextpage proposalData list 
  

    onPageChange(page: number): void {
  this.currentPage = page;
  this.isLoader = true;
  this.pastProjectservice.getProposalTemplateList(this.currentPage, this.pageSize).subscribe(
    (response: any) => {
      this.isLoader = false;
      // Use consistent response property (choose either data or results)
      this.Data = response.data || response.results;
      this.totalItems = response.count;
      this.updatePagination();
      this.paginateData();
    },
    (error: any) => {
      this.isLoader = false;
      console.error(error);
      // this.toastr.error('Failed to load proposals', 'Error');
    }
  );
}


  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const validExtensions = ['doc', 'docx'];

      // Validate file extension
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      if (fileExtension && validExtensions.includes(fileExtension)) {
        this.uploadedFile = file; // Store the valid file
        this.fileError = null; // Clear any existing file errors
        // console.log(this.uploadedFile, 'Uploaded File');
        // console.log(file.name, 'Filename');

        // Update the form with the new file
        this.templateForm.patchValue({ file });
      } else {
        this.uploadedFile = null; // Reset the uploaded file
        this.fileError = 'Please upload a valid Word document (.doc or .docx).';
        this.templateForm.patchValue({ file: null }); // Reset the form control
      }
    } else {
      this.uploadedFile = null; // Clear file if no file is selected
      this.fileError = 'File is required.';
      this.templateForm.patchValue({ file: null }); // Reset the form control
    }
  }


  onSubmit() {

    if (this.isEdit == false) {
      if (this.templateForm.invalid) {
        this.templateForm.markAllAsTouched();
        return
      }
      // To ADD Template
      const formData = new FormData();
      formData.append('title', this.templateForm.value.title); // Append title
      if (this.uploadedFile) {
        formData.append('file', this.uploadedFile); // Append file
      }

      // console.log(formData);
      // console.log('Creating Template:', formData);
      // Call create API here
      this.isLoader = true;
      this.pastProjectservice.CreateProposalTemplate(formData).subscribe(
        async (response: any) => {
          // On success
          this.isLoader = false;
          Swal.fire({
            icon: 'success',
            title: "Success",
            html: 'Proposal Template Added Successfully',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
          });

          // Reset form and close modal
          this.templateForm.reset();
          this.closeModal();
          this.ngOnInit();

          // Reload testimonials data
          this.onPageChange(this.currentPage);
        },
        (error: any) => {
          // Error handling
          this.isLoader = false;
          // console.log(error);
          const errorMessage = error.error.error;
          Swal.fire({
            icon: 'error',
            title: "Error",
            html: errorMessage,
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
          });

        }
      );
    }

    if (this.isEdit == true) {


      if (this.isEdit == true && (this.uploadedFile == null)) {
        const formData = new FormData();
        this.flag = false;

        formData.append('flag', this.flag);
        formData.append('title', this.templateForm.value.title)
        //  console.log(formData, 'updateno file')
        // Call update API 
        this.isLoader = true;

        this.pastProjectservice.UpdateProposalTemplate(formData, this.id).subscribe(
          async (response: any) => {
            this.isLoader = false;
            Swal.fire({
              icon: 'success',
              title: "Success",
              html: 'Proposal Template Updated Successfully',
              timer: 2000,
              timerProgressBar: true,
              showConfirmButton: false,
            });
            this.closeModal();
            this.onPageChange(this.currentPage);

          },
          (error: any) => {
            this.isLoader = false;
            // console.log(error.status);
            if (error) {
              Swal.fire({
                icon: 'error',
                title: ['errorMessage'],
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
              });
            }
          }
        );
        return
      }

      if (this.isEdit == true) {
        const formData = new FormData();


        if (this.uploadedFile) {
          this.isUpload = true;
          formData.append('file', this.uploadedFile);
          formData.append('isUpload', this.isUpload);
          formData.append('title', this.templateForm.value.title); // Append title
          // Call update API 
          this.isLoader = true;

          this.pastProjectservice.UpdateProposalTemplate(formData, this.id).subscribe(
            async (response: any) => {
              this.isLoader = false;
              Swal.fire({
                icon: 'success',
                title: "Success",
                html: 'Proposal Template Updated Successfully',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
              });
              this.closeModal();
              this.onPageChange(this.currentPage);

            },
            (error: any) => {
              this.isLoader = false;
              // console.log(error.status);
              if (error) {
                Swal.fire({
                  icon: 'error',
                  title: ['errorMessage'],
                  timer: 2000,
                  timerProgressBar: true,
                  showConfirmButton: false,
                });
              }
            }
          );

        } else {


          // To ADD Template
          const formData = new FormData();
          formData.append('title', this.templateForm.value.title); // Append title
          if (this.uploadedFile) {
            formData.append('file', this.uploadedFile); // Append file
          }

          // console.log(formData);
          // console.log('Creating Template:', formData);
          // Call create API here
          this.isLoader = true;
          this.pastProjectservice.CreateProposalTemplate(formData).subscribe(
            async (response: any) => {
              // On success
              this.isLoader = false;
              Swal.fire({
                icon: 'success',
                title: "Success",
                html: 'Proposal Template Added Successfully',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
              });

              // Reset form and close modal
              this.templateForm.reset();
              this.closeModal();

              // Reload testimonials data
              this.onPageChange(this.currentPage);
            },
            (error: any) => {
              // Error handling
              this.isLoader = false;
              // console.log(error);
              const errorMessage = error.error.message
              Swal.fire({
                icon: 'error',
                title: errorMessage,
                html: error,
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
              });

            }
          );
        }

        this.closeModal();

      }
    }
  }


  LargeSizeOpen(largesizemodal: any) {
    this.templateForm.reset()
    this.isEdit = false;
    this.modalRef = this.modalService.open(largesizemodal, { size: 'md', backdrop: 'static', centered: true });

    setTimeout(() => {
      const modalBody = document.querySelector('.modal-body');
      if (modalBody) {
        (modalBody as HTMLElement).focus();
      }
    }, 0)
  }

  closeModal() {
    if (this.modalRef) {
      // console.log(this.modalRef, "Close modal")
      this.modalRef.dismiss();
      this.modalRef.close();
      this.templateForm.reset()
      this.isEdit = false;
    }
  }

  onEditTemplate(id: any, largesizemodal: any) {
    this.modalRef = this.modalService.open(largesizemodal, { size: 'md', backdrop: 'static', centered: true });
    this.isEdit = true;
    this.isLoader = true;
    this.pastProjectservice.getProposalTemplateDataById(id).subscribe(
      async (response: any) => {
        this.isLoader = false;
        this.templatrData = response.data;
        this.id = this.templatrData.id;

        //console.log(this.testimonialData, 'testa')

        // Set form values
        this.templateForm.patchValue({
          title: this.templatrData.title,
        });


        // Track existing file for preview and updates
        this.existingFile = `${envDetails.apiUrl}/${this.templatrData.file}`;
        this.filePreviewUrl = this.existingFile; // Set preview URL
      },
      (error: any) => {
        this.isLoader = false;
        // console.log(error.status);
      }
    );

  }
  onPreviewFile() {
    if (this.filePreviewUrl) {
      window.open(this.filePreviewUrl, '_blank');
    } else {
      console.error('No file available for preview.');
    }
  }

  onDeleteTemplate(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.isLoader = true;
        this.pastProjectservice.DeleteProposalTemplate(id).subscribe(
          async (response: any) => {
            this.isLoader = false;

            Swal.fire({
              icon: 'success',
              title: "Success",
              html: 'Template Data Deleted Successfully',
              timer: 2000,
              timerProgressBar: true,
              showConfirmButton: false,
            });
            this.closeModal();
            this.onPageChange(this.currentPage);
          },
          (error: any) => {
            this.isLoader = false;
            // console.log(error.error.message);
            const errorMessage = error.error.message
            Swal.fire({
              icon: 'error',
              title: "Error",
              html: errorMessage,
              timer: 3000,
              timerProgressBar: true,
              showConfirmButton: false,
            });
          }
        );
      }
    });

  }

}