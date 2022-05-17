 import { useContext } from 'react';
import ExpensesOutput from '../components/ExpenseOutput/ExpensesOutput';
import { ExpenseContext } from '../store/expense-context';


const AllExpenses = () => {
  const expenseCtx=  useContext(ExpenseContext)
    return <ExpensesOutput expenses={expenseCtx.expenses} expensesPeriod="Total" fallbackText="No registered expenses found"/>
  
}

export default AllExpenses