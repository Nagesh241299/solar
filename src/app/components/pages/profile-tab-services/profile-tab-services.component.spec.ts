import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileTabServicesComponent } from './profile-tab-services.component';

describe('ProfileTabServicesComponent', () => {
  let component: ProfileTabServicesComponent;
  let fixture: ComponentFixture<ProfileTabServicesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileTabServicesComponent]
    });
    fixture = TestBed.createComponent(ProfileTabServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
