import { Entity } from "../../domain/entity";
import { NotFoundError } from "../../domain/errors/not-found.error";
import { IRepository } from "../../domain/repository/repository-interface";
import { ValueObject } from "../../domain/value-object";

export abstract class InMemoryRepository<E extends Entity, EntityId extends ValueObject> 
  implements IRepository<E, EntityId> {

  items: E[] = [];

  async insert(entity: any): Promise<void> {
    this.items.push(entity);
  }

  async bulkInsert(entities: any[]): Promise<void> {
    this.items.push(...entities);
  }
  
  async update(entity: E): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.entity_id.equals(entity.entity_id));

    if(!itemIndex) {
      throw new NotFoundError(entity.entity_id, this.getEntity());
    }
    
    this.items[itemIndex] = entity;    
  }

  delete(entity_id: EntityId): Promise<void> {
    const item = this.findById(entity_id);

    if(!item) {
      throw new NotFoundError(entity_id, this.getEntity());
    }
    
    this.items = this.items.filter((item) => !item.entity_id.equals(entity_id));
    return Promise.resolve();    
  }

  async findById(entity_id: EntityId): Promise<E | null> {
    const item = this.items.find((item) => item.entity_id.equals(entity_id));
    return typeof item === "undefined" ? null : item;
  }

  async findAll(): Promise<any[]> {
    return this.items;
  }

  abstract getEntity(): new (...args: any[]) => E;
} 