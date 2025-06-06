import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditMyRoofComponent } from './add-edit-my-roof.component';

describe('AddEditMyRoofComponent', () => {
  let component: AddEditMyRoofComponent;
  let fixture: ComponentFixture<AddEditMyRoofComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditMyRoofComponent]
    });
    fixture = TestBed.createComponent(AddEditMyRoofComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
