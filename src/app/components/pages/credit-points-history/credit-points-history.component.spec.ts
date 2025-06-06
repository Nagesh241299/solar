import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditPointsHistoryComponent } from './credit-points-history.component';

describe('CreditPointsHistoryComponent', () => {
  let component: CreditPointsHistoryComponent;
  let fixture: ComponentFixture<CreditPointsHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreditPointsHistoryComponent]
    });
    fixture = TestBed.createComponent(CreditPointsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
