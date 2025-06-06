import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from 'src/app/shared/services/search.service';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.scss']
})
export class CompanyInfoComponent {

  // companies = [
  //   // { id: 1, name: 'Company A', type: 'Type A', service: 'Service A' },
  //   // { id: 2, name: 'Company B', type: 'Type B', service: 'Service B' },
  //   // { id: 3, name: 'Company C', type: 'Type C', service: 'Service C' }

  // ];
  // companies: any[] = [];
  companies : any = {};
  constructor(private router: Router,private mapService: SearchService) { }

  ngOnInit(): void {
    this.mapService.EpcData().subscribe(
      async (response: any) => {
        this.companies = response
        console.log(response)
        if(this.companies.length == 0)
        {
          this.router.navigate(['/pages/Addcompany']);
        }
        else{
          console.log(typeof response[0].id)
          console.log(response[0].id)
          this.router.navigate(['/pages/Editcompany', response[0].id]);
        }
    

      },
      (error: any) => {
        console.error(error);
   
      }
    );

  }
  addCompany() {
    this.router.navigate(['/pages/Addcompany']);
  }
  editCompany(companyId: number) {
    this.router.navigate(['/pages/Editcompany', companyId]);
  }
  deleteCompany(companyId: number) {
  
  }
}
