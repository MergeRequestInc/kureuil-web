import {BuilderDtoJsonAbstract} from './builderDtoJsonAbstract';

export class Link extends BuilderDtoJsonAbstract {
  constructor(
    public id?: number,
    public url?: string
  ) {
    super();
  }
}
