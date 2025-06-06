import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMyLeadsComponent } from './view-my-leads.component';

describe('ViewMyLeadsComponent', () => {
  let component: ViewMyLeadsComponent;
  let fixture: ComponentFixture<ViewMyLeadsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewMyLeadsComponent]
    });
    fixture = TestBed.createComponent(ViewMyLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
