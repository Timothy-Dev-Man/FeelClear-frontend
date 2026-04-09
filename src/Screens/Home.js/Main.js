import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  ScrollView,
} from "react-native"
import { useState } from "react"
import { aiFetch } from "../../Api/ai"
import { getToken } from "../../Storage/auth"
import { mainPageStyles } from "../../Styles/screens/Home/main"
import CloudIcon from "../../Components/Icons/CloudIcon"
import SendIcon from "../../Components/Icons/SendIcon"
import Navigation from "../../Components/Navigation"
import { useRelationship } from "../../Providers/Context/relationshipContext"

const Main = () => {
  const [input, setInput] = useState("")
  const [response, setResponse] = useState([])
  const [loading, setLoading] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const { relationship } = useRelationship()

  const handleSend = async () => {
    console.log("pressed")
    if (!input) {
      alert("You cannot send a blank message.")
      return
    }
    if (!relationship) {
      alert("Pair with your partner to start sending messages.")
      return
    }

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
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={mainPageStyles.container}
      >
        <View style={mainPageStyles.header}>
          <CloudIcon />
          <View>
            <Text style={mainPageStyles.title}>
              Hi There! I'm here to help.
            </Text>
            <Text style={mainPageStyles.subtitle}>What's on your mind?</Text>
          </View>
        </View>

        <View
          style={response.reply ? { display: "none" } : mainPageStyles.inputBox}
        >
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
              style={{
                justifyContent: "center",
                alignItems: "center",
                padding: 10,
              }}
              onPress={handleSend}
            >
              <SendIcon />
            </Pressable>
          </View>
        </View>
        <View
          style={
            !response.reply ? { display: "none" } : mainPageStyles.responseBox
          }
        >
          {loading && <Text>Loading...</Text>}
          {!loading && response !== "" && (
            <Text style={mainPageStyles.responseText}>{response.reply}</Text>
          )}
        </View>
      </ScrollView>
      <Navigation />
    </View>
  )
}

export default Main
