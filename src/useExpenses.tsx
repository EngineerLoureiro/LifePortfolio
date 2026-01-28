import {
  expensesDB,
  getExpensesByDateRange,
  getExpensesLast12Months,
  getExpensesLastMonth,
  getExpensesThisMonth,
  getExpensesYearToDate,
  type DateRange,
} from "./database";
import { useLiveQuery } from "dexie-react-hooks";
import { BiCategoryAlt } from "react-icons/bi";
import { RiMoneyEuroCircleFill } from "react-icons/ri";
import type LifePortfolioDB from "./database/initializeDatabase";
import type { PeriodSelectorState } from "loureiro-sreactcomponentlibrary";
export type Category = {
  title: string;
  amount: number;
  symbol: React.ReactNode;
  details: CategoryDetail[];
};
export type CategoryDetail = {
  detailTitle: string;
  amount: number;
  symbol: React.ReactNode;
};

async function getExpensesForPeriod(
  db: LifePortfolioDB,
  period: PeriodSelectorState,
) {
  if (period.type === "preset") {
    switch (period.preset) {
      case "this_month":
        return await getExpensesThisMonth(db);
      case "last_month": {
        return await getExpensesLastMonth(db);
      }
      case "last_12_months": {
        return await getExpensesLast12Months(db);
      }
      case "this_year": {
        return await getExpensesYearToDate(db);
      }
    }
  }

  if (!period.range || !period.range.from || !period.range.to)
    return await getExpensesThisMonth(db);
  const from = period.range.from;
  const to = period.range.to;
  const range: DateRange = { lowerBound: from, upperBound: to };
  return await getExpensesByDateRange(db, range);
}

function periodToKey(period: PeriodSelectorState) {
  if (period.type === "preset") return `preset:${period.preset}`;

  const from = period.range?.from;
  const to = period.range?.to;

  if (!from || !to) return "custom:incomplete";
  return `custom:${from.toISOString()}_${to.toISOString()}`;
}

export function useExpenses(period: PeriodSelectorState) {
  const key = periodToKey(period);
  const expenses = useLiveQuery(
    async () => await getExpensesForPeriod(expensesDB, period),
    [key],
    [],
  );
  const categories: Record<string, Category> = {};
  for (const expense of expenses) {
    const key = expense.category;
    if (!categories[key]) {
      categories[key] = {
        title: key,
        amount: 0,
        symbol: <BiCategoryAlt />,
        details: [],
      };
    }

    categories[key].amount += expense.amount;
    categories[key].details.push({
      detailTitle: expense.subCategory,
      amount: expense.amount,
      symbol: <RiMoneyEuroCircleFill />,
    });
    console.log(expense);
  }

  return Object.values(categories);
}
