import Patent from '$lib/domain/patent';
import type { PatentValueObject } from '$lib/domain/patent';
import { v4 as uuidv4 } from 'uuid';
import PatentData from '$lib/mocked_data/patents.json';
import PDFsInMemoryRepository from '$lib/repositories/pdfs';

class PatentsInMemoryRepository implements Repository<Patent> {
  private patents: Patent[];
  private pdfRepository: PDFsInMemoryRepository;

  constructor(imageRepository: PDFsInMemoryRepository) {
    this.pdfRepository = imageRepository;
    this.patents = PatentData.samples;
  }

  findAll(): Patent[] {
    return this.patents;
  }

  findById(id: string): Patent | null {
    return this.patents.find((patent) => patent.id === id) ?? null;
  }

  getPdf(id: string): Promise<string> {
    return this.pdfRepository.getPdfFile(id);
  }

  create(patent: PatentValueObject): Patent {
    const newPatent = new Patent(uuidv4(), patent);
    this.patents.push(newPatent);

    return newPatent;
  }

  update(id: string, updatedPatent: Partial<PatentValueObject>): Patent | null {
    const patentIndex = this.patents.findIndex((patent) => patent.id === id);

    if (patentIndex === -1) return null;

    const existingPatent = this.patents[patentIndex];
    const updatedPatentData = {
      ...existingPatent,
      ...Object.fromEntries(Object.entries(updatedPatent).filter(([_, value]) => value))
    };
    this.patents[patentIndex] = updatedPatentData;

    return updatedPatentData;
  }

  delete(id: string): Patent | null {
    const patentIndex = this.patents.findIndex((patent) => patent.id === id);

    if (patentIndex === -1) return null;

    const deletedPatent = this.patents[patentIndex];
    this.patents.splice(patentIndex, 1);

    return deletedPatent;
  }
}

export default PatentsInMemoryRepository;
