import { Component } from '@angular/core';
import { PastProjectsService } from 'src/app/shared/services/past-projects.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proposals',
  templateUrl: './proposals.component.html',
  styleUrls: ['./proposals.component.scss']
})
export class ProposalsComponent {
  Data: any = [];
  proposalIdToDelete: any;
  totalItems: number = 0;
  pageSizeOptions: number[] = [5, 10, 50, 100];
  pageSize: number = 10;
  currentPage: number = 1;
  // maxPage: number = 0;
  maxPage = 4; // This should match the maxSize property in the template
  paginatedData: any[] = [];
  isLoader: boolean = false;



  constructor(private pastProjectservice: PastProjectsService, private toastr: ToastrService, private router: Router, private modalService: NgbModal) { }


  ngOnInit(): void {

    // this.getProposalData();

    this.onPageChange(1);
  }

  addTemplate() {
    // console.log('add template')
    this.router.navigate(['/pages/proposals/template']);
  }

  //getProposalData list 
  // getProposalData() {
  //   this.isLoader = true;
  //   this.pastProjectservice.getProposalsData(this.currentPage, this.pageSize).subscribe(
  //     async (response: any) => {
  //        console.log(response);
  //       this.isLoader = false;
  //       const newData = response.data;
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
  this.pastProjectservice.getProposalsData(this.currentPage, this.pageSize).subscribe(
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
      this.showError('Failed to load proposals');
    }
  );
}

  // function to navigate -when click on add button
  addProposals() {

    this.router.navigate(['/pages/proposals/addProposals']);
  }

  // function to navigate -when click on edit button
  editProposal(id: any) {

    this.router.navigate(['/pages/proposals/editProposals', id]);
  }


  // download proposal by id
  downloadProposal(id: any) {
    this.isLoader = true;
    this.pastProjectservice.downloadProposalDataById(id).subscribe(
      //for download, we are taking response as a blob
      (response: Blob) => {
        this.isLoader = false;
        // Create a URL for the Blob
        const downloadUrl = window.URL.createObjectURL(response);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'Proposal.docx';  // Name of the downloaded file
        link.click();

        Swal.fire({
          icon: 'success',
          title: "Success",
          html: 'Proposal download Successfully!',
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

  openConfirmationModal(id: number, confirmationModal1: any) {
    this.modalService.open(confirmationModal1, { centered: true });
    this.proposalIdToDelete = id;
  }



  deleteProposal(id: any) {
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
        this.pastProjectservice.DeleteProposalData(id).subscribe(
          async (response: any) => {
            this.isLoader = false;
            this.modalService.dismissAll('confirm');

            Swal.fire({
              icon: 'success',
              title: "Success",
              html: 'Proposal Data Deleted Successfully!',
              timer: 2000,
              timerProgressBar: true,
              showConfirmButton: false,
            });
            this.onPageChange(this.currentPage);
          },
          (error: any) => {

            this.isLoader = false;
            if (error.status == 400) {

              Swal.fire({
                icon: 'error',
                title: "Error",
                html: 'Something went wrong!',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
              });
            }
          }
        );


      }
    });
  }

   private showSuccess(message: string): void {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: message,
        timer: 2000,
        showConfirmButton: false
      });
    }
  
    private showError(message: string): void {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message,
        timer: 2000,
        showConfirmButton: false
      });
    }
}
