import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BoqBuilderService } from 'src/app/shared/services/boqBuilder/boq-builder.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent {
  totalItems: number = 0;
  pageSizeOptions: number[] = [5, 10, 50, 100];
  pageSize: number = 5;
  currentPage: number = 1;
  paginatedData: any[] = [];
  maxPage = 4;
  boQData:any = [];
  isLoader:boolean= false;
  constructor(public boqBuilderService:BoqBuilderService,private router: Router)
  {
    this.onPageChange(1);
  }

  paginateData(): void {

    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.totalItems);
    this.paginatedData = this.boQData.slice(startIndex, endIndex);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.isLoader = true;
    this.boqBuilderService.getBoQListing(this.currentPage).subscribe(
      async (response: any) => {
        this.isLoader = false;
        this.boQData = response.results;
        this.totalItems = response.count;
        this.pageSize = response.results.length;
        // this.Data = []
        // this.Data = response.results

        this.updatePagination();
        this.paginateData();
      },
      (error: any) => {
        this.isLoader = false;
        console.error(error);
      }
    );
  }

  updatePagination(): void {
    this.maxPage = Math.ceil(this.totalItems / this.pageSize);
    if (this.maxPage > 10) {
      this.maxPage = 0; // Set to 0 to display all pages
    }
  }

  onEditBuilder(id:any)
  {
    // console.log(id)
    this.router.navigate(['/pages/boq/edit-builder',id]);
  }

  onDeleteBuilder(id:any)
  {
    Swal.fire({
      icon:"warning",
      title: "Confirmation",
      showDenyButton: true,
      showCancelButton: false,
      html:"Are you sure you want to delete this item?",
      confirmButtonText: "Yes, Delete!",
      denyButtonText: `Cancel`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.isLoader = true;
        this.boqBuilderService.deleteBoQ(id).subscribe(
          async (response: any) => {
            this.isLoader = false;
            Swal.fire({
                      title: "Success",
                      icon:"success",
                      html:"BoQ Deleted Successfully!",
                      showCancelButton: false,
                      confirmButtonText: "OK",
                    }).then((result) => {
                      /* Read more about isConfirmed, isDenied below */
                      if (result.isConfirmed) {
                        this.onPageChange(this.currentPage);
                      }
            })
          },
          (error: any) => {
            console.log(error)
            Swal.fire({
              title: "Error",
              icon:"error",
              html:error?.error?.message,
              showCancelButton: false,
              confirmButtonText: "OK",
            })
            this.isLoader = false;
            console.error(error);
          }
        );
        }
    });
  }
}
