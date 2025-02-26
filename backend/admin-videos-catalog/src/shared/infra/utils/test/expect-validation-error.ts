import { expect } from "vitest";
import { EntityValidationError } from "../../../domain/validators/validation-error";

export function expectValidationError(
  action: () => void, 
  field: string, 
  message: string
) {
  try {
    action();
  } catch (error) {
    const validationError = error as EntityValidationError;
    expect(validationError.errors?.[field]).toContain(message);
  }
}