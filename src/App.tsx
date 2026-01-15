import {
  ExpensesByCategory,
  PieChartExpensesByCategory,
} from "loureiro-sreactcomponentlibrary";
import { useExpenses } from "./useExpenses";

function App() {
  const categories = useExpenses();
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
    </>
  );
}

export default App;
