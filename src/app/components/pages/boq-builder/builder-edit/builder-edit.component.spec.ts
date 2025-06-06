import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuilderEditComponent } from './builder-edit.component';

describe('BuilderEditComponent', () => {
  let component: BuilderEditComponent;
  let fixture: ComponentFixture<BuilderEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuilderEditComponent]
    });
    fixture = TestBed.createComponent(BuilderEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
