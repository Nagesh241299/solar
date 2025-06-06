import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalTemplateComponent } from './proposal-template.component';

describe('ProposalTemplateComponent', () => {
  let component: ProposalTemplateComponent;
  let fixture: ComponentFixture<ProposalTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProposalTemplateComponent]
    });
    fixture = TestBed.createComponent(ProposalTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
