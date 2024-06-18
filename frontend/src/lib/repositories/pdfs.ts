import fs from 'fs';
import path from 'path';

class PDFsInMemoryRepository {
  async getPdfFile(id: string): Promise<string> {
    // set a random delay to simulate network latency
    // between 0 and 5 seconds
    await delay(Math.random() * 5000);

    const filePath = `pdfs/${id}.pdf`;
    console.log(filePath);

    return filePath;
  }
}

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default PDFsInMemoryRepository;
