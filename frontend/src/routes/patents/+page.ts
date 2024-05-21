import type { PageLoad } from './$types';

import PatentsInMemoryRepository from '$lib/repositories/patentsInMemory';

const repository = new PatentsInMemoryRepository();

export function load() {
  return { patents: repository.findAll() };
}
