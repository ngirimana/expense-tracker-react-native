import { useContext, useEffect,useState } from "react";
import ExpensesOutput from "../components/ExpenseOutput/ExpensesOutput";
import { ExpenseContext } from "../store/expense-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";

const RecentExpenses = () => {
  const expensesCtx = useContext(ExpenseContext);
  
  useEffect(() => {
    const getExpenses = async () => {
      const expenses = await fetchExpenses();
      expensesCtx.setExpenses(expenses)
    }
    getExpenses();
    
  }, []);
  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date > date7DaysAgo && expense.date <= today;
  });
  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 days"
      fallbackText="No expenses registered for the last 7days"
    />
  );
};

export default RecentExpenses;
