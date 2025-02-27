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
    const item = await this.findById(entity.entity_id as EntityId);
    const itemIndex = this.items.indexOf(item);
    
    this.items[itemIndex] = entity;    
  }

  async delete(entity_id: EntityId): Promise<void> {
    const item = await this.findById(entity_id);
    const itemIndex = this.items.indexOf(item);
    
    this.items.splice(itemIndex, 1);     
    return Promise.resolve();    
  }

  async findById(entity_id: EntityId): Promise<E> {
    const item = this.items.find((item) => item.entity_id.equals(entity_id));
    if(!item) {
      throw new NotFoundError(entity_id, this.getEntity());
    }
    return item;
  }

  async findAll(): Promise<any[]> {
    return this.items;
  }

  abstract getEntity(): new (...args: any[]) => E;
} 