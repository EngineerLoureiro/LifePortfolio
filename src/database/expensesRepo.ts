import type LifePortfolioDB from "./initializeDatabase";
import type { ExpenseEvent } from "./schema";

type DateRange = {
  lowerBound: string;
  upperBound: string;
};

export async function createExpense(
  db: LifePortfolioDB,
  expense: ExpenseEvent
) {
  await db.expenses.add(expense);
}

export async function readExpenseByID(db: LifePortfolioDB, id: number) {
  return await db.expenses.get(String(id));
}

export async function listExpensesByDateRange(
  db: LifePortfolioDB,
  dateRange: DateRange
) {
  return db.expenses
    .where("date")
    .between(dateRange.lowerBound, dateRange.upperBound, true, true)
    .toArray();
}

export async function listExpensesByYearMonth(
  db: LifePortfolioDB,
  year: string,
  month: string
) {
  const y = year.trim();
  const m = month.trim().padStart(2, "0"); // "2" -> "02"

  const start = `${y}-${m}-01`;

  const monthNum = Number(m);
  const nextMonthNum = monthNum === 12 ? 1 : monthNum + 1;
  const nextYearNum = monthNum === 12 ? Number(y) + 1 : Number(y);

  const end = `${String(nextYearNum)}-${String(nextMonthNum).padStart(
    2,
    "0"
  )}-01`;

  return db.expenses
    .where("date")
    .between(start, end, true, false) // [start, end)
    .toArray();
}
