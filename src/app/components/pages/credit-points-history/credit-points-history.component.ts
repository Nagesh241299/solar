import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/shared/services/admin.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-credit-points-history',
  templateUrl: './credit-points-history.component.html',
  styleUrls: ['./credit-points-history.component.scss']
})
export class CreditPointsHistoryComponent {

  creditData: any;
  totalItems: number = 0;
  pageSizeOptions: number[] = [5, 10, 50, 100];
  pageSize: number = 5;
  currentPage: number = 1;
  isLoader: boolean = false;
  // maxPage: number = 0;
  paginatedData: any[] = [];
  maxPage = 4; // This should match the maxSize property in the template

  constructor(private router: Router, private adminService: AdminService) { }


  ngOnInit(): void {
    // console.log("fechcredit")
    this.fetchCreditData();

  }
  fetchCreditData() {
    // console.log("credit data")
    this.isLoader = true;
    this.adminService.AllCreditpointsData().subscribe(
      async (response: any) => {
        // console.log(response, 'listdata');
        this.creditData = response.results;
        this.isLoader = false;
        // console.log(this.creditData)

        this.totalItems = response.count;
        this.pageSize = response.results.length;
        this.updatePagination();
        this.paginateData();

      },
      (error: any) => {
        this.isLoader = false;

        console.error(error);


      }
    );

  }


  paginateData(): void {

    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.totalItems);
    this.paginatedData = this.creditData.slice(startIndex, endIndex);
  }

  updatePagination(): void {
    this.maxPage = Math.ceil(this.totalItems / this.pageSize);
    if (this.maxPage > 10) {
      this.maxPage = 0;
    }
  }


  onPageChange(page: number): void {
    this.currentPage = page;
    this.adminService.AllCreditpointsDataPagination(this.currentPage).subscribe(
      async (response: any) => {
        const newData = response.results
        this.creditData = []
        this.creditData = response.results

        this.updatePagination();
        this.paginateData();
      },
      (error: any) => {
        console.error(error);
      }
    );
  }


}



