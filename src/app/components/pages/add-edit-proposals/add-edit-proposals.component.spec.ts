import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditProposalsComponent } from './add-edit-proposals.component';

describe('AddEditProposalsComponent', () => {
  let component: AddEditProposalsComponent;
  let fixture: ComponentFixture<AddEditProposalsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditProposalsComponent]
    });
    fixture = TestBed.createComponent(AddEditProposalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
