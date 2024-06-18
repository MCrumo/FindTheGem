import Patent from '$lib/domain/patent';
import PatentData from '$lib/mocked_data/patents_prd.json';
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

  findById(publicationNumber: string): Patent | null {
    return this.patents.find((patent) => patent.publicationNumber === publicationNumber) ?? null;
  }

  getPdf(id: string): Promise<string> {
    return this.pdfRepository.getPdfFile(id);
  }

  create(patent: Partial<Patent>): Patent {
    const newPatent = new Patent(patent);
    this.patents.push(newPatent);

    return newPatent;
  }

  update(publicationNumber: string, updatedPatent: Partial<Patent>): Patent | null {
    const patentIndex = this.patents.findIndex((patent) => patent.publicationNumber === publicationNumber);

    if (patentIndex === -1) return null;

    const existingPatent = this.patents[patentIndex];
    const updatedPatentData = {
      ...existingPatent,
      ...Object.fromEntries(Object.entries(updatedPatent).filter(([_, value]) => value))
    };
    this.patents[patentIndex] = updatedPatentData;

    return updatedPatentData;
  }

  delete(publicationNumber: string): Patent | null {
    const patentIndex = this.patents.findIndex((patent) => patent.publicationNumber === publicationNumber);

    if (patentIndex === -1) return null;

    const deletedPatent = this.patents[patentIndex];
    this.patents.splice(patentIndex, 1);

    return deletedPatent;
  }
}

export default PatentsInMemoryRepository;
