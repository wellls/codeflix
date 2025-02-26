import { FieldsErrors } from "./validator-fields-interface";

export class EntityValidationError extends Error {
  constructor(public errors: FieldsErrors | null, message = 'Validation Error') {
    super(message);
  }

  count() {
    return this.errors && Object.keys(this.errors).length;
  }
}