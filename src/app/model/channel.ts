import {BuilderDtoJsonAbstract} from './builderDtoJsonAbstract';

export class Channel extends BuilderDtoJsonAbstract {
  constructor(
    public id?: number,
    public name?: string,
    public query?: string,
  ) {
    super();
  }
}
