import {TestBed} from '@angular/core/testing';

import {UserService} from './user.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {User} from '../model/user';
import {HttpRequest} from '@angular/common/http';

describe('UserService', () => {
    const expectedUser01 = new User(1, 'login', 'mail', 'password');
    const expectedUser02 = new User(2, 'login2', 'mail2', 'password2');
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

    it('should call GET method return all users', () => {
        let actualDataAll = {};

        service.getAll().subscribe(data => actualDataAll = data);

        backend.expectOne((req: HttpRequest<any>) => {
            return req.url === 'http://localhost:8080/api/users' && req.method === 'GET';
        }, `GET all Users from ${'api/users'}`)
            .flush(expectedUsers);
        expect(actualDataAll).toEqual(expectedUsers);
    });

    it('should call GET method return one user by id', () => {
        let actualData = {};

        service.getById(1).subscribe(data => actualData = data);

        backend.expectOne((req: HttpRequest<any>) => {
            return req.url === 'http://localhost:8080/api/users/1' && req.method === 'GET';
        }, `GET one user from ${'api/users/1'}`)
            .flush(expectedUser01);
        expect(actualData).toEqual(expectedUser01);
    });

    it('should call PUT method (update a user) and return the result', () => {
        let actualData = {};
        expectedUser01.login = 'test';

        service.update(expectedUser01).subscribe(data => actualData = data);

        backend.expectOne((req: HttpRequest<any>) => {
            return req.url === 'http://localhost:8080/api/users' && req.method === 'PUT';
        }, `PUT update active field from ${'api/users'}`)
            .flush(expectedUser01);
        expect(actualData).toEqual(expectedUser01);
    });

    it('should call PUT method (ban a user) and return the result', () => {
        let actualData = {};
        expectedUser01.login = 'test';

        service.ban(expectedUser01).subscribe(data => actualData = data);

        backend.expectOne((req: HttpRequest<any>) => {
            return req.url === 'http://localhost:8080/api/users/ban' && req.method === 'PUT';
        }, `PUT update active field from ${'api/users/ban'}`)
            .flush(expectedUser01);
        expect(actualData).toEqual(expectedUser01);
    });

    it('should call POST method (create user) and return the result', () => {
        let actualData = {};
        expectedUser01.id = undefined;

        service.create(expectedUser01).subscribe(data => actualData = data);

        backend.expectOne((req: HttpRequest<any>) => {
            return req.url === 'http://localhost:8080/api/users' && req.method === 'POST';
        }, `POST create user from ${'api/users'}`)
            .flush(expectedUser01);
        expect(actualData).toEqual(expectedUser01);
    });
});
