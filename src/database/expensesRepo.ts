import type { Expense } from "./initializeDatabase";
import type LifePortfolioDB from "./initializeDatabase";
import type { ExpenseEvent } from "./schema";

export type DateRange = {
  lowerBound: Date;
  upperBound: Date;
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
  const lowerBound = `${dateRange.lowerBound.getFullYear()}-${String((dateRange.lowerBound.getMonth() as number) + 1).padStart(2, "0")}-${String(dateRange.lowerBound.getDate()).padStart(2, "0")}`;
  const upperBound = `${dateRange.upperBound.getFullYear()}-${String((dateRange.upperBound.getMonth() as number) + 1).padStart(2, "0")}-${String(dateRange.upperBound.getDate()).padStart(2, "0")}`;
  return db.expenses
    .where("date")
    .between(lowerBound, upperBound, true, true)
    .toArray();
}

export async function getExpensesLastMonth(
  db: LifePortfolioDB,
  now = new Date(),
) {
  // getMonth() is zero-based, so it always returns the calendar last month corresponding to the calendar current month
  const year =
    now.getMonth() === 0 ? String(now.getFullYear() - 1) : now.getFullYear();
  const lastMonth =
    now.getMonth() === 0 ? "12" : now.getMonth().toString().padStart(2, "0");

  const start = `${year}-${lastMonth}-01`;

  const monthNum = Number(lastMonth);
  const nextMonthNum = monthNum === 12 ? 1 : monthNum + 1;
  const nextYearNum = monthNum === 12 ? Number(year) + 1 : Number(year);

  const end = `${String(nextYearNum)}-${String(nextMonthNum).padStart(
    2,
    "0",
  )}-01`;

  return db.expenses
    .where("date")
    .between(start, end, true, false) // [start, end)
    .toArray();
}

export async function getExpensesYearToDate(
  db: LifePortfolioDB,
  now = new Date(),
) {
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  const start = `${year}-01-01`;
  const end = `${year}-${month}-${day}`; // inclusive up to today

  return db.expenses.where("date").between(start, end, true, true).toArray();
}

export async function getExpensesThisMonth(
  db: LifePortfolioDB,
  now = new Date(),
) {
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().trim().padStart(2, "0");
  const currentDay = String(now.getDate()).padStart(2, "0");
  const start = `${year}-${month}-01`;
  const end = `${year}-${month}-${currentDay}`;

  return db.expenses.where("date").between(start, end, true, true).toArray();
}

export async function getExpensesLast12Months(
  db: LifePortfolioDB,
  now = new Date(),
) {
  const endMonth = (now.getMonth() + 1).toString().trim().padStart(2, "0");
  const endDay = String(now.getDate()).padStart(2, "0");
  const end = `${now.getFullYear()}-${endMonth}-${endDay}`;
  const start = `${now.getFullYear() - 1}-${endMonth}-${endDay}`;

  return db.expenses.where("date").between(start, end, true, true).toArray();
}
