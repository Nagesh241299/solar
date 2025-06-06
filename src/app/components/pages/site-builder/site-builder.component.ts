import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SiteBuilderService } from 'src/app/shared/services/site-builder.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-site-builder',
  templateUrl: './site-builder.component.html',
  styleUrls: ['./site-builder.component.scss']
})
export class SiteBuilderComponent implements OnInit, OnDestroy {

  companyId: string = '';
  companyInfo: any;
  errorMessage: string | null = null;
  primaryColor: string = '';
  secondaryColor: string = '';
  activeTestimonialIndex: number = 0;
  activeTeamIndex: number = 0;
  itemsPerPage = 4; // Number of visible team members
  teamMembers: any[] = [];
  testimonials: any[] = [];
  pastProjects: any[] = [];
  displayedProjects: any[] = [];
  qrData: string = '';
  autoSlideInterval: any;
  teamSlides: any[] = [];
  showFullText = false;
  membersPerSlide = 4;
  showAllProjects = false;
  isMenuOpen = false;
  selectedClass = '';


  constructor(private sitebuilderService: SiteBuilderService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.displayedProjects = this.pastProjects.slice(0, 3);
    this.companyId = this.route.snapshot.paramMap.get('companyId') || '';

    if (this.companyId) {
      this.companyId = this.companyId.toLowerCase();
      this.fetchCompanyInfo();
      this.qrData = window.location.href;
    } else {
      this.errorMessage = 'Company ID is missing in the URL.';
    }

    this.updateItemsPerSlide(); // Initial setup
    window.addEventListener('resize', this.handleResize.bind(this));
    
  }

  ngOnDestroy() {
    clearInterval(this.autoSlideInterval);
  }

  @HostListener('window:resize', [])
  handleResize(): void {
    this.updateItemsPerSlide();
  }

  fetchCompanyInfo(): void {
    this.sitebuilderService.sitedatabyId(this.companyId).subscribe({
      next: (data) => {
        this.companyInfo = data;

        this.primaryColor = this.companyInfo.primary_color ?? '#ff5531';
        this.secondaryColor = this.companyInfo.secondary_color ?? '#333';
        document.documentElement.style.setProperty('--primary-color', this.primaryColor);
        document.documentElement.style.setProperty('--secondary-color', this.secondaryColor);

        this.changeTheme(this.primaryColor);

        this.teamMembers = this.companyInfo.team_members.map((member: any) => ({
          name: `${member.salutation}. ${member.first_name} ${member.last_name}`,
          position: member.title || 'No Title',
          image: member.photo ? `${environment.apiUrl}${member.photo}` : 'assets/images/image 13.png',
          linkedin: member.linkedin || "#",
          instagram: member.instagram || "#",
          facebook: member.facebook || "#",
          twitter: member.twitter || "#",
          youtube: member.youtube || "#",
          pinterest: member.pinterest || "#",
        }));

        this.testimonials = this.companyInfo.testimonials.map((testimonial: any) => ({
          id: testimonial.id,
          name: testimonial.name,
          title: testimonial.title || 'No Title',
          testimonial: testimonial.testimonial,
          image: testimonial.photo
            ? `${environment.apiUrl}${testimonial.photo}`
            : 'assets/images/image 13.png'
        }));

        this.pastProjects = this.companyInfo.past_projects.map((project: any) => ({
          id: project.id,
          title: project.title || "No Title",
          description: project.description || "No Description",
          photos: project.photos?.map((photo: { photo: string }) => `${environment.apiUrl}${photo.photo}`) || [], 
          currentImageIndex: 0,
          image: project.photos?.length ? `${environment.apiUrl}${project.photos[0].photo}` : 'assets/images/image 54.png',
        }));
        
        

        this.displayedProjects = this.pastProjects.slice(0, 3);
        this.startImageRotation();
        this.updateItemsPerSlide();
        this.prepareTeamSlides();

        // this.displayedProjects = this.pastProjects.length > 0 ? [this.pastProjects[0]] : [];
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

  startImageRotation(): void {
    this.autoSlideInterval = setInterval(() => {
      this.displayedProjects.forEach(project => {
        if (project.photos.length > 1) {
          project.currentImageIndex = (project.currentImageIndex + 1) % project.photos.length;
          project.image = project.photos[project.currentImageIndex]; // Update the displayed image
        }
      });
    }, 5000); // Change image every 5 seconds
  }
  

  updateItemsPerSlide(): void {
    const width = window.innerWidth;

    if (width >= 1200) {
      this.membersPerSlide = 4; // Large screens
    } else if (width >= 992) {
      this.membersPerSlide = 3; // Medium screens
    } else if (width >= 768) {
      this.membersPerSlide = 2; // Small screens
    } else {
      this.membersPerSlide = 1; // Mobile
    }

    this.prepareTeamSlides(); // Recalculate slides
  }

  prepareTeamSlides() {
    this.teamSlides = [];

    for (let i = 0; i < this.teamMembers.length; i += this.membersPerSlide) {
      this.teamSlides.push(this.teamMembers.slice(i, i + this.membersPerSlide));
    }
  }

  setActiveTeamIndex(index: number) {
    this.activeTeamIndex = index;
  }
  viewAllProjects() {
    this.showAllProjects = true;
    this.displayedProjects = [...this.pastProjects]; // ✅ Show all projects
  }
  

  scrollToSection(sectionId: string, event: Event) {
    event.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  setActive(event: any) {
    const links = document.querySelectorAll('nav ul li a');
    links.forEach(link => link.classList.remove('active'));
    event.target.classList.add('active');
  }

  


  isSectionAvailable(section: string): boolean {
    switch (section) {
      case 'about Us':
        return !!this.companyInfo?.company_profile?.long_description;
      case 'services':
        return this.companyInfo?.epc_services && this.companyInfo.epc_services.length > 0;
      case 'projects':
        return this.pastProjects && this.pastProjects.length > 0;
      case 'team':
        return this.teamMembers && this.teamMembers.length > 0;
      case 'testimonials':
        return this.testimonials && this.testimonials.length > 0;
      case 'contact Us':
        return !!this.companyInfo?.company_profile?.address_line_1;
      default:
        return false;
    }
  }

  getAvailableSections(): string[] {
    return ['about Us', 'services', 'projects', 'team', 'testimonials', 'contact Us'].filter(section =>
      this.isSectionAvailable(section)
    );
  }


  toggleReadMore() {
    this.showFullText = !this.showFullText;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  
  closeMenu() {
    this.isMenuOpen = false;
  }

  convertToTitleCase(serviceType: string): string {
    return serviceType
      .split('_') // Split by underscores
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
      .join(' '); // Join words with spaces
  }

  changeTheme(primaryColor: string) {
    const colorClassMap: { [key: string]: string } = {
      '#FF5531': 'page-wrapper-orange', // Orange
      '#3D72FC': 'page-wrapper-blue', // Blue
      '#1DF791': 'page-wrapper-green'  // Green
    };

    this.selectedClass = colorClassMap[primaryColor];
  }
}
