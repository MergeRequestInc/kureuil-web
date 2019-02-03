import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinksListComponent } from './links-list.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Link} from '../model/link';

describe('LinksListComponent', () => {
  let component: LinksListComponent;
  let fixture: ComponentFixture<LinksListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinksListComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinksListComponent);
    component = fixture.componentInstance;
    component.link = new Link(1, 'http://www.google.fr');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
