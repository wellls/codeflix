import { describe, expect, test } from "vitest";
import { ValueObject } from "../value-object";

class StringValueObject extends ValueObject {
  constructor(readonly value: string) {
    super();
  }
}

class ComplexValueObject extends ValueObject {
  constructor(readonly prop1: string, readonly prop2: number) {
    super();
  }
}

describe('Value Object Unit Tests', () => {
  test('should be equal', () => {
    const value1 = new StringValueObject('test');
    const value2 = new StringValueObject('test');
    expect(value1.equals(value2)).toBe(true);

    const complexValue1 = new ComplexValueObject('test', 1);
    const complexValue2 = new ComplexValueObject('test', 1);
    expect(complexValue1.equals(complexValue2)).toBe(true);
  })

  test('should not be equal', () => {
    const value1 = new StringValueObject('test');
    const value2 = new StringValueObject('test2');
    expect(value1.equals(value2)).toBe(false);
    expect(value1.equals(null as any)).toBe(false);
    expect(value2.equals(undefined as any)).toBe(false);

    const complexValue1 = new ComplexValueObject('test', 2);
    const complexValue2 = new ComplexValueObject('test', 1);
    expect(complexValue1.equals(complexValue2)).toBe(false);
    expect(complexValue1.equals(null as any)).toBe(false);
    expect(complexValue2.equals(undefined as any)).toBe(false);
  })
})