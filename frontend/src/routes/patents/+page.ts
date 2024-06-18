import type { PageLoad } from './$types';

import PatentsInMemoryRepository from '$lib/repositories/patentsInMemory';
import PDFsInMemoryRepository from '$lib/repositories/pdfs';

const pdfRepository = new PDFsInMemoryRepository();
const repository = new PatentsInMemoryRepository(pdfRepository);

export function load() {
  return { patents: repository.findAll() };
}
