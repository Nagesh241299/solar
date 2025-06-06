import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditReminderComponent } from './add-edit-reminder.component';

describe('AddEditReminderComponent', () => {
  let component: AddEditReminderComponent;
  let fixture: ComponentFixture<AddEditReminderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditReminderComponent]
    });
    fixture = TestBed.createComponent(AddEditReminderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
