import { View,  } from "react-native";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";

const ExpensesOUtput = ({ expenses }) => {
  return (
    <View>
      <ExpensesSummary />
      <ExpensesList />
    </View>
  );
};

export default ExpensesOUtput;
