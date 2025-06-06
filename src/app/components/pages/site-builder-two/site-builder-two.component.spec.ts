import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteBuilderTwoComponent } from './site-builder-two.component';

describe('SiteBuilderTwoComponent', () => {
  let component: SiteBuilderTwoComponent;
  let fixture: ComponentFixture<SiteBuilderTwoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiteBuilderTwoComponent]
    });
    fixture = TestBed.createComponent(SiteBuilderTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
