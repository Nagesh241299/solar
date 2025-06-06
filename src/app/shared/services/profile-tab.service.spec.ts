import { TestBed } from '@angular/core/testing';

import { ProfileTabService } from './profile-tab.service';

describe('ProfileTabService', () => {
  let service: ProfileTabService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileTabService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
