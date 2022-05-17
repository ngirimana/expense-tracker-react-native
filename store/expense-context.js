import { createContext, useReducer } from "react";

export const ExpenseContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  setExpenses: (expenses) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

const expensesReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case "SET":
      return action.payload;
    case "UPDATE":
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];

      updatedExpenses[updatableExpenseIndex] = updatedItem;

      return updatedExpenses;

    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
};
const ExpenseContextProvider = ({ children }) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);
  const addExpense = (expenseData) => {
    dispatch({
      type: "ADD",
      payload: expenseData,
    });
  };
  const setExpenses = (expenses) => {
    dispatch({ type: 'SET', payload: expenses });
  }
  const deleteExpense = (id) => {
    dispatch({
      type: "DELETE",
      payload: id,
    });
  };
  const updateExpense = (id, expenseData) => {
    dispatch({
      type: "UPDATE",
      payload: { id: id, data: expenseData },
    });
  };
  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    setExpenses:setExpenses,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };
  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
};
export default ExpenseContextProvider;
