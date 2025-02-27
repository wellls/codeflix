import { describe, expect, test } from "vitest";
import { CategoryInMemoryRepository } from "./category-in-memory.repository";
import { Category } from "../../domain/category.entity";

describe("CategoryInMemoryRepository", () => {
  test("should get entity", () => {
    const categoryInMemoryRepository = new CategoryInMemoryRepository();
    const entity = categoryInMemoryRepository.getEntity();  
    expect(entity).toBe(Category);
  });
})
  