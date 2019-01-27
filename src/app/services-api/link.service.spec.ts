import { TestBed } from '@angular/core/testing';

import { LinkService } from './link.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('LinkService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: LinkService = TestBed.get(LinkService);
    expect(service).toBeTruthy();
  });
});
