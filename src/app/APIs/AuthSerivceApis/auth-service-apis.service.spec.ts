import { TestBed } from '@angular/core/testing';

import { AuthServiceApisService } from './auth-service-apis.service';

describe('AuthServiceApisService', () => {
  let service: AuthServiceApisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthServiceApisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
