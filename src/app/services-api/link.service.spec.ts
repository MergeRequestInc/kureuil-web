import { TestBed } from '@angular/core/testing';

import { LinkService } from './link.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {LinkFixture} from '../services-common/test/fixtures/linkFixture';
import {HttpRequest} from '@angular/common/http';
import {SERVER_API_URL} from '../services-common/constants/app.constants';

describe('LinkService', () => {

  /** data for tests */
  const expectedLink01 = LinkFixture.link01;
  const expectedLink02 = LinkFixture.link02;
  const expectedLinks = [expectedLink01, expectedLink02];

  let backend: HttpTestingController;
  let serviceMocked: LinkService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    serviceMocked = TestBed.get(LinkService);
    backend = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: LinkService = TestBed.get(LinkService);
    expect(service).toBeTruthy();
  });

  it('should call POST method (create link) and return the result', (done) => {
    let actualData = {};
    expectedLink01.id = undefined;

    serviceMocked.create(expectedLink01).subscribe(data => {
      actualData = data;
      done();
    });

    backend.expectOne((req: HttpRequest<any>) => {
      return req.url === (SERVER_API_URL + 'links') && req.method === 'POST';
    }, `POST create link from ${'api/links'}`)
      .flush(expectedLink01);
    expect(actualData).toEqual(expectedLink01);
  });

  it('should call PUT method (update a link) and return the result', (done) => {
    let actualData = {};
    expectedLink01.url = 'test';

    serviceMocked.update(expectedLink01).subscribe(data => {
      actualData = data;
      done();
    });

    backend.expectOne((req: HttpRequest<any>) => {
      return req.url === (SERVER_API_URL + 'links') && req.method === 'PUT';
    }, `PUT update url field from ${'api/links'}`)
      .flush(expectedLink01);
    expect(actualData).toEqual(expectedLink01);
  });

  it('should call GET method return one link by id', (done) => {
    let actualData = {};

    serviceMocked.getById(1).subscribe(data => {
      actualData = data;
      done();
    });

    backend.expectOne((req: HttpRequest<any>) => {
      return req.url === (SERVER_API_URL + 'links/1') && req.method === 'GET';
    }, `GET one link from ${'api/links/1'}`)
      .flush(expectedLink01);
    expect(actualData).toEqual(expectedLink01);
  });
});
