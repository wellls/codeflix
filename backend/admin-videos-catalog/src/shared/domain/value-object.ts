import { isEqual } from "../infra/utils/verify-object-is-equal";

export abstract class ValueObject {
  public equals(vo: this): boolean {
    if(vo === null || vo === undefined) {
      return false;
    }

    if(vo.constructor.name !== this.constructor.name) {
      return false;
    }

    return isEqual(vo, this);
  }
}