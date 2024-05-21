class ImagesInMemoryRepository {
  async getTempImageUrl(id: string): Promise<string> {

    // set a random delay to simulate network latency
    // between 0 and 5 seconds
    await delay(Math.random() * 5000);

    if (Math.round(Math.random())) {
      return '/images/patent1.png';
    } else {
      return '/images/patent2.png';
    }
  }
}

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default ImagesInMemoryRepository;
