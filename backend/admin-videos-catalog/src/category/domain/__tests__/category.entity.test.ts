import { beforeEach, describe, expect, test, vi } from 'vitest'
import { Category } from '../category.entity'
import { Uuid } from '../../../shared/domain/value-objects/uuid.vo'
import { expectValidationError } from '../../../shared/infra/utils/test/expect-validation-error';

describe('Category Unit Tests', () => {
  let validateSpy: any;
  beforeEach(() => {
    validateSpy = vi.spyOn(Category, 'validate')
  })

  describe('constructor', () => {
    test('should create a new category with default values', () => {
      const category = Category.create({
        name: 'Test Category'
      })

      expect(category.category_id).toBeInstanceOf(Uuid)
      expect(category.name).toBe('Test Category')
      expect(category.description).toBeNull()
      expect(category.is_active).toBe(true)
      expect(category.created_at).toBeInstanceOf(Date)
      expect(validateSpy).toHaveBeenCalledTimes(1)
    })

    test('should create a new category with provided values', () => {
      const category = new Category({
        category_id: Uuid.create('ea7673a4-39d0-47a7-bedb-3318671a6d6c'),
        name: 'Test Category',
        description: 'Test Description',
        is_active: false,
        created_at: new Date('2021-01-01')
      })

      expect(category.category_id.id).toBe('ea7673a4-39d0-47a7-bedb-3318671a6d6c')
      expect(category.name).toBe('Test Category')
      expect(category.description).toBe('Test Description')
      expect(category.is_active).toBe(false)
      expect(category.created_at).toEqual(new Date('2021-01-01'))
    })
  })

  describe('create command', () => {
    test('should create a new category with default values', () => {
      const category = Category.create({
        name: 'Test Category'
      })
      expect(category.category_id).toBeInstanceOf(Uuid)
      expect(category.name).toBe('Test Category')
      expect(category.description).toBeNull()
      expect(category.is_active).toBe(true)
      expect(category.created_at).toBeInstanceOf(Date)
      expect(validateSpy).toHaveBeenCalledTimes(1)
    })

    test('should create a new category with provided values', () => {
      const category = Category.create({
        name: 'Test Category',
        description: 'Test Description',
        is_active: false,
      })

      expect(category.category_id).toBeInstanceOf(Uuid)
      expect(category.name).toBe('Test Category')
      expect(category.description).toBe('Test Description')
      expect(category.is_active).toBe(false)
      expect(category.created_at).toBeInstanceOf(Date)
      expect(validateSpy).toHaveBeenCalledTimes(1)
    })
  })

  describe("category id validation", () => {
    const arrange = [{category_id: null}, {category_id: undefined}, {category_id: Uuid.create()}]
    test.each(arrange)('id = %j', ({ category_id }) => {
      const category = new Category({
        category_id: category_id as any,
        name: "Movie"
      })
      expect(category.category_id).toBeInstanceOf(Uuid)
      if(category_id instanceof Uuid) {
        expect(category.category_id).toBe(category_id)
      }
    })
  })

  test("should change category's name", () => {
    const category = Category.create({
      name: 'Test Category'
    })

    category.changeName('New Category Name')
    expect(category.name).toBe('New Category Name')
    expect(validateSpy).toHaveBeenCalledTimes(2)
  })

  test('should change category description', () => {
    const category = Category.create({
      name: 'Test Category'
    })

    category.changeDescription('New Description')
    expect(category.description).toBe('New Description')
  })

  test('should activate category', () => {
    const category = new Category({
      name: 'Test Category',
      is_active: false
    })

    category.activate()
    expect(category.is_active).toBe(true)
  })

  test('should deactivate category', () => {
    const category = Category.create({
      name: 'Test Category',
      is_active: true
    })

    category.deactivate()
    expect(category.is_active).toBe(false)
  })

  test('should return category as JSON', () => {
    const category = new Category({
      category_id: Uuid.create('ea7673a4-39d0-47a7-bedb-3318671a6d6c'),
      name: 'Test Category',
      description: 'Test Description',
      is_active: false,
      created_at: new Date('2021-01-01')
    })

    expect(category.toJSON()).toEqual({
      category_id: 'ea7673a4-39d0-47a7-bedb-3318671a6d6c',
      name: 'Test Category',
      description: 'Test Description',
      is_active: false,
      created_at: new Date('2021-01-01')
    })
  })
})

describe('Category Validator', () => {

  describe('create command', () => {
    test("should create a valid category", () => {
      const category = Category.create({ name: "Valid Name", description: "Valid", is_active: true });
      expect(category).toBeInstanceOf(Category);
      expect(category.name).toBe("Valid Name");
    });

    test("should throw validation error for an empty name", () => {
      expectValidationError(
        () => Category.create({ name: "", description: "Valid", is_active: true }), 
        "name", 
        "name should not be empty"
      );
    });

    test("should throw validation error for a name longer than 255 characters", () => {
      expectValidationError(
        () => Category.create({ name: "a".repeat(256), description: "Valid", is_active: true }), 
        "name", 
        "name must be shorter than or equal to 255 characters"
      );
    });

    test("should throw validation error for non-string description", () => {
      expectValidationError(
        () => Category.create({ name: "Movie", description: 123 as any, is_active: true }), 
        "description", 
        "description must be a string"
      );
    });

    test("should throw validation error for non-boolean is_active", () => {
      expectValidationError(
        () => Category.create({ name: "Valid Name", description: "Valid", is_active: "true" as any }), 
        "is_active", 
        "is_active must be a boolean value"
      );
    });

    test("should throw validation error when changing name to an invalid value", () => {
      const category = Category.create({ name: "Valid Name", description: "Valid", is_active: true });
      expectValidationError(
        () => category.changeName(""),
        "name",
        "name should not be empty"
      );
      expectValidationError(
        () => category.changeName("a".repeat(256)),
        "name",
        "name must be shorter than or equal to 255 characters"
      );
    });
     
    test("should throw validation error when changing description to an invalid value", () => {
      const category = Category.create({ name: "Valid Name", description: "Valid", is_active: true });
      expectValidationError(
        () => category.changeDescription(123 as any),
        "description",
        "description must be a string"
      );
    });
 
  
  
  })
})

