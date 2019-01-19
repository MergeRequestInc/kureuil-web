import {BuilderDtoJsonAbstract} from './builderDtoJsonAbstract';

export class User extends BuilderDtoJsonAbstract {
  constructor(
    public id?: number,
    public name?: string,
    public email?: string,
    public password?: string,
  ) {
    super();
  }
}
