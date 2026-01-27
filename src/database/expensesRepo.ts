import type { Expense } from "./initializeDatabase";
import type LifePortfolioDB from "./initializeDatabase";
import type { ExpenseEvent } from "./schema";

type DateRange = {
  lowerBound: string;
  upperBound: string;
};

export async function createExpense(
  db: LifePortfolioDB,
  expense: ExpenseEvent,
) {
  return await db.expenses.add(expense as Expense);
}

export async function readExpenseByID(db: LifePortfolioDB, id: number) {
  return await db.expenses.get(id);
}

export async function getExpensesByDateRange(
  db: LifePortfolioDB,
  dateRange: DateRange,
) {
  return db.expenses
    .where("date")
    .between(dateRange.lowerBound, dateRange.upperBound, true, true)
    .toArray();
}

export async function getExpensesByYearMonth(
  db: LifePortfolioDB,
  year: string,
  month: string,
) {
  const y = year.trim();
  const m = month.trim().padStart(2, "0"); // "2" -> "02"

  const start = `${y}-${m}-01`;

  const monthNum = Number(m);
  const nextMonthNum = monthNum === 12 ? 1 : monthNum + 1;
  const nextYearNum = monthNum === 12 ? Number(y) + 1 : Number(y);

  const end = `${String(nextYearNum)}-${String(nextMonthNum).padStart(
    2,
    "0",
  )}-01`;

  return db.expenses
    .where("date")
    .between(start, end, true, false) // [start, end)
    .toArray();
}

export async function getExpensesYearToDate(db: LifePortfolioDB) {
  const date = `${new Date(Date.now()).getFullYear()}-01-01`;
  return await db.expenses.where("date").aboveOrEqual(date).toArray();
}

export async function getExpensesThisMonth(db: LifePortfolioDB) {
  const now = new Date();
  const year = now.getFullYear();
  // getMonth() is zero-based
  const month = (now.getMonth() + 1).toString().trim().padStart(2, "0");
  const currentDay = now.getDate();
  const start = `${year}-${month}-01`;
  const end = `${year}-${month}-${currentDay}`;

  return db.expenses.where("date").between(start, end, true, true).toArray();
}
