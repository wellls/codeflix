import { describe, it, expect } from "vitest";
import { isEqual } from "../verify-object-is-equal";

describe("isEqual", () => {
  it("should return true for identical objects", () => {
    const obj1 = { a: 1, b: { c: 2 } };
    const obj2 = { a: 1, b: { c: 2 } };
    expect(isEqual(obj1, obj2)).toBe(true);
  });

  it("should return false for different objects", () => {
    const obj1 = { a: 1, b: { c: 2 } };
    const obj2 = { a: 1, b: { c: 3 } };
    expect(isEqual(obj1, obj2)).toBe(false);
  });

  it("should return true for identical arrays", () => {
    const arr1 = [1, 2, 3];
    const arr2 = [1, 2, 3];
    expect(isEqual(arr1, arr2)).toBe(true);
  });

  it("should return false for different arrays", () => {
    const arr1 = [1, 2, 3];
    const arr2 = [1, 2, 4];
    expect(isEqual(arr1, arr2)).toBe(false);
  });

  it("should return false for different primitive types", () => {
    expect(isEqual(42, "42")).toBe(false);
    expect(isEqual(true, false)).toBe(false);
    expect(isEqual(null, undefined)).toBe(false);
  });

  it("should return true for identical primitive types", () => {
    expect(isEqual(42, 42)).toBe(true);
    expect(isEqual("test", "test")).toBe(true);
    expect(isEqual(true, true)).toBe(true);
    expect(isEqual(null, null)).toBe(true);
    expect(isEqual(undefined, undefined)).toBe(true);
  });

  it("should return false for objects with different keys", () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, c: 2 };
    expect(isEqual(obj1, obj2)).toBe(false);
  });

  it("should return true for deeply nested identical objects", () => {
    const obj1 = { a: { b: { c: { d: 4 } } } };
    const obj2 = { a: { b: { c: { d: 4 } } } };
    expect(isEqual(obj1, obj2)).toBe(true);
  });

  it("should return false for deeply nested different objects", () => {
    const obj1 = { a: { b: { c: { d: 4 } } } };
    const obj2 = { a: { b: { c: { d: 5 } } } };
    expect(isEqual(obj1, obj2)).toBe(false);
  });

  it("should return true for objects with identical circular references", () => {
    const circularA: any = { x: 1 };
    circularA.self = circularA;

    const circularB: any = { x: 1 };
    circularB.self = circularB;

    expect(isEqual(circularA, circularB)).toBe(true);
  });

  it("should return false for objects with different circular references", () => {
    const circularA: any = { x: 1 };
    circularA.self = circularA;

    const circularB: any = { x: 2 };
    circularB.self = circularB;

    expect(isEqual(circularA, circularB)).toBe(false);
  });

  it("should return false when comparing an array and an object", () => {
    expect(isEqual([1, 2, 3], { 0: 1, 1: 2, 2: 3 })).toBe(false);
  });

  it("should return false for different functions", () => {
    const fn1 = () => 42;
    const fn2 = () => 42;
    expect(isEqual(fn1, fn2)).toBe(false);
  });

  it("should return true for the same function reference", () => {
    const fn = () => 42;
    expect(isEqual(fn, fn)).toBe(true);
  });

  it("should return true for empty objects", () => {
    expect(isEqual({}, {})).toBe(true);
  });

  it("should return true for empty arrays", () => {
    expect(isEqual([], [])).toBe(true);
  });

  it("should return false for arrays of different lengths", () => {
    expect(isEqual([1, 2, 3], [1, 2])).toBe(false);
  });
});
