import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgottenPwdComponent } from './forgotten-pwd.component';

describe('ForgottenPwdComponent', () => {
  let component: ForgottenPwdComponent;
  let fixture: ComponentFixture<ForgottenPwdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgottenPwdComponent ]
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
