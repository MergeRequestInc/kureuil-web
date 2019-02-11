import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageLinkComponent } from './manage-link.component';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {MessageService} from 'primeng/api';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ManageLinkComponent', () => {
  let component: ManageLinkComponent;
  let fixture: ComponentFixture<ManageLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageLinkComponent ],
      imports: [FormsModule, RouterTestingModule, HttpClientTestingModule],
      providers: [MessageService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
