import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ManageChannelComponent} from './manage-channel.component';
import {FormsModule} from '@angular/forms';
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ManageChannelComponent', () => {
  let component: ManageChannelComponent;
  let fixture: ComponentFixture<ManageChannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageChannelComponent ],
      imports: [NgbModule, FormsModule, HttpClientTestingModule],
      providers: [NgbActiveModal]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
