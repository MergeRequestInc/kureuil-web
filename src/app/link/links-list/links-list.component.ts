import {Component, Input, OnInit} from '@angular/core';
import {Link} from '../../model/link';
import {Tag} from '../../model/tag';
import {TagService} from '../../services-api/tag.service';

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
    this.loadTags();
  }
  loadTags() {
    this.tagService.getByLinkId(this.link.id).subscribe( tags => this.tags = tags);
  }
}
