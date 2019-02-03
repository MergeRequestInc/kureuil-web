import {TestBed} from '@angular/core/testing';

import {TagService} from './tag.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpRequest} from '@angular/common/http';
import {SERVER_API_URL} from '../services-common/constants/app.constants';
import {TagFixture} from '../services-common/test/fixtures/tagFixture';

describe('TagService', () => {
  /** data for tests */
  const expectedTag01 = TagFixture.tag01;
  const expectedTag02 = TagFixture.tag02;
  const expectedTags = [expectedTag01, expectedTag02];

  let backend: HttpTestingController;
  let service: TagService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    service = TestBed.get(TagService);
    backend = TestBed.get(HttpTestingController);

  });

  it('should be created', () => {
    const testedService: TagService = TestBed.get(TagService);
    expect(testedService).toBeTruthy();
  });

  it('should call POST method (create tag) and return the result', (done) => {
    let actualData = {};
    expectedTag01.id = undefined;

    service.create(expectedTag01).subscribe(data => {
      actualData = data;
      done();
    });

    backend.expectOne((req: HttpRequest<any>) => {
      return req.url === (SERVER_API_URL + 'tags') && req.method === 'POST';
    }, `POST create tag from ${'api/tags'}`)
      .flush(expectedTag01);
    expect(actualData).toEqual(expectedTag01);
  });

  it('should call GET method return tags by link id', (done) => {
    let actualData = {};

    service.getByLinkId(1).subscribe(data => {
      actualData = data;
      done();
    });

    backend.expectOne((req: HttpRequest<any>) => {
      return req.url === (SERVER_API_URL + 'tags/1') && req.method === 'GET';
    }, `GET tags associated to a link from ${'api/tags/1'}`)
      .flush(expectedTags);
    expect(actualData).toEqual(expectedTags);
  });

  it('should call GET method return tags', (done) => {
    let actualData = {};

    service.getAllTags().subscribe(data => {
      actualData = data;
      done();
    });

    backend.expectOne((req: HttpRequest<any>) => {
      return req.url === (SERVER_API_URL + 'tags') && req.method === 'GET';
    }, `GET all tags from ${'api/tags'}`)
      .flush(expectedTags);
    expect(actualData).toEqual(expectedTags);
  });
});
