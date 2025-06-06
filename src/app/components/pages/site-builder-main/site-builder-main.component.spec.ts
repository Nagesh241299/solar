import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteBuilderMainComponent } from './site-builder-main.component';

describe('SiteBuilderMainComponent', () => {
  let component: SiteBuilderMainComponent;
  let fixture: ComponentFixture<SiteBuilderMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiteBuilderMainComponent]
    });
    fixture = TestBed.createComponent(SiteBuilderMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
