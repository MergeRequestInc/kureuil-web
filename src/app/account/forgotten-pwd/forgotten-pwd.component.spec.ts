import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgottenPwdComponent } from './forgotten-pwd.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {MessageService} from 'primeng/api';

describe('ForgottenPwdComponent', () => {
  let component: ForgottenPwdComponent;
  let fixture: ComponentFixture<ForgottenPwdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgottenPwdComponent ],
      imports: [HttpClientTestingModule, FormsModule, RouterTestingModule],
      providers: [MessageService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgottenPwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
