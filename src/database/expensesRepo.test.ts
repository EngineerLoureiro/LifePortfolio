import { describe, beforeEach, afterEach, it, expect } from "vitest";
import LifePortfolioDB, { Expense } from "./initializeDatabase";
import type { ExpenseEvent } from "./schema";
import {
  createExpense,
  getExpensesByDateRange,
  getExpensesLast12Months,
  getExpensesLastMonth,
  getExpensesThisMonth,
  getExpensesYearToDate,
  readExpenseByID,
} from "./expensesRepo";

function generateDatabaseName() {
  return `TestDatabase_${Math.random()}`;
}

describe("ExpenseDB CRUD operations validation", () => {
  let db: LifePortfolioDB;

  beforeEach(async () => {
    db = new LifePortfolioDB(generateDatabaseName());
    await db.open();
  });

  afterEach(async () => {
    db.close();
    await db.delete();
  });

  it("Validate createExpense and readExpenseByID operation", async () => {
    const expense: ExpenseEvent = {
      amount: 90,
      category: "House",
      date: "2025-02-02",
      subCategory: "Cleaning",
    };

    const id = await createExpense(db, expense);
    const value = await readExpenseByID(db, id!);

    expect(value).toMatchObject({
      id,
      amount: 90,
      category: "House",
      date: "2025-02-02",
      subCategory: "Cleaning",
    });
  });

  it("Validate getExpensesByDateRange operation", async () => {
    const rows: ExpenseEvent[] = [
      { date: "2025-02-01", category: "Food", subCategory: "A", amount: 10 },
      { date: "2025-02-15", category: "Bills", subCategory: "B", amount: 20 },
      { date: "2025-03-01", category: "Food", subCategory: "C", amount: 30 },
    ];

    await db.expenses.bulkAdd(rows as Expense[]);

    const result = await getExpensesByDateRange(db, {
      lowerBound: new Date("2025-02-01T00:00:00.000Z"),
      upperBound: new Date("2025-02-28T00:00:00.000Z"),
    });

    expect(result).toHaveLength(2);
    expect(result.map((r) => r.date).sort()).toEqual([
      "2025-02-01",
      "2025-02-15",
    ]);
  });

  it("Validate getExpensesLastMonth returns all expenses for February 2025 (now in March 2025)", async () => {
    const rows: ExpenseEvent[] = [
      { date: "2025-01-31", category: "X", subCategory: "X", amount: 1 },
      { date: "2025-02-01", category: "Food", subCategory: "A", amount: 10 },
      { date: "2025-02-28", category: "Bills", subCategory: "B", amount: 20 },
      { date: "2025-03-01", category: "Y", subCategory: "Y", amount: 2 },
    ];

    await db.expenses.bulkAdd(rows as Expense[]);

    const now = new Date("2025-03-15T12:00:00.000Z");
    const feb = await getExpensesLastMonth(db, now);

    expect(feb).toHaveLength(2);
    expect(feb.map((r) => r.date).sort()).toEqual(["2025-02-01", "2025-02-28"]);
  });

  it("Validate getExpensesLastMonth handles January rollover (now in Jan 2025 -> last month Dec 2024)", async () => {
    const rows: ExpenseEvent[] = [
      { date: "2024-12-01", category: "A", subCategory: "A", amount: 1 },
      { date: "2024-12-31", category: "B", subCategory: "B", amount: 2 },
      { date: "2025-01-01", category: "C", subCategory: "C", amount: 3 },
    ];

    await db.expenses.bulkAdd(rows as Expense[]);

    const now = new Date("2025-01-10T12:00:00.000Z");
    const dec = await getExpensesLastMonth(db, now);

    expect(dec.map((r) => r.date).sort()).toEqual(["2024-12-01", "2024-12-31"]);
  });

  it("Validate getExpensesThisMonth returns only up to today's date (inclusive)", async () => {
    const rows: ExpenseEvent[] = [
      { date: "2025-02-01", category: "A", subCategory: "A", amount: 1 },
      { date: "2025-02-05", category: "B", subCategory: "B", amount: 2 },
      { date: "2025-02-06", category: "C", subCategory: "C", amount: 3 },
      { date: "2025-03-01", category: "D", subCategory: "D", amount: 4 },
    ];

    await db.expenses.bulkAdd(rows as Expense[]);

    // "Today" = Feb 05, 2025 => include 02-01 and 02-05, exclude 02-06
    const now = new Date("2025-02-05T12:00:00.000Z");
    const res = await getExpensesThisMonth(db, now);

    expect(res.map((r) => r.date).sort()).toEqual(["2025-02-01", "2025-02-05"]);
  });

  it("Validate getExpensesLast12Months returns expenses within inclusive [start, end]", async () => {
    const rows: ExpenseEvent[] = [
      // start boundary and just outside
      { date: "2024-02-05", category: "S", subCategory: "S", amount: 1 }, // start
      { date: "2024-02-04", category: "X", subCategory: "X", amount: 2 }, // outside
      // mid range
      { date: "2024-12-31", category: "M", subCategory: "M", amount: 3 },
      // end boundary and just outside
      { date: "2025-02-05", category: "E", subCategory: "E", amount: 4 }, // end
      { date: "2025-02-06", category: "Y", subCategory: "Y", amount: 5 }, // outside
    ];

    await db.expenses.bulkAdd(rows as Expense[]);

    const now = new Date("2025-02-05T12:00:00.000Z");
    const res = await getExpensesLast12Months(db, now);

    expect(res.map((r) => r.date).sort()).toEqual([
      "2024-02-05",
      "2024-12-31",
      "2025-02-05",
    ]);
  });

  it("Validate getExpensesYearToDate returns only expenses from Jan 1 up to now (inclusive)", async () => {
    const rows: ExpenseEvent[] = [
      { date: "2025-12-31", category: "X", subCategory: "X", amount: 1 }, // prev year
      { date: "2026-01-01", category: "A", subCategory: "A", amount: 2 }, // start boundary
      { date: "2026-02-28", category: "Bills", subCategory: "B", amount: 20 },
      { date: "2026-03-01", category: "Y", subCategory: "Y", amount: 2 },
      { date: "2026-06-02", category: "F", subCategory: "F", amount: 99 }, // future (should be excluded)
    ];

    await db.expenses.bulkAdd(rows as Expense[]);

    const now = new Date("2026-06-01T12:00:00.000Z");
    const expenses = await getExpensesYearToDate(db, now);

    expect(expenses.map((e) => e.date).sort()).toEqual([
      "2026-01-01",
      "2026-02-28",
      "2026-03-01",
    ]);
  });

  it("Validate deletes an expense", async () => {
    const id = await db.expenses.add({
      date: "2025-02-10",
      category: "Food",
      subCategory: "Groceries",
      amount: 12.5,
    });

    const entity = await db.expenses.get(id);
    expect(entity).toBeTruthy();

    await db.expenses.delete(entity!.id!);

    const after = await db.expenses.get(id);
    expect(after).toBeUndefined();
  });
});
