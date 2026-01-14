import { describe, beforeEach, it, expect } from "vitest";
import LifePortfolioDB from "./initializeDatabase";
import { afterEach } from "node:test";
import type { ExpenseEvent } from "./schema";
import {
  createExpense,
  listExpensesByDateRange,
  listExpensesByYearMonth,
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

  it("Validate listExpensesByDateRange operation", async () => {
    const rows: ExpenseEvent[] = [
      {
        date: "2025-02-01",
        category: "Food",
        subCategory: "A",
        amount: 10,
      } as ExpenseEvent,
      {
        date: "2025-02-15",
        category: "Bills",
        subCategory: "B",
        amount: 20,
      } as ExpenseEvent,
      {
        date: "2025-03-01",
        category: "Food",
        subCategory: "C",
        amount: 30,
      } as ExpenseEvent,
    ];

    await db.expenses.bulkAdd(rows);

    const result = await listExpensesByDateRange(db, {
      lowerBound: "2025-02-01",
      upperBound: "2025-02-28",
    });

    expect(result).toHaveLength(2);
    expect(result.map((r) => r.date).sort()).toEqual([
      "2025-02-01",
      "2025-02-15",
    ]);
  });

  it("listExpensesByYearMonth returns all expenses for February 2025", async () => {
    const rows: ExpenseEvent[] = [
      {
        date: "2025-01-31",
        category: "X",
        subCategory: "X",
        amount: 1,
      } as ExpenseEvent,
      {
        date: "2025-02-01",
        category: "Food",
        subCategory: "A",
        amount: 10,
      } as ExpenseEvent,
      {
        date: "2025-02-28",
        category: "Bills",
        subCategory: "B",
        amount: 20,
      } as ExpenseEvent,
      {
        date: "2025-03-01",
        category: "Y",
        subCategory: "Y",
        amount: 2,
      } as ExpenseEvent,
    ];

    await db.expenses.bulkAdd(rows);

    const feb = await listExpensesByYearMonth(db, "2025", "2");

    expect(feb).toHaveLength(2);
    expect(feb.map((r) => r.date).sort()).toEqual(["2025-02-01", "2025-02-28"]);
  });
});
