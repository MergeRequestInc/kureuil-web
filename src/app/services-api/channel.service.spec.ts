import {TestBed} from '@angular/core/testing';

import {ChannelService} from './channel.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ChannelFixture} from '../services-common/test/fixtures/channelFixture';
import {HttpRequest} from '@angular/common/http';
import {SERVER_API_URL} from '../services-common/constants/app.constants';

describe('ChannelService', () => {
  /** data for tests */
  const expectedChannel01 = ChannelFixture.channel01;
  const expectedChannel02 = ChannelFixture.channel02;
  const expectedChannels = [expectedChannel01, expectedChannel02];

  let backend: HttpTestingController;
  let service: ChannelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    backend = TestBed.get(HttpTestingController);
    service = TestBed.get(ChannelService);
  });

  it('should be created', () => {
    const testedService: ChannelService = TestBed.get(ChannelService);
    expect(testedService).toBeTruthy();
  });

  it('should call GET method return all channels', (done) => {
    let actualDataAll = {};

    service.findAll().subscribe(data => {
      actualDataAll = data;
      done();
    });

    backend.expectOne((req: HttpRequest<any>) => {
      return req.url === (SERVER_API_URL + 'channels') && req.method === 'GET';
    }, `GET all channels from ${'api/channels'}`)
      .flush(expectedChannels);
    expect(actualDataAll).toEqual(expectedChannels);
  });

  it('should call GET method return all channels by user', (done) => {
    let actualDataAll = {};

    service.loadChannelsByUser().subscribe(data => {
      actualDataAll = data;
      done();
    });

    backend.expectOne((req: HttpRequest<any>) => {
      return req.url === (SERVER_API_URL + 'channels/user') && req.method === 'GET';
    }, `GET all channels linked to a user from ${'api/channels/user'}`)
      .flush(expectedChannels);
    expect(actualDataAll).toEqual(expectedChannels);
  });

  it('should call POST method (create channel) and return the result', (done) => {
    let actualData = {};
    expectedChannel01.id = undefined;

    service.create(expectedChannel01).subscribe(data => {
      actualData = data;
      done();
    });

    backend.expectOne((req: HttpRequest<any>) => {
      return req.url === (SERVER_API_URL + 'channels') && req.method === 'POST';
    }, `POST create channel from ${'api/channels'}`)
      .flush(expectedChannel01);
    expect(actualData).toEqual(expectedChannel01);
  });

  it('should call PUT method (update a channel) and return the result', (done) => {
    let actualData = {};
    expectedChannel01.name = 'test';

    service.update(expectedChannel01).subscribe(data => {
      actualData = data;
      done();
    });

    backend.expectOne((req: HttpRequest<any>) => {
      return req.url === (SERVER_API_URL + 'channels') && req.method === 'PUT';
    }, `PUT update field from ${'api/channels'}`)
      .flush(expectedChannel01);
    expect(actualData).toEqual(expectedChannel01);
  });
});
