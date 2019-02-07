import {Component, Input, OnInit} from '@angular/core';
import {Link} from '../../model/link';
import {Tag} from '../../model/tag';
import {TagService} from '../../services-api/tag.service';

@Component({
  selector: 'app-link-item',
  templateUrl: './link-item.component.html',
  styleUrls: ['./link-item.component.css']
})
export class LinkItemComponent implements OnInit {

  @Input() link: Link;
  tags: Tag[];

  constructor(private tagService: TagService) { }

  ngOnInit() {
    this.loadTags();
  }
  loadTags() {
    this.tagService.getByLinkId(this.link.id).subscribe( tags => this.tags = tags);
  }
}
