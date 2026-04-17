import { Pressable, TextInput, View } from "react-native"
import { mainPageStyles } from "../Styles/screens/Home/main"
import SendIcon from "./Icons/SendIcon"

export const SendInput = ({
  handleSend,
  setInput,
  input,
  setIsExpanded,
  loading,
}) => {
  return (
    <View style={mainPageStyles.spaceIcons}>
      <TextInput
        placeholder="Type something..."
        value={input}
        onChangeText={setInput}
        style={mainPageStyles.input}
        multiline
        onContentSizeChange={(e) => {
          const height = e.nativeEvent.contentSize.height
          setIsExpanded(height > 40)
        }}
      />
      <Pressable
        style={({ pressed }) => ({
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
          opacity: pressed ? 0.6 : 1,
        })}
        onPress={handleSend}
        disabled={loading}
      >
        <SendIcon />
      </Pressable>
    </View>
  )
}
