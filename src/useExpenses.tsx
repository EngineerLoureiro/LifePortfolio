import { expensesDB, getExpensesYearToDate } from "./database";
import { useLiveQuery } from "dexie-react-hooks";
import { BiCategoryAlt } from "react-icons/bi";
import { RiMoneyEuroCircleFill } from "react-icons/ri";
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

export function useExpenses() {
  const expenses = useLiveQuery(
    () => getExpensesYearToDate(expensesDB),
    [],
    []
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
