import { TestBed } from '@angular/core/testing';

import { PastProjectsService } from './past-projects.service';

describe('PastProjectsService', () => {
  let service: PastProjectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PastProjectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
