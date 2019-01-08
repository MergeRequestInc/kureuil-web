import { TestBed } from '@angular/core/testing';

import { AuthorizationOnlineService } from './authorization-online.service';
import {AuthenticationService} from './authentication.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('AuthorizationOnlineService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [AuthenticationService],
    imports: [HttpClientTestingModule, RouterTestingModule]
  }));

  it('should be created', () => {
    const service: AuthorizationOnlineService = TestBed.get(AuthorizationOnlineService);
    expect(service).toBeTruthy();
  });
});
