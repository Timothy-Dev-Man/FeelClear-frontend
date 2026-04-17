import { View, Text, ScrollView } from "react-native"
import { useState } from "react"
import { aiFetch } from "../../Api/ai"
import { getToken } from "../../Storage/auth"
import { mainPageStyles } from "../../Styles/screens/Home/main"
import { CloudIcon } from "../../Components/Icons/CloudIcon"
import SendIcon from "../../Components/Icons/SendIcon"
import Navigation from "../../Components/Navigation"
import { useRelationship } from "../../Providers/Context/relationshipContext"
import { SendInput } from "../../Components/SendInput"

const Main = () => {
  const [input, setInput] = useState("")
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const { getRelationship, relationship, isLoadingRelationship } =
    useRelationship()

  const handleSend = async () => {
    if (!input.trim()) {
      alert("You cannot send a blank message.")
      return
    }

    setLoading(true)

    try {
      let rel = relationship

      if (!rel) {
        rel = await getRelationship()
      }

      if (!rel) {
        alert("Pair with your partner to start sending messages.")
        return
      }

      const token = await getToken()
      const aiResponse = await aiFetch(input, token, rel.id)

      setResponse(aiResponse)
    } catch (err) {
      console.error(err)
      setResponse({ reply: "Something went wrong" })
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

        {!response?.reply && (
          <View style={mainPageStyles.inputBox}>
            <SendInput
              handleSend={handleSend}
              setInput={setInput}
              input={input}
              setIsExpanded={setIsExpanded}
              loading={loading}
            />
          </View>
        )}

        {response?.reply && (
          <View style={mainPageStyles.responseBox}>
            <Text style={mainPageStyles.responseText}>{response.reply}</Text>

            {loading && !response?.reply && <Text>Loading...</Text>}
          </View>
        )}

        {loading && <Text>Loading...</Text>}

        {response?.reply && (
          <SendInput
            handleSend={handleSend}
            setInput={setInput}
            input={input}
            setIsExpanded={setIsExpanded}
            loading={loading}
            myStyle={{height: "10%", margin: 10}}
          />
        )}
      </ScrollView>
      <Navigation />
    </View>
  )
}

export default Main
