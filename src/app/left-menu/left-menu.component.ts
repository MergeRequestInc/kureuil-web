import { Component, OnInit } from '@angular/core';
import {NewChannelComponent} from '../modals/new-channel/new-channel.component';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Channel} from '../model/channel';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent implements OnInit {
  closeResult: string;

  constructor(private modalService: NgbModal) { }

  createChannel(){
    const modalRef = this.modalService.open(NewChannelComponent);
    modalRef.componentInstance.channel = new Channel();
    modalRef.result.then((result) => {
      //this.loadAllChannels();
    }, (reason) => {
      console.log('Dismissed : ' + reason);
    });
    console.log(modalRef);
  }

  /*private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }*/

  ngOnInit() {
  }

}
