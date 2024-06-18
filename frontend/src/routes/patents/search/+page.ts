import type { PageLoad } from './$types';

import PatentsInMemoryRepository from '$lib/repositories/patentsInMemory';
import PDFsInMemoryRepository from '$lib/repositories/pdfs';

const pdfRepository = new PDFsInMemoryRepository();
const repository = new PatentsInMemoryRepository(pdfRepository);

export const load: PageLoad = async ( { url} ) => {
  let category = url.searchParams.get('category');
  if (category) {
    return { patents: repository.findAll().filter(patent => patent.title === category) };
  }
  return { patents: [] };
}
