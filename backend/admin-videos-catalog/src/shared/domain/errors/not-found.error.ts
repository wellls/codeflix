 
export class NotFoundError extends Error {
  constructor(
    id: any[] | any,
    entityClass: new (...args: any[]) => any
  ) {
    const idsMessage = Array.isArray(id) ? id.join(", ") : id;
    super(`${entityClass.name} with id(s) ${idsMessage} not found`);
    this.name = "NotFoundError";
  }
}