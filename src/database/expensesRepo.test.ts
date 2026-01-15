import { describe, beforeEach, it, expect } from "vitest";
import LifePortfolioDB, { Expense } from "./initializeDatabase";
import { afterEach } from "node:test";
import type { ExpenseEvent } from "./schema";
import {
  createExpense,
  getExpensesByDateRange,
  getExpensesByYearMonth,
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
      {
        date: "2025-02-01",
        category: "Food",
        subCategory: "A",
        amount: 10,
      },
      {
        date: "2025-02-15",
        category: "Bills",
        subCategory: "B",
        amount: 20,
      },
      {
        date: "2025-03-01",
        category: "Food",
        subCategory: "C",
        amount: 30,
      },
    ];

    await db.expenses.bulkAdd(rows as Expense[]);

    const result = await getExpensesByDateRange(db, {
      lowerBound: "2025-02-01",
      upperBound: "2025-02-28",
    });

    expect(result).toHaveLength(2);
    expect(result.map((r) => r.date).sort()).toEqual([
      "2025-02-01",
      "2025-02-15",
    ]);
  });

  it("Validate getExpensesByYearMonth returns all expenses for February 2025", async () => {
    const rows: ExpenseEvent[] = [
      {
        date: "2025-01-31",
        category: "X",
        subCategory: "X",
        amount: 1,
      },
      {
        date: "2025-02-01",
        category: "Food",
        subCategory: "A",
        amount: 10,
      },
      {
        date: "2025-02-28",
        category: "Bills",
        subCategory: "B",
        amount: 20,
      },
      {
        date: "2025-03-01",
        category: "Y",
        subCategory: "Y",
        amount: 2,
      },
    ];

    await db.expenses.bulkAdd(rows as Expense[]);

    const feb = await getExpensesByYearMonth(db, "2025", "2");

    expect(feb).toHaveLength(2);
    expect(feb.map((r) => r.date).sort()).toEqual(["2025-02-01", "2025-02-28"]);
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

  it("Validate getExpensesYearToDate", async () => {
    const rows: ExpenseEvent[] = [
      {
        date: "2025-01-31",
        category: "X",
        subCategory: "X",
        amount: 1,
      },
      {
        date: "2025-02-01",
        category: "Food",
        subCategory: "A",
        amount: 10,
      },
      {
        date: "2026-02-28",
        category: "Bills",
        subCategory: "B",
        amount: 20,
      },
      {
        date: "2026-03-01",
        category: "Y",
        subCategory: "Y",
        amount: 2,
      },
    ];

    await db.expenses.bulkAdd(rows as Expense[]);

    const expenses = await getExpensesYearToDate(db);

    expect(expenses.map((expense) => expense.date).sort()).toEqual([
      "2026-02-28",
      "2026-03-01",
    ]);
  });
});
