import { TestBed } from '@angular/core/testing';

import { SiteBuilderService } from './site-builder.service';

describe('SiteBuilderService', () => {
  let service: SiteBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SiteBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
