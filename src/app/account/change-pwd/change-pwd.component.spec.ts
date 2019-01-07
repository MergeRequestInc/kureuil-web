import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePwdComponent } from './change-pwd.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MessageService} from 'primeng/api';

describe('ChangePwdComponent', () => {
  let component: ChangePwdComponent;
  let fixture: ComponentFixture<ChangePwdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePwdComponent ],
      imports: [FormsModule, RouterTestingModule, HttpClientTestingModule],
      providers: [MessageService],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
