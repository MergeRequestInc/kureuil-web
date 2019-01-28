import {Component, Input, OnInit} from '@angular/core';
import {Link} from '../model/link';
import {Tag} from '../model/tag';
import {TagService} from '../services-api/tag.service';

@Component({
  selector: 'app-links-list',
  templateUrl: './links-list.component.html',
  styleUrls: ['./links-list.component.css']
})
export class LinksListComponent implements OnInit {

  @Input() link: Link;
  tags: Tag[];

  constructor(private tagService: TagService) { }

  ngOnInit() {
    // this.loadTags();
    this.tags = [
      new Tag(1, 'tags'),
      new Tag(2, 'for'),
      new Tag(3, 'testing'),
      new Tag(4, 'without'),
      new Tag(5, 'back'),
    ];
  }
  loadTags() {
    this.tagService.getByLinkId(this.link.id).subscribe( tags => this.tags = tags);
  }
}
