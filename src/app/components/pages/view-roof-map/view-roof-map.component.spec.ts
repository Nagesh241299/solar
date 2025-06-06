import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRoofMapComponent } from './view-roof-map.component';

describe('ViewRoofMapComponent', () => {
  let component: ViewRoofMapComponent;
  let fixture: ComponentFixture<ViewRoofMapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewRoofMapComponent]
    });
    fixture = TestBed.createComponent(ViewRoofMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
