import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from 'src/app/shared/services/search.service';
import { GoogleMap } from '@angular/google-maps';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-roof',
  templateUrl: './my-roof.component.html',
  styleUrls: ['./my-roof.component.scss']
})
export class MyRoofComponent implements OnInit {
  companyIdToDelete: number = 0;
  constructor(private modalService: NgbModal, private router: Router, private mapService: SearchService, private elementRef: ElementRef, private toastr: ToastrService) { }
  roofData: any[] = [];
  map!: google.maps.Map;
  json: GeoJSONData[] | null = null;
  totalItems: number = 0;
  pageSizeOptions: number[] = [5, 10, 50, 100];
  pageSize: number = 5;
  currentPage: number = 1;
  isLoader:boolean=false;
  // maxPage: number = 0;
  maxPage = 4; // This should match the maxSize property in the template
  mapZoom = 12;
  mapCenter!: google.maps.LatLng; // Initialize in ngOnInit or provide a default value
  paginatedData: any[] = [];
  @ViewChild(GoogleMap, { static: false }) googleMap!: GoogleMap;
  hide = 'false';
  profile: any = '';
  ngOnInit(): void {
    this.profile = localStorage.getItem('user')
    this.fetchRoofData();
  }

  fetchRoofData(): void {
    this.isLoader=true;
    this.mapService.allUserData().subscribe(
      async (response: any) => {
        this.isLoader=false;
        this.roofData = response.results;
        this.totalItems = response.count;
        this.pageSize = response.results.length;
        // const bounds = new google.maps.LatLngBounds(); // Initialize bounds object

        // this.map = new google.maps.Map(this.elementRef.nativeElement.querySelector('#map')!, {
        //   center: { lat: 30.19, lng: 30.19 },
        //   zoom: this.mapZoom,
        //   mapTypeId: google.maps.MapTypeId.ROADMAP,
        //   zoomControl: true,
        //   scrollwheel: false,
        //   disableDoubleClickZoom: true,
        //   maxZoom: 20,
        //   minZoom: 4,
        // });

        // this.roofData.forEach((userData: any) => {
        //   const marker = new google.maps.Marker({
        //     position: { lat: userData.latitude, lng: userData.longitude },
        //     map: this.map,
        //     title: userData.name // Example title
        //   });
        //   const infoWindow = new google.maps.InfoWindow({
        //     content: `
        //       <div>
        //         <p>Address: ${userData.address}</p>
        //         <p>Latitude: ${userData.latitude}</p>
        //         <p>Longitude: ${userData.longitude}</p>
        //         <p>Roof Type: ${userData.roof_type}</p>
        //       </div>
        //     `
        //   });

        // Add click event listener to show InfoWindow
        //   marker.addListener('click', () => {
        //     infoWindow.open(this.map, marker);
        //   });
        //   bounds.extend(marker.getPosition() as google.maps.LatLng);
        // });

        // this.map.fitBounds(bounds);
        this.updatePagination();
        this.paginateData();
      },
      (error: any) => {
        this.isLoader=false;
        console.error(error);
      }
    );
  }
  onPageSizeChange(): void {

    this.updatePagination();
    this.paginateData();
  }

  paginateData(): void {

    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.totalItems);
    this.paginatedData = this.roofData.slice(startIndex, endIndex);
  }

  updatePagination(): void {
    this.maxPage = Math.ceil(this.totalItems / this.pageSize);
    if (this.maxPage > 10) {
      this.maxPage = 0; // Set to 0 to display all pages
    }
  }
  paginateData1(): void {
    //  this.currentPage = 1
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.totalItems);
    this.paginatedData = this.roofData.slice(startIndex, endIndex);
  }
  
  updatePagination1(): void {
    this.maxPage = Math.ceil(this.totalItems / this.pageSize);
    if (this.maxPage > 10) {
      this.maxPage = 0; // Set to 0 to display all pages
    }
  }
  onPageChange(page: number): void {
    this.currentPage = page;
    this.mapService.allUserDataPagination(this.currentPage).subscribe(
      async (response: any) => {
        const newData = response.results
        this.roofData = []
        this.roofData = response.results

        this.updatePagination();
        this.paginateData();
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  addRoofTop() {
    this.router.navigate(['/pages/leads']);
  }
  addRoof() {

    // console.log("addroof")
    this.router.navigate(['/pages/leads/add']);
  }
  editRoof(companyId: number) {
    this.router.navigate(['/pages/leads/edit', companyId]);
  }
  deleteRoof(companyId:number) {
    // this.isLoader=true;
    
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
        this.isLoader=true;
    
    this.mapService.deleteUserData(companyId).subscribe(
      async (response: any) => {
        // this.isLoader=false;
        // console.log('delete response::', response);
        this.isLoader=false;
        this.roofData = []
        //console.log(this.listData.first_name)
        Swal.fire({
          icon: 'success',
          title: "Success",
          html: 'Lead Data Deleted Successfully',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
    });
        this.router.navigate(['/pages/leads']);
        this.modalService.dismissAll('confirm');
        this.mapService.allUserData().subscribe(
          async (response: any) => {
            this.roofData = response.results;
            this.isLoader=false;
            this.totalItems = response.count;
            this.pageSize = response.results.length;
            this.currentPage = Math.ceil(this.totalItems / this.pageSize);

            const bounds = new google.maps.LatLngBounds(); // Initialize bounds object

            // this.map = new google.maps.Map(this.elementRef.nativeElement.querySelector('#map')!, {
            //   center: { lat: 30.19, lng: 30.19 },
            //   zoom: this.mapZoom,
            //   mapTypeId: google.maps.MapTypeId.ROADMAP,
            //   zoomControl: true,
            //   scrollwheel: false,
            //   disableDoubleClickZoom: true,
            //   maxZoom: 20,
            //   minZoom: 4,
            // });

            // this.roofData.forEach((userData: any) => {
            //   const marker = new google.maps.Marker({
            //     position: { lat: userData.latitude, lng: userData.longitude },
            //     map: this.map,
            //     title: userData.name // Example title
            //   });
            //   const infoWindow = new google.maps.InfoWindow({
            //     content: `
            //       <div>
            //         <p>Address: ${userData.address}</p>
            //         <p>Latitude: ${userData.latitude}</p>
            //         <p>Longitude: ${userData.longitude}</p>
            //         <p>Roof Type: ${userData.roof_type}</p>
            //       </div>
            //     `
            //   });

            //   // Add click event listener to show InfoWindow
            //   marker.addListener('click', () => {
            //     infoWindow.open(this.map, marker);
            //   });
            //   bounds.extend(marker.getPosition() as google.maps.LatLng);
            // });

            // this.map.fitBounds(bounds);
            this.updatePagination1();
            this.paginateData1();
          },
          (error: any) => {
             this.isLoader=false;
            console.error(error);
          }
        );
      },
      (error: any) => {
        this.isLoader=false;
        console.error(error);

      }
    );
  
    // this.router.navigate(['/pages/auth/edituserroof', companyId]);
  }
});
  }


  viewMapRoof(id: any) {
    localStorage.removeItem('searchTerm');

    this.router.navigate(['/pages/leads', id]);
    // localStorage.setItem('searchTerm', this.searchTerm)
  }
  viewRoofDetails(id: any) {
    localStorage.removeItem('searchTerm');
    this.router.navigate(['/pages/leads/view', id]);
    //localStorage.setItem('searchTerm', this.searchTerm)
  }
}


interface GeoJSONData {
  // Define the properties of your GeoJSON data here
}
