import {BuilderDtoJsonAbstract} from './builderDtoJsonAbstract';

export class Tag extends BuilderDtoJsonAbstract {
  constructor(
    public id?: number,
    public name?: string
  ) {
    super();
  }
}
