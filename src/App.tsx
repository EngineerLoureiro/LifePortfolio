import {
  ExpensesByCategory,
  PieChartExpensesByCategory,
  type PeriodSelectorState,
} from "loureiro-sreactcomponentlibrary";
import { useExpenses } from "./useExpenses";
import { PeriodSelector } from "./components/PeriodSelector";
import { useState } from "react";

function App() {
  const [periodSelectorMode, setPeriodSelectorMode] =
    useState<PeriodSelectorState>({ type: "preset", preset: "this_month" });
  const categories = useExpenses(periodSelectorMode);
  return (
    <>
      <ExpensesByCategory
        title="Expenses By Category"
        description="Check your expenses detail"
        dividerTitle="Category"
        dividerDescription="Total amount"
        categories={categories}
      />
      <PieChartExpensesByCategory categories={categories} />
      <PeriodSelector
        value={periodSelectorMode}
        onChange={setPeriodSelectorMode}
      />
    </>
  );
}

export default App;
