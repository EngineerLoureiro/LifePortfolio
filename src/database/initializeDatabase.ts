import { Dexie, Entity, type EntityTable } from "dexie";

import Papa from "papaparse";
import seedCsv from "./seed.csv?raw";

export default class LifePortfolioDB extends Dexie {
  expenses!: EntityTable<Expense, "id">;

  constructor(name = "ExpensesDB") {
    super(name);
    this.version(1).stores({
      expenses: "++id,date,category",
    });
    this.expenses.mapToClass(Expense);
  }
}

export class Expense extends Entity<LifePortfolioDB> {
  id?: number;
  date!: string;
  category!: string;
  subCategory!: string;
  amount!: number;
}

export const expensesDB = new LifePortfolioDB();

async function seedIfEmpty(db: LifePortfolioDB) {
  const count = await db.expenses.count();

  if (count > 0) return;

  const csv = Papa.parse(seedCsv, { header: true, skipEmptyLines: true });

  console.log("parsed rows:", csv.data.length);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rows = csv.data.map((value: any) => ({
    date: String(value.date),
    category: String(value.category),
    subCategory: String(value.subCategory),
    amount: Number(value.amount),
  }));

  try {
    await db.expenses.bulkAdd(rows);
  } catch (e) {
    console.error("bulkAdd failed:", e);
  }
}
export async function initializeDatabase() {
  await expensesDB.open();
  await seedIfEmpty(expensesDB);
}
