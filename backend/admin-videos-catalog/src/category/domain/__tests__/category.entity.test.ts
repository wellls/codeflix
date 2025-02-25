import { describe, expect, test } from 'vitest'
import { Category } from '../category.entity'

describe('Category Unit Tests', () => {
  describe('constructor', () => {
    test('should create a new category with default values', () => {
      const category = new Category({
        name: 'Test Category'
      })

      expect(category.category_id).toBeUndefined()
      expect(category.name).toBe('Test Category')
      expect(category.description).toBeNull()
      expect(category.is_active).toBe(true)
      expect(category.created_at).toBeInstanceOf(Date)
    })

    test('should create a new category with provided values', () => {
      const category = new Category({
        category_id: '1',
        name: 'Test Category',
        description: 'Test Description',
        is_active: false,
        created_at: new Date('2021-01-01')
      })

      expect(category.category_id).toBe('1')
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
      expect(category.category_id).toBeUndefined()
      expect(category.name).toBe('Test Category')
      expect(category.description).toBeNull()
      expect(category.is_active).toBe(true)
      expect(category.created_at).toBeInstanceOf(Date)
    })

    test('should create a new category with provided values', () => {
      const category = Category.create({
        name: 'Test Category',
        description: 'Test Description',
        is_active: false,
      })

      expect(category.category_id).toBeUndefined()
      expect(category.name).toBe('Test Category')
      expect(category.description).toBe('Test Description')
      expect(category.is_active).toBe(false)
      expect(category.created_at).toBeInstanceOf(Date)
    })
  })

  test("should change category's name", () => {
    const category = new Category({
      name: 'Test Category'
    })

    category.changeName('New Category Name')
    expect(category.name).toBe('New Category Name')
  })

  test('should change category description', () => {
    const category = new Category({
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
    const category = new Category({
      name: 'Test Category',
      is_active: true
    })

    category.deactivate()
    expect(category.is_active).toBe(false)
  })

  test('should return category as JSON', () => {
    const category = new Category({
      category_id: '1',
      name: 'Test Category',
      description: 'Test Description',
      is_active: false,
      created_at: new Date('2021-01-01')
    })

    expect(category.toJSON()).toEqual({
      category_id: '1',
      name: 'Test Category',
      description: 'Test Description',
      is_active: false,
      created_at: new Date('2021-01-01')
    })
  })
})

