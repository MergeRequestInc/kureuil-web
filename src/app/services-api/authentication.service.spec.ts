import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {LoginComponent} from '../account/login/login.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';

describe('AuthenticationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, FormsModule, RouterTestingModule],
    declarations: [LoginComponent],
    providers: [AuthenticationService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  }));

  it('should be created', () => {
    const service: AuthenticationService = TestBed.get(AuthenticationService);
    expect(service).toBeTruthy();
  });
});
