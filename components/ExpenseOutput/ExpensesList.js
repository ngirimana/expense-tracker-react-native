import { FlatList, Text } from "react-native";
const renderExpenseItem = (itemData) => {
    return <Text>{ itemData.item.description}</Text>
}
const ExpensesList = ({expenses}) => {
    return <FlatList data={expenses} keyExtractor={(item)=> item.id} renderItem={renderExpenseItem} />;
};

export default ExpensesList;
