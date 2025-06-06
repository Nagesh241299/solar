import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRoofComponent } from './my-roof.component';

describe('MyRoofComponent', () => {
  let component: MyRoofComponent;
  let fixture: ComponentFixture<MyRoofComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyRoofComponent]
    });
    fixture = TestBed.createComponent(MyRoofComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
