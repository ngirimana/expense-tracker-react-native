import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import IconButton from "../components/UI/IconButton";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { GlobalStyles } from "../constants/styles";
import { ExpenseContext } from "../store/expense-context";
import { deleteExpense, storeExpense, updateExpense } from "../util/http";

const ManageExpense = ({ route, navigation }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  const expensesCtx = useContext(ExpenseContext);
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const selectedExpense = expensesCtx.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  const deleteExpenseHandler = async () => {
    setIsFetching(true);
    try {
      expensesCtx.deleteExpense(editedExpenseId);
      await deleteExpense(editedExpenseId);
      navigation.goBack();
    } catch (error) {
      setError("Could not delete the expense -please try again later!");
      setIsFetching(false);
    }
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = async (expenseData) => {
    setIsFetching(true);
    try {
      if (isEditing) {
        expensesCtx.updateExpense(editedExpenseId, expenseData);

        await updateExpense(editedExpenseId, expenseData);
        setIsFetching(false);
      } else {
        const id = await storeExpense(expenseData);
        expensesCtx.addExpense({ ...expenseData, id: id });
        setIsFetching(false);
      }
      navigation.goBack();
    } catch (error) {
      setError("Could not save -please try again ");
      setIsFetching(false);
    }
  };

  if (error && !isFetching) {
    return <ErrorOverlay message={error} />;
  }
  if (isFetching) {
    return <LoadingOverlay />;
  }
  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onSubmit={confirmHandler}
        defaultValues={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
