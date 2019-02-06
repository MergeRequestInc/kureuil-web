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
  linkId = 0;
  link: Link;
  linkCopy = new Link();
  title: string;
  loading = false;
  atLeastOneTag: boolean;
  tag1: Tag;
  tag2: Tag;
  tag3: Tag;
  tag4: Tag;
  tag5: Tag;
  tags: Tag[];
  urlFilled: boolean;

  constructor (
    private router: Router,
    private messageService: MessageService,
    private linkService: LinkService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.atLeastOneTag = false;
    this.sub = this.route.params.subscribe(params => {
      this.linkId = +params['linkId'];
    });
    this.defineScreenTitle();
    if (!isNaN(this.linkId)) {
      this.linkService.getById(this.linkId).subscribe(link => {
        this.urlFilled = true;
        this.link = link;
        this.linkCopy = Object.assign({}, this.link);

        this.tag1 = (isNullOrUndefined(this.link.tags[0])) ? new Tag() : this.link.tags[0];
        this.tag2 = (isNullOrUndefined(this.link.tags[1])) ? new Tag() : this.link.tags[1];
        this.tag3 = (isNullOrUndefined(this.link.tags[2])) ? new Tag() : this.link.tags[2];
        this.tag4 = (isNullOrUndefined(this.link.tags[3])) ? new Tag() : this.link.tags[3];
        this.tag5 = (isNullOrUndefined(this.link.tags[4])) ? new Tag() : this.link.tags[4];
        this.tags = [this.tag1, this.tag2, this.tag3, this.tag4, this.tag5];
        this.atLeastOneTag = this.checkIfAtLeastOneTagsExist();
      });
    } else {
      this.urlFilled = false;
      this.linkCopy = Object.assign({}, this.link);
      this.tag1 = new Tag();
      this.tag2 = new Tag();
      this.tag3 = new Tag();
      this.tag4 = new Tag();
      this.tag5 = new Tag();
      this.tags = [this.tag1, this.tag2, this.tag3, this.tag4, this.tag5];
      console.log(this.atLeastOneTag);
    }
  }

  save() {
    this.loading = true;
    this.fillFieldsTags();
    this.linkCopy.tags = this.tags;
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

  /**
   * Define the screen title
   */
  defineScreenTitle() {
    if (!isNaN(this.linkId)) {
      this.title = 'Link update';
    } else {
      this.title = 'New link';
    }
  }

  /**
   * Adjust the tags list
   */
  addTag() {
    this.atLeastOneTag = this.checkIfAtLeastOneTagsExist();
  }

  /**
   * Check if at least one tag is filled in the form
   */
  private checkIfAtLeastOneTagsExist() {
    const filledTags = this.tags.filter(value => value.name !== '' && !isNullOrUndefined(value.name));
    return filledTags.length > 0;
  }

  /**
   * Put id's tags to 0 if there is a name defined and the tag does not exist
   * and remove the tags not filled
   */
  private fillFieldsTags() {
    this.tags.forEach(value => {
      if (isNullOrUndefined(value.id) && !isNullOrUndefined(value.name)) {
        value.id = 0;
      }
    });
    this.tags = this.tags.filter(value => !isNullOrUndefined(value.name));
  }

  /**
   * Function called when the user change the URL
   */
  changeUrl() {
    this.urlFilled = !(isNullOrUndefined(this.linkCopy.url) || this.linkCopy.url === '');
  }
}
