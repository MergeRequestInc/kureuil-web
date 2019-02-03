export  interface NoParamConstructor<T> {
  new(): T;
}

export abstract class BuilderDtoJsonAbstract {
  static fromJson<T>(json: any, ctor: NoParamConstructor<T>): T {
    return Object.assign(new ctor(), json);
  }

  static toJson<T>(obj: T): any {
    return Object.assign({}, obj);
  }

  toJson(): any {
    return BuilderDtoJsonAbstract.toJson(this);
  }

  equals(other: BuilderDtoJsonAbstract): boolean {
    return JSON.stringify(this.toJson()) === JSON.stringify(other.toJson());
  }
}
