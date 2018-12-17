import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsUrlComponent } from './tags-url.component';

describe('TagsUrlComponent', () => {
  let component: TagsUrlComponent;
  let fixture: ComponentFixture<TagsUrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagsUrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
