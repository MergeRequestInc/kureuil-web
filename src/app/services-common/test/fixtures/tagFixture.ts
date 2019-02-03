/**
 * List of tags for tests
 */
import {Tag} from '../../../model/tag';

export class TagFixture {
  static tag01 = Tag.fromJson({
    'id': 1,
    'url': 'tag01 name',
  }, Tag);

  static tag02 = Tag.fromJson({
    'id': 2,
    'url': 'tag02 name',
  }, Tag);

  static tag03 = Tag.fromJson({
    'id': 3,
    'url': 'tag03 name',
  }, Tag);

  static tag04 = Tag.fromJson({
    'id': 4,
    'url': 'tag04 name',
  }, Tag);
}
