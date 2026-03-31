import { View, Text, TextInput, Pressable } from "react-native"
import { useState } from "react"
import { aiFetch } from "../../Api/ai"
import { getToken } from "../../Storage/auth"
import { mainPageStyles } from "../../Styles/screens/Home/main"
import CloudIcon from "../../Components/CloudIcon"
import SendIcon from "../../Components/SendIcon"
import Navigation from "../../Components/Navigation"
import { useRelationship } from "../../Providers/Context/relationshipContext"

const Main = () => {
  const [input, setInput] = useState("")
  const [response, setResponse] = useState([])
  const [loading, setLoading] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const { relationship } = useRelationship()

  const handleSend = async () => {
    if (!input) return

    setLoading(true)

    try {
      const token = await getToken()
      const relationshipId = relationship.id
      const aiResponse = await aiFetch(input, token, relationshipId)
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("aiResponse: ", aiResponse)
      setResponse(aiResponse)
    } catch (err) {
      setResponse("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={mainPageStyles.container}>
      <View style={mainPageStyles.header}>
        <CloudIcon />
        <View>
          <Text style={mainPageStyles.title}>Hi There! I'm here to help.</Text>
          <Text style={mainPageStyles.subtitle}>What's on your mind?</Text>
        </View>
      </View>
      <View style={mainPageStyles.inputBox}>
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
          style={{
            position: "absolute",
            right: 10,
            top: !isExpanded ? undefined : undefined,
            bottom: isExpanded ? 2 : undefined,
            transform: isExpanded ? [] : [{ translateY: -40 }],
          }}
          onPress={handleSend}
        >
          <SendIcon />
        </Pressable>
      </View>
      {loading && <Text>Loading...</Text>}
      {!loading && response !== "" && <Text>{response.reply}</Text>}
      <Navigation />
    </View>
  )
}

export default Main
