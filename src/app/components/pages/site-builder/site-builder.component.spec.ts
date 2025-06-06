import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteBuilderComponent } from './site-builder.component';

describe('SiteBuilderComponent', () => {
  let component: SiteBuilderComponent;
  let fixture: ComponentFixture<SiteBuilderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiteBuilderComponent]
    });
    fixture = TestBed.createComponent(SiteBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
