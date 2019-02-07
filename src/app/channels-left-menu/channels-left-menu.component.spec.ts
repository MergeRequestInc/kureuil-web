import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelsLeftMenuComponent } from './channels-left-menu.component';
import {ToastModule} from 'primeng/toast';
import {VirtualScrollerModule} from 'primeng/virtualscroller';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MessageService} from 'primeng/api';

describe('ChannelsLeftMenuComponent', () => {
  let component: ChannelsLeftMenuComponent;
  let fixture: ComponentFixture<ChannelsLeftMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelsLeftMenuComponent ],
      imports: [ToastModule, VirtualScrollerModule, HttpClientTestingModule],
      providers: [MessageService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelsLeftMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
