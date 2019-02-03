import {Component, OnInit} from '@angular/core';
import {LinkService} from '../services-api/link.service';
import {Link} from '../model/link';
import {isNullOrUndefined} from 'util';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {Tag} from '../model/tag';

@Component({
  selector: 'app-add-link',
  templateUrl: './add-link.component.html',
  styleUrls: ['./add-link.component.css']
})
export class AddLinkComponent implements OnInit {

  private sub: any;
  linkId: number;
  link: Link;
  linkCopy: Link = new Link();
  title: string;
  loading = false;

  constructor (
    private router: Router,
    private messageService: MessageService,
    private linkService: LinkService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.linkId = +params['linkId'];
    });
    console.log(this.linkId);
    this.defineTitle();
    if (!isNullOrUndefined(this.linkId)) {
      this.linkService.getById(this.linkId).subscribe(link => {
        this.link = link;
      });
    } else {
      this.linkCopy = Object.assign(this.linkCopy, this.link);
    }
  }

  save(form: any) {
    this.loading = true;
    this.associateTags(form);
    this.link = this.linkCopy;
    if (isNullOrUndefined(this.link.id)) {
      console.log('Creating link');
      this.link.id = 0;
      this.linkService.create(this.link).subscribe( () => {
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Link added'});
        this.loading = false;
        this.router.navigate( ['/']);
      },
        () => {
          this.messageService.add({severity: 'error', summary: 'Error',
            detail: 'An error occured, please contact an administrator'});
          this.loading = false;
      });
    } else {
      console.log('Update link.');
      this.linkService.update(this.link).subscribe( () => {
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Link added'});
          this.loading = false;
          this.router.navigate( ['/']);
        },
        () => {
          this.messageService.add({severity: 'error', summary: 'Error',
            detail: 'An error occured, please contact an administrator'});
          this.loading = false;
        });
    }
  }

  defineTitle() {
    if (isNullOrUndefined(this.link) || isNullOrUndefined(this.link.id)) {
      this.title = 'New link';
    } else {
      this.title = 'Link update';
    }
  }

  private associateTags(form: any) {
    this.linkCopy.tags = [];
    if (form.target.tag1.value !== '') {
      this.linkCopy.tags.push(new Tag(0, form.target.tag1.value));
    }
    if (form.target.tag2.value !== '') {
      this.linkCopy.tags.push(new Tag(0, form.target.tag2.value));
    }
    if (form.target.tag3.value !== '') {
      this.linkCopy.tags.push(new Tag(0, form.target.tag3.value));
    }
    if (form.target.tag4.value !== '') {
      this.linkCopy.tags.push(new Tag(0, form.target.tag4.value));
    }
    if (form.target.tag5.value !== '') {
      this.linkCopy.tags.push(new Tag(0, form.target.tag5.value));
    }
  }
}
