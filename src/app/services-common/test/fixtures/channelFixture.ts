import {Channel} from '../../../model/channel';

/**
 * List of channels for tests
 */
export class ChannelFixture {
  static channel01 = Channel.fromJson({
    'id': 1,
    'name': 'name01',
    'query': 'query01'
  }, Channel);

  static channel02 = Channel.fromJson({
    'id': 2,
    'name': 'name02',
    'query': 'query02'
  }, Channel);
}
