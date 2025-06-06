import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SiteBuilderService } from 'src/app/shared/services/site-builder.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-site-builder-two',
  templateUrl: './site-builder-two.component.html',
  styleUrls: ['./site-builder-two.component.scss']
})
export class SiteBuilderTwoComponent implements OnInit{

  

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
  slides: any[] = [];
  autoSlideInterval: any;
  templateType: number = 2;
  autoScrollInterval: any;
  currentSlide = 0;
  activeIndex = 0;
  visibleTeamMembers: any[] = [];
  intervalId: any;
  testautoScrollInterval: any;
  teamSlides: any[] = [];
  itemsPerSlide: number = 4;
  isMenuOpen = false;
  isExpanded: boolean = false;
  
  

  constructor(private sitebuilderService: SiteBuilderService, private route: ActivatedRoute, private router: Router) {
   
  }

  ngOnInit(): void {
    this.companyId = this.route.snapshot.paramMap.get('companyId') || '';
  
    if (this.companyId) {
      this.companyId = this.companyId.toLowerCase();
      this.fetchCompanyInfo(); // ✅ `splitIntoSlides()` will now be called inside this function
      this.qrData = window.location.href;
    } else {
      this.errorMessage = 'Company ID is missing in the URL.';
    }
  
   
    this.visibleTeamMembers = this.teamMembers.slice(0, 4);

    this.updateItemsPerSlide(); // Initial setup
        window.addEventListener('resize', this.handleResize.bind(this));
    
  }
  
  fetchCompanyInfo(): void {
    this.sitebuilderService.sitedatabyId(this.companyId).subscribe({
      next: (data) => {
        this.companyInfo = data;

         this.primaryColor = this.companyInfo.primary_color ?? '#252B42';
         this.secondaryColor = this.companyInfo.secondary_color ?? '#333';

         document.documentElement.style.setProperty('--primary-color', this.primaryColor);
         document.documentElement.style.setProperty('--secondary-color', this.secondaryColor);

         

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
          images: project.photos?.length 
            ? project.photos.map((photo: { photo: string }) => `${environment.apiUrl}${photo.photo}`)
            : ['assets/images/image 54.png'], // Default image
          currentImageIndex: 0 // Track the current image
        }));
        
      
        this.splitIntoSlides();
        this.updateItemsPerSlide();
        this.splitIntoteamSlides();
        this.updateVisibleProjects();
         this.startImageRotation();
        
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
    setInterval(() => {
      this.pastProjects.forEach(project => {
        if (project.images.length > 1) {
          let nextIndex = (project.currentImageIndex + 1) % project.images.length;
  
          // Preload the next image before switching
          let img = new Image();
          img.src = project.images[nextIndex];
          img.loading = "lazy"; // Ensure lazy loading
  
          img.onload = () => {
            project.currentImageIndex = nextIndex; // Switch only after image loads
            project.imageLoaded = false; // Reset fade effect
            setTimeout(() => (project.imageLoaded = true), 50); // Allow transition
          };
        }
      });
  
      this.splitIntoSlides();
    }, 20000); 
  }
  
  

  viewAllProjects() {
    this.displayedProjects = this.pastProjects; 
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

  /** AUTO-SCROLL FUNCTIONALITY **/
  

  /** TESTIMONIALS SCROLL **/
  

  nextTestimonial() {
    this.activeTestimonialIndex = (this.activeTestimonialIndex + 1) % this.testimonials.length;
  }

  prevTestimonial() {
    this.activeTestimonialIndex =
      (this.activeTestimonialIndex - 1 + this.testimonials.length) % this.testimonials.length;
  }
  

  /** TEAM MEMBERS SCROLL **/
  nextTeamSlide() {
    if (this.getTotalTeamPages() > 0) {
      this.activeTeamIndex = (this.activeTeamIndex + 1) % this.getTotalTeamPages();
    }
  }

  prevTeamSlide() {
    if (this.getTotalTeamPages() > 0) {
      this.activeTeamIndex = (this.activeTeamIndex - 1 + this.getTotalTeamPages()) % this.getTotalTeamPages();
    }
  }


  getTotalTeamPages(): number {
    return Math.ceil(this.teamMembers.length / this.itemsPerPage);
  }

  getVisibleTeamMembers() {
    const start = this.activeTeamIndex * this.itemsPerPage;
    return this.teamMembers.slice(start, start + this.itemsPerPage);
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


  

  visibleProjects: any[] = [];
  currentIndex = 0;
  interval: any;

  updateVisibleProjects() {
    this.visibleProjects = this.pastProjects.slice(this.currentIndex, this.currentIndex + 3);

    if (this.pastProjects.length <= 1) {
      clearInterval(this.autoScrollInterval);
      this.visibleProjects = [...this.pastProjects]; // Show single project
    }
  }

 nextSlide() {
    if (this.pastProjects.length > 1) { 
      if (this.currentIndex + 3 < this.pastProjects.length) {
        this.currentIndex += 3;
      } else {
        this.currentIndex = 0; 
      }
      this.updateVisibleProjects();
    }
  }

  prevSlide() {
    if (this.pastProjects.length > 1) { 
      if (this.currentIndex - 3 >= 0) {
        this.currentIndex -= 3;
      } else {
        this.currentIndex = Math.max(this.pastProjects.length - 3, 0);
      }
      this.updateVisibleProjects();
    }
  }

  

  

  

  getCarouselAlignmentClass(): string {
    return this.visibleTeamMembers.length <= 3 ? 'centered-carousel' : 'left-carousel';
  }

  splitIntoSlides(): void {
    this.slides = []; // Clear previous slides
    let slide: any[] = [];

    this.pastProjects.forEach((project, index) => {
        slide.push({
            ...project,
            image: project.images[project.currentImageIndex] // Use the rotating image
        });

        // Use `itemsPerSlide` instead of hardcoded 4
        if ((index + 1) % this.itemsPerSlide === 0 || index === this.pastProjects.length - 1) {
            this.slides.push(slide);
            slide = [];
        }
    });
}

  
  
  updateItemsPerSlide(): void {
    const width = window.innerWidth;

    if (width >= 1200) {
        this.itemsPerSlide = 4; // Large screens
    } else if (width >= 992) {
        this.itemsPerSlide = 3; // Medium screens
    } else if (width >= 768) {
        this.itemsPerSlide = 2; // Small screens
    } else {
        this.itemsPerSlide = 1; // Mobile
    }

    this.splitIntoSlides()
    this.splitIntoteamSlides(); // Recalculate slides
}

splitIntoteamSlides(): void {
    this.teamSlides = []; // Clear previous slides

    for (let i = 0; i < this.teamMembers.length; i += this.itemsPerSlide) {
        this.teamSlides.push(this.teamMembers.slice(i, i + this.itemsPerSlide));
    }
}

@HostListener('window:resize', [])
handleResize(): void {
    this.updateItemsPerSlide();
    
}


  hasSocialIcons(member: any): boolean {
    return (
        member.linkedin !== '#' || 
        member.instagram !== '#' || 
        member.pinterest !== '#' || 
        member.facebook !== '#' || 
        member.twitter !== '#' || 
        member.youtube !== '#'
    );
}

toggleMenu() {
  this.isMenuOpen = !this.isMenuOpen;
}

closeMenu() {
  this.isMenuOpen = false;
}

convertToTitleCase(serviceType: string): string {
  if (!serviceType) return ''; // Handle undefined/null case

  const words = serviceType.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1));

  if (words.length > 1) {
    return words.slice(0, -1).join(' ') + '<br>' + words[words.length - 1];
  }

  return words.join(' '); // If only one word, return as is
}

getShortDescription(description: string | undefined): string {
  if (!description) return ''; // Avoid undefined errors
  return this.isExpanded ? description : description.substring(0, 500) + '...';
}


toggleReadMore() {
  this.isExpanded = !this.isExpanded;
}



  
}