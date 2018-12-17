import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ElementRef, NgModule, Renderer} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {MockActiveModal} from './mock-active-modal.service';
import {MockActivatedRoute, MockRouter} from './mock-route.service';

@NgModule({
  providers: [
    DatePipe,
    {
      provide: NgbActiveModal,
      useClass: MockActiveModal
    },
    {
      provide: ActivatedRoute,
      useValue: new MockActivatedRoute({ id: 123 })
    },
    {
      provide: Router,
      useClass: MockRouter
    },
    {
      provide: ElementRef,
      useValue: null
    },
    {
      provide: NgbModal,
      useValue: null
    }
  ],
  imports: [HttpClientTestingModule]
})
export class TestHelperModule {}
