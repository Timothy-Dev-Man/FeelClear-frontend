import { Pressable, TextInput, View } from "react-native"
import { mainPageStyles } from "../Styles/screens/Home/main"
import { COLORS } from "../Styles/StyleColors"
import { Send } from "lucide-react-native"

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
        placeholder="Tell me what happened..."
        placeholderTextColor={COLORS.mutedBlueGray}
        value={input}
        onChangeText={setInput}
        style={mainPageStyles.input}
        multiline
        editable={!loading}
        accessibilityLabel="Describe what happened"
        onContentSizeChange={(e) => {
          const height = e.nativeEvent.contentSize.height
          setIsExpanded(height > 40)
        }}
      />
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Send reflection"
        style={({ pressed }) => [
          mainPageStyles.sendButton,
          { opacity: pressed || loading ? 0.65 : 1 },
        ]}
        onPress={handleSend}
        disabled={loading || !input.trim()}
        accessibilityState={{ disabled: loading || !input.trim() }}
      >
        <Send size={21} color={COLORS.white} strokeWidth={2} />
      </Pressable>
    </View>
  )
}
