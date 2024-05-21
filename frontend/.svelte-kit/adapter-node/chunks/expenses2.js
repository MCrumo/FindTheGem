import { randomUUID } from "crypto";
import { E as ExpenseData } from "./expenses.js";
class Expense {
  id;
  invoiceReceiptDate;
  invoiceReceiptId;
  vendorName;
  vendorAddress;
  vendorTaxId;
  receiverName;
  receiverAddress;
  receiverTaxId;
  total;
  subtotal;
  tax;
  constructor(id, data) {
    this.id = id;
    this.invoiceReceiptDate = data.invoiceReceiptDate;
    this.invoiceReceiptId = data.invoiceReceiptId;
    this.vendorName = data.vendorName;
    this.vendorAddress = data.vendorAddress;
    this.vendorTaxId = data.vendorTaxId;
    this.receiverName = data.receiverName;
    this.receiverAddress = data.receiverAddress;
    this.receiverTaxId = data.receiverTaxId;
    this.total = data.total;
    this.subtotal = data.subtotal;
  }
}
class ImagesInMemoryRepository {
  async getTempImageUrl(id) {
    await delay(Math.random() * 5e3);
    if (Math.round(Math.random())) {
      return "/images/invoice.png";
    } else {
      return "/images/ticket.jpg";
    }
  }
}
async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
class ExpensesInMemoryRepository {
  expenses;
  imageRepository;
  constructor(imageRepository) {
    this.imageRepository = imageRepository;
    this.expenses = ExpenseData.result.map((expense) => {
      return {
        ...expense,
        invoiceReceiptDate: new Date(expense.invoiceReceiptDate)
      };
    });
  }
  findAll() {
    return this.expenses;
  }
  findById(id) {
    return this.expenses.find((expense) => expense.id === id) ?? null;
  }
  getImageUrl(id) {
    return this.imageRepository.getTempImageUrl(id);
  }
  create(expense) {
    const newExpense = new Expense(randomUUID(), expense);
    this.expenses.push(newExpense);
    return newExpense;
  }
  update(id, updatedExpense) {
    const expenseIndex = this.expenses.findIndex((expense) => expense.id === id);
    if (expenseIndex === -1)
      return null;
    const existingExpense = this.expenses[expenseIndex];
    const updatedExpenseData = {
      ...existingExpense,
      ...Object.fromEntries(Object.entries(updatedExpense).filter(([_, value]) => value))
    };
    this.expenses[expenseIndex] = updatedExpenseData;
    return updatedExpenseData;
  }
  delete(id) {
    const expenseIndex = this.expenses.findIndex((expense) => expense.id === id);
    if (expenseIndex === -1)
      return null;
    const deletedExpense = this.expenses[expenseIndex];
    this.expenses.splice(expenseIndex, 1);
    return deletedExpense;
  }
}
export {
  ExpensesInMemoryRepository as E,
  ImagesInMemoryRepository as I
};
