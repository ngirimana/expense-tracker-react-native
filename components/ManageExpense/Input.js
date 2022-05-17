import { Text, TextInput, View } from "react-native"


const Input = ({textInputConfig}) => {
  return (
      <View>
          <Text>{ label}</Text>
          <TextInput {...textInputConfig} />
    </View>
  )
}

export default Input