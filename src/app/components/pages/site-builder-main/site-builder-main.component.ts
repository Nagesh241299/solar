import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SiteBuilderService } from 'src/app/shared/services/site-builder.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-site-builder-main',
  templateUrl: './site-builder-main.component.html',
  styleUrls: ['./site-builder-main.component.scss']
})
export class SiteBuilderMainComponent implements OnInit {
  
  companyId: string = ''; 
  templateId!: number; 
  companyInfo: any;
  errorMessage: string | null = null;
  showTemplate: boolean = false; // Control template visibility

  constructor(
    private sitebuilderService: SiteBuilderService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.companyId = this.route.snapshot.paramMap.get('companyId') || '';

    if (this.companyId) {
      this.companyId = this.companyId.toLowerCase();
      this.fetchCompanyInfo();
    } else {
      this.errorMessage = 'Company ID is missing in the URL.';
    }
  }

  fetchCompanyInfo(): void {
    this.sitebuilderService.sitedatabyId(this.companyId).subscribe({
      next: (data) => {
        this.companyInfo = data;
        
        // Convert string template names to numeric values
        const templateMapping: { [key: string]: number } = {
          'Dark Theme': 1,
          'Light Theme': 2
        };

        this.templateId = templateMapping[this.companyInfo.select_template] || 0;

        // Show template only if valid templateId is found
        this.showTemplate = this.templateId > 0;
      },
      error: (error) => {
        this.errorMessage = 'Failed to fetch company information.';
        console.error(error);
        if (error.status === 404) {
          Swal.fire({
            icon: 'error',
            title: 'Company Not Found!',
            text: 'The provided company ID does not exist.',
            confirmButtonText: 'OK'
          }).then(() => {
            this.router.navigate(['/']);
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Failed to fetch company information.',
            confirmButtonText: 'OK'
          });
        }
      },
    });
  }
}
