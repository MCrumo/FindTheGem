interface Repository<T> {
  create(entity: T): T;
  findAll(): T[];
  findById(id: string): T | null;
  update(id: string, entity: T): T | null;
  delete(id: string): T | null;
}
