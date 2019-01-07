import { TestBed } from '@angular/core/testing';

import { PasswordService } from './password.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('PasswordService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: PasswordService = TestBed.get(PasswordService);
    expect(service).toBeTruthy();
  });
});
