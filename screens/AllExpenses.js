 import { useContext } from 'react';
import { ExpenseContext } from '../store/expense-context';


const AllExpenses = () => {
  const expenseCtx=  useContext(ExpenseContext)
    return <ExpensesOutput expenses={expenseCtx.expenses} expensesPeriod="Total"/>
  
}

export default AllExpenses