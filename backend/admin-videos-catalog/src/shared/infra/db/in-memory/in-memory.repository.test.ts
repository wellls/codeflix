import { beforeEach, describe, expect, test } from "vitest";
import { InMemoryRepository } from "./in-memory.repository";
import { Entity } from "../../../domain/entity";
import { Uuid } from "../../../domain/value-objects/uuid.vo";

type StubyEntityProps = {
  entity_id: Uuid;
  name: String;
  price: Number;
}

class StubEntity extends Entity {
  entity_id: Uuid;
  name: String;
  price: Number;

  constructor(props: StubyEntityProps) {
    super();
    this.entity_id = props.entity_id || new Uuid();
    this.name = props.name;
    this.price = props.price;
  }

  toJSON() {
    return {
      entity_id: this.entity_id.id,
      name: this.name,
      price: this.price
    }
  }
}

class StubInMemoryRepository extends InMemoryRepository<StubEntity, Uuid> {
  getEntity(): new (...args: any[]) => StubEntity {
    return StubEntity;
  }  
}

describe('InMemoryRepository', () => {
  let repo: StubInMemoryRepository;

  beforeEach(() => {
    repo = new StubInMemoryRepository();
  })

  test('should insert a new entity', async () => {
    const entity = new StubEntity({
      entity_id: new Uuid(),
      name: 'Test',
      price: 10
    });

    await repo.insert(entity);

    expect(repo.items.length).toBe(1);
    expect(repo.items[0].entity_id).toBe(entity.entity_id);
  })

  test('should bulk insert entities', async () => {
    const entities = [
      new StubEntity({
        entity_id: new Uuid(),
        name: 'Test',
        price: 10
      }),
      new StubEntity({
        entity_id: new Uuid(),
        name: 'Test 2',
        price: 20
      })
    ];

    await repo.bulkInsert(entities);

    expect(repo.items.length).toBe(2);
    expect(repo.items[0].entity_id).toBe(entities[0].entity_id);
    expect(repo.items[1].entity_id).toBe(entities[1].entity_id);
  })

  test('should return all entities', async () => {
    const entities = [
      new StubEntity({
        entity_id: new Uuid(),
        name: 'Test',
        price: 10
      }),
      new StubEntity({
        entity_id: new Uuid(),
        name: 'Test 2',
        price: 20
      })
    ];

    await repo.bulkInsert(entities);

    const allEntities = await repo.findAll();

    expect(allEntities.length).toBe(2);
    expect(allEntities[0].entity_id).toBe(entities[0].entity_id);
    expect(allEntities[1].entity_id).toBe(entities[1].entity_id);
  })

  test('should find entity by id', async () => {
    const entity = new StubEntity({
      entity_id: new Uuid(),
      name: 'Test',
      price: 10
    });

    await repo.insert(entity);

    const foundEntity = await repo.findById(entity.entity_id);

    expect(foundEntity).toBe(entity);
  })

  test('should throw error if entity not found', async () => {
    const entity = new StubEntity({
      entity_id: new Uuid(),
      name: 'Test',
      price: 10
    });
    
    await repo.insert(entity);
    const generatedUuid = new Uuid()
    await repo.findById(generatedUuid) 
      .catch((error) => {
        expect(error.message).toEqual(`StubEntity with id(s) ${generatedUuid} not found`)
      });    
  }) 

  test('should update entity', async () => {
    const entity = new StubEntity({
      entity_id: new Uuid(),
      name: 'Test',
      price: 10
    });

    await repo.insert(entity);

    const updatedEntity = new StubEntity({
      entity_id: entity.entity_id,
      name: 'Test Updated',
      price: 20
    });

    await repo.update(updatedEntity);

    expect(repo.items.length).toBe(1);
    expect(repo.items[0].name).toBe('Test Updated');
    expect(repo.items[0].price).toBe(20);
  })

  test('should throw error if entity not found on update', async () => {
    const entity = new StubEntity({
      entity_id: new Uuid(),
      name: 'Test',
      price: 10
    });

    await repo.insert(entity);
    
    const generatedUuid = new Uuid()
    const newEntity = new StubEntity({
      entity_id: generatedUuid,
      name: 'Test Updated',
      price: 20
    })

    await repo.update(newEntity)
      .catch((error) => {
        expect(error.message).toEqual(`StubEntity with id(s) ${generatedUuid} not found`)
      }
    );
  })

  test('should delete entity', async () => {
    const entity = new StubEntity({
      entity_id: new Uuid(),
      name: 'Test',
      price: 10
    });

    await repo.insert(entity);
    expect(repo.items.length).toBe(1);

    await repo.delete(entity.entity_id);
    expect(repo.items.length).toBe(0);
  })

  test('should throw error if entity not found on delete', async () => {
    const entity = new StubEntity({
      entity_id: new Uuid(),
      name: 'Test',
      price: 10
    });

    await repo.insert(entity);
    const generatedUuid = new Uuid()
    await repo.delete(generatedUuid)
      .catch((error) => {
        expect(error.message).toEqual(`StubEntity with id(s) ${generatedUuid} not found`)
      });
  })
})