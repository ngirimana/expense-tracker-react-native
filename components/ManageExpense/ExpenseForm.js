import { StyleSheet, Text, View } from "react-native";
import Input from "./Input";

const ExpenseForm = () => {
  const amountChangedHandler = () => {};
  return (
      <View style={styles.form}>
          <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.inputRow}
          label="Amount"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onchangeText: amountChangedHandler,
          }}
        />
        <Input
          style={styles.inputRow}
          label="Date"
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: () => {},
          }}
        />
      </View>

      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          // autoCapitalize:'sentences',
          //   autoCorrect:false/default is true
          onChangeText: () => {},
        }}
      />
    </View>
  );
};

export default ExpenseForm;
const styles = StyleSheet.create({
    form: {
        marginTop:40
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 24,
        textAlign:'center'
    },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputRow: {
    flex: 1,
  },
});
