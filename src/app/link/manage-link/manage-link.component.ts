import {Component, OnInit} from '@angular/core';
import {LinkService} from '../../services-api/link.service';
import {Link} from '../../model/link';
import {isNullOrUndefined} from 'util';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {Tag} from '../../model/tag';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-add-link',
  templateUrl: './manage-link.component.html',
  styleUrls: ['./manage-link.component.css']
})
export class ManageLinkComponent implements OnInit {

  /** Link to create or update */
  link: Link;
  /** Link copy to create or update */
  linkCopy = new Link();
  /** Link id of the link object to create or update */
  linkId = 0;
  /** Component title */
  title: string;
  /** Loading status */
  loading = false;
  /** Check if at least one tag is filled */
  atLeastOneTag: boolean;
  /** Check if the url field is filled */
  urlFilled: boolean;
  /** Tag object for the form */
  tag1: Tag;
  /** Tag object for the form */
  tag2: Tag;
  /** Tag object for the form */
  tag3: Tag;
  /** Tag object for the form */
  tag4: Tag;
  /** Tag object for the form */
  tag5: Tag;
  /** Tags list for the form */
  tags: Tag[];

  constructor (
    private router: Router,
    private messageService: MessageService,
    private linkService: LinkService,
    private route: ActivatedRoute,
    private translateService: TranslateService) { }

  ngOnInit() {
    this.atLeastOneTag = false;
    this.route.params.subscribe(params => {
      this.linkId = +params['linkId'];
    });
    this.defineScreenTitle();
    if (!isNaN(this.linkId)) { // Link update form
      this.fillFormFieldsUpdate();
    } else { // Link creation form
      this.fillFormFieldsCreation();
    }
  }

  /**
   * Save operation for links : creation or update
   */
  save() {
    this.loading = true;
    this.fillFieldsTags();
    this.linkCopy.tags = this.tags;
    this.link = this.linkCopy;
    if (isNullOrUndefined(this.link.id) || this.link.id === 0) {
      this.createLink();
    } else {
      this.updateLink();
    }
  }

  /**
   * Define the screen title
   */
  defineScreenTitle() {
    if (!isNaN(this.linkId)) {
      this.translateService.get('link.edit').subscribe((msg) => {
        this.title = msg;
      });
    } else {
      this.translateService.get('link.add').subscribe((msg) => {
        this.title = msg;
      });
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
        value.id = 0; // The back waits id = 0 at creation
      } else if (value.name === '') {
        value.id = undefined;
        value.name = undefined;
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

  /**
   * Link creation
   */
  private createLink() {
    this.link.id = 0; // Back waits id = 0 at creation
    this.linkService.create(this.link).subscribe( () => {
        this.translateService.get('messages.success.link.added').subscribe((msg) => {
          this.messageService.add({severity: 'success', summary: 'Success', detail: msg});
          this.loading = false;
          this.router.navigate( ['/']);
        });
      },
      (error) => {
        // If URL already exists
        if (error.status === 400 && error.error === 'Future.filter predicate is not satisfied') {
          this.translateService.get('messages.error.url.exists').subscribe((msg) => {
            this.messageService.add({severity: 'error', summary: 'Error',
              detail: msg});
          });
        } else { // Other errors
          this.translateService.get('messages.error.occured').subscribe((msg) => {
            this.messageService.add({severity: 'error', summary: 'Error',
              detail: msg});
          });
        }
        this.loading = false;
      });
  }

  /**
   * Link update
   */
  private updateLink() {
    console.log('Update link');
    this.linkService.update(this.link).subscribe( () => {
        this.translateService.get('messages.success.link.updated').subscribe((msg) => {
          this.messageService.add({severity: 'success', summary: 'Success', detail: msg});
          this.loading = false;
          this.router.navigate( ['/']);
        });
      },
      () => {
        this.translateService.get('messages.error.occured').subscribe((msg) => {
          this.messageService.add({severity: 'error', summary: 'Error',
            detail: msg});
        });
        this.loading = false;
      });
  }

  /**
   * Fill the fields for the update form
   */
  private fillFormFieldsUpdate() {
    this.linkService.getById(this.linkId).subscribe(link => {
      this.urlFilled = true;
      this.link = link;
      this.linkCopy = Object.assign({}, this.link);

      // Fill tags fields
      this.tag1 = (isNullOrUndefined(this.link.tags[0])) ? new Tag() : this.link.tags[0];
      this.tag2 = (isNullOrUndefined(this.link.tags[1])) ? new Tag() : this.link.tags[1];
      this.tag3 = (isNullOrUndefined(this.link.tags[2])) ? new Tag() : this.link.tags[2];
      this.tag4 = (isNullOrUndefined(this.link.tags[3])) ? new Tag() : this.link.tags[3];
      this.tag5 = (isNullOrUndefined(this.link.tags[4])) ? new Tag() : this.link.tags[4];
      this.tags = [this.tag1, this.tag2, this.tag3, this.tag4, this.tag5];
      this.atLeastOneTag = this.checkIfAtLeastOneTagsExist();
    });
  }

  /**
   * Fill the fields for the creation form
   */
  private fillFormFieldsCreation() {
    this.urlFilled = false;
    this.linkCopy = Object.assign({}, this.link);
    this.tag1 = new Tag();
    this.tag2 = new Tag();
    this.tag3 = new Tag();
    this.tag4 = new Tag();
    this.tag5 = new Tag();
    this.tags = [this.tag1, this.tag2, this.tag3, this.tag4, this.tag5];
  }
}
