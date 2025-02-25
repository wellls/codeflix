import { beforeEach, describe, expect, test, vi } from "vitest";
import { InvalidUuidError, Uuid } from "../uuid.vo";

describe("UUID Value Object unit tests", () => {

  const validateSpy = vi.spyOn(Uuid.prototype as any, 'validate');

  beforeEach(() => {
    validateSpy.mockClear();
  });

  test('should throw an error if the id is not a valid UUID', () => {
    const invalidUuid = 'invalid-uuid';
    expect(() => new Uuid(invalidUuid)).toThrowError(InvalidUuidError);
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  test('should not throw an error if the id is a valid UUID', () => {
    const validUuid = '550e8400-e29b-41d4-a716-446655440000';
    const uuid = new Uuid(validUuid);
    expect(uuid.id).toEqual(validUuid);
    expect(() => uuid).not.toThrowError();
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  test('should create a new UUID if no id is provided', () => {
    const uuid = new Uuid();
    expect(uuid.id).toBeDefined();
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });
});