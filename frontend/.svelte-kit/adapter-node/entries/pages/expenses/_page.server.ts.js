import { E as ExpensesInMemoryRepository, I as ImagesInMemoryRepository } from "../../../chunks/expenses2.js";
const imageRepository = new ImagesInMemoryRepository();
const expenseRepository = new ExpensesInMemoryRepository(imageRepository);
const load = async () => {
  return { expenses: expenseRepository.findAll() };
};
export {
  load
};
