import {Component, OnInit} from '@angular/core';
import {LinkService} from '../services-api/link.service';
import {Link} from '../model/link';
import {isNullOrUndefined} from 'util';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {Tag} from '../model/tag';
import {TagService} from '../services-api/tag.service';

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
  tags: Tag[];
  urlFilled: boolean;

  filteredTags: Tag[];


  constructor (
    private router: Router,
    private messageService: MessageService,
    private linkService: LinkService,
    private tagService: TagService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.atLeastOneTag = false;
    this.filteredTags = [];
    this.sub = this.route.params.subscribe(params => {
      this.linkId = +params['linkId'];
    });

    this.defineScreenTitle();
    if (!isNaN(this.linkId)) {
      this.linkService.getById(this.linkId).subscribe(link => {
        this.urlFilled = true;
        this.link = link[0];
        this.linkCopy = Object.assign({}, this.link);
        this.tags = this.link.tags;

        this.checkIfAtLeastOneTagsExist();
        console.log(this.atLeastOneTag);
      });
    } else {
      this.urlFilled = false;
      this.linkCopy = Object.assign({}, this.link);

      this.tags = [];
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
    console.log('add Tag ' + this.atLeastOneTag);
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


  setFilter(event) {
    this.tagService.getAllTags().subscribe( tags => {
      this.filteredTags = this.filterTags(event.query, tags);
    }, () => {
      this.messageService.add({severity: 'error', summary: 'Error',
        detail: 'An error occured, can not get tags.'});
      console.log('error while loading tags');
    });
  }

  filterTags(filter, tags: Tag[]): Tag[] {
    const filtered: Tag[] = [];
    for (let i = 0; i < tags.length; i++) {
      const aTag = tags[i];
      if (aTag.name.toLowerCase().indexOf((filter.toLowerCase())) === 0) {
        filtered.push(aTag);
      }
    }
    if (filter.substr(filter.length - 1) === ' ' && filter.length > 1) {
      const newTag: Tag = new Tag();
      newTag.name = filter.substr(0, filter.length - 1);
      this.tags.push(newTag);
    }
    console.log(this.tags);
    return filtered;
  }
}
