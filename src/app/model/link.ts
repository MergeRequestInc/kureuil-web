import {BuilderDtoJsonAbstract} from './builderDtoJsonAbstract';
import {Tag} from './tag';

export class Link extends BuilderDtoJsonAbstract {
  constructor(
    public id?: number,
    public url?: string,
    public tags?: Tag[]
  ) {
    super();
  }
}
