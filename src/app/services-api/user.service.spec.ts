import {TestBed} from '@angular/core/testing';

import {UserService} from './user.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpRequest} from '@angular/common/http';
import {SERVER_API_URL} from '../services-common/constants/app.constants';
import {UserFixture} from '../services-common/test/fixtures/userFixture';

describe('UserService', () => {
    /** data for tests */
    const expectedUser01 = UserFixture.user01;
    const expectedUser02 = UserFixture.user02;
    const expectedUsers = [expectedUser01, expectedUser02];

    let backend: HttpTestingController;
    let service: UserService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [UserService],
            imports: [HttpClientTestingModule]
        });

        service = TestBed.get(UserService);
        backend = TestBed.get(HttpTestingController);

    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call GET method return all users', (done) => {
        let actualDataAll = {};

        service.getAll().subscribe(data => {
          actualDataAll = data;
          done();
        });

        backend.expectOne((req: HttpRequest<any>) => {
            return req.url === (SERVER_API_URL + 'users') && req.method === 'GET';
        }, `GET all Users from ${'api/users'}`)
            .flush(expectedUsers);
        expect(actualDataAll).toEqual(expectedUsers);
    });

    it('should call GET method return one user by id', (done) => {
        let actualData = {};

        service.getById(1).subscribe(data => {
          actualData = data;
          done();
        });

        backend.expectOne((req: HttpRequest<any>) => {
            return req.url === (SERVER_API_URL + 'users/1') && req.method === 'GET';
        }, `GET one user from ${'api/users/1'}`)
            .flush(expectedUser01);
        expect(actualData).toEqual(expectedUser01);
    });

    it('should call PUT method (update a user) and return the result', (done) => {
        let actualData = {};
        expectedUser01.email = 'test';

        service.update(expectedUser01).subscribe(data => {
          actualData = data;
          done();
        });

        backend.expectOne((req: HttpRequest<any>) => {
            return req.url === (SERVER_API_URL + 'users') && req.method === 'PUT';
        }, `PUT update active field from ${'api/users'}`)
            .flush(expectedUser01);
        expect(actualData).toEqual(expectedUser01);
    });

    it('should call POST method (create user) and return the result', (done) => {
        let actualData = {};
        expectedUser01.id = undefined;

        service.create(expectedUser01).subscribe(data => {
          actualData = data;
          done();
        });

        backend.expectOne((req: HttpRequest<any>) => {
            return req.url === (SERVER_API_URL + 'users') && req.method === 'POST';
        }, `POST create user from ${'api/users'}`)
            .flush(expectedUser01);
        expect(actualData).toEqual(expectedUser01);
    });
});
