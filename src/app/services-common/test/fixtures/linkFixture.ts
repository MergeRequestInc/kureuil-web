/**
 * List of links for tests
 */
import {Link} from '../../../model/link';
import {TagFixture} from './tagFixture';

export class LinkFixture {
  static link01 = Link.fromJson({
    'id': 1,
    'url': 'url1',
    'tags': [TagFixture.tag01, TagFixture.tag02]
  }, Link);

  static link02 = Link.fromJson({
    'id': 2,
    'url': 'url2',
    'tags': [TagFixture.tag03, TagFixture.tag04]
  }, Link);
}
