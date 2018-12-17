import {SpyObject} from '@angular/core/testing/src/testing_internal';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Spy = jasmine.Spy;

export class MockActiveModal extends SpyObject {
    dismissSpy: Spy;

    constructor() {
        super(NgbActiveModal);
        this.dismissSpy = this.spy('dismiss').andReturn(this);
    }
}
