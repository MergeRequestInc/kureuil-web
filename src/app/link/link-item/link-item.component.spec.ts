import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkItemComponent } from './link-item.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Link} from '../../model/link';

describe('LinkItemComponent', () => {
  let component: LinkItemComponent;
  let fixture: ComponentFixture<LinkItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkItemComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkItemComponent);
    component = fixture.componentInstance;
    component.link = new Link(1, 'http://www.google.fr');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
