import { TestBed } from '@angular/core/testing';

import { NewRoofDataService } from './new-roof-data.service';

describe('NewRoofDataService', () => {
  let service: NewRoofDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewRoofDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
