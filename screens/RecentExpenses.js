import { View ,Text} from 'react-native';
import ExpensesOutput from '../components/ExpenseOutput/ExpensesOutput';

const RecentExpenses = () => {
  return <ExpensesOutput expensesPeriod="Last 7 days"/>
}

export default RecentExpenses