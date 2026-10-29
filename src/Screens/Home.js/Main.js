import {
  KeyboardAvoidingView,
  ActivityIndicator,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native"
import { useRef, useState } from "react"
import { aiFetch } from "../../Api/ai"
import { getToken } from "../../Storage/auth"
import { mainPageStyles } from "../../Styles/screens/Home/main"
import { COLORS } from "../../Styles/StyleColors"
import Navigation from "../../Components/Navigation"
import { useRelationship } from "../../Providers/Context/relationshipContext"
import { SendInput } from "../../Components/SendInput"
import { Heart, MessageCircle, Sprout, UserRound } from "lucide-react-native"
import { useNavigation } from "@react-navigation/native"

const Main = () => {
  const [input, setInput] = useState("")
  const [response, setResponse] = useState(null)
  const [sentMessage, setSentMessage] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const requestInFlight = useRef(false)

  const { relationship } = useRelationship()
  const navigation = useNavigation()

  const prompts = [
    { label: "I felt misunderstood", icon: Heart, color: COLORS.forest },
    {
      label: "We keep having the same argument",
      icon: MessageCircle,
      color: COLORS.indigo,
    },
    { label: "I'm not sure how I feel", icon: Sprout, color: COLORS.brown },
  ]

  const handleSend = async () => {
    if (requestInFlight.current || loading) return

    if (!input.trim()) {
      alert("You cannot send a blank message.")
      return
    }

    const submittedMessage = input.trim()

    if (!relationship) {
      alert("Pair with your partner to start sending messages.")
      return
    }

    requestInFlight.current = true
    setLoading(true)
    setError("")
    setSentMessage(submittedMessage)

    try {
      const token = await getToken()
      const aiResponse = await aiFetch(
        submittedMessage,
        token,
        relationship.id,
      )

      if (!aiResponse?.reply) {
        throw new Error("The AI response was unavailable.")
      }

      setResponse(aiResponse)
      setInput("")
    } catch {
      setError("We couldn't get a response. Check your connection and try again.")
    } finally {
      requestInFlight.current = false
      setLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView
      style={mainPageStyles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={mainPageStyles.screen}>
        <ScrollView
          style={mainPageStyles.scroll}
          contentContainerStyle={mainPageStyles.container}
          keyboardShouldPersistTaps="handled"
        >
          <View style={mainPageStyles.topBar}>
            <View style={mainPageStyles.brand}>
              <View style={mainPageStyles.brandMark}>
                <View style={mainPageStyles.brandCircle} />
                <View style={mainPageStyles.brandCircleOverlap} />
              </View>
              <Text style={mainPageStyles.brandName}>FeelClear</Text>
            </View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Open settings"
              onPress={() => navigation.navigate("Settings")}
              style={({ pressed }) => [
                mainPageStyles.profileButton,
                { opacity: pressed ? 0.65 : 1 },
              ]}
            >
              <UserRound size={23} color={COLORS.indigo} strokeWidth={1.8} />
            </Pressable>
          </View>

          <View style={mainPageStyles.intro}>
            <View style={mainPageStyles.headingRule} />
            <Text style={mainPageStyles.title}>
              Let's untangle what's on your mind.
            </Text>
            <Text style={mainPageStyles.subtitle}>
              Start with what happened. We'll work through the feelings together.
            </Text>
          </View>

          {!sentMessage && (
            <View style={mainPageStyles.promptList}>
              {prompts.map(({ label, icon: PromptIcon, color }) => (
                <Pressable
                  key={label}
                  accessibilityRole="button"
                  onPress={() => setInput(label)}
                  style={({ pressed }) => [
                    mainPageStyles.promptCard,
                    { borderColor: color, opacity: pressed ? 0.72 : 1 },
                  ]}
                >
                  <View
                    style={[
                      mainPageStyles.promptIcon,
                      { backgroundColor: `${color}18` },
                    ]}
                  >
                    <PromptIcon size={27} color={color} strokeWidth={1.8} />
                  </View>
                  <Text style={mainPageStyles.promptText}>{label}</Text>
                  <Text style={mainPageStyles.promptArrow}>›</Text>
                </Pressable>
              ))}
            </View>
          )}

          {sentMessage ? (
            <View style={mainPageStyles.conversation}>
              <View style={mainPageStyles.userMessage}>
                <Text style={mainPageStyles.userMessageText}>
                  {sentMessage}
                </Text>
              </View>
              <View style={mainPageStyles.responseBox}>
                {loading ? (
                  <View
                    style={mainPageStyles.loadingRow}
                    accessibilityLiveRegion="polite"
                  >
                    <ActivityIndicator size="small" color={COLORS.forest} />
                    <Text style={mainPageStyles.secondaryText}>
                      FeelClear is thinking...
                    </Text>
                  </View>
                ) : error ? (
                  <Text style={mainPageStyles.errorText}>{error}</Text>
                ) : (
                  <Text style={mainPageStyles.responseText}>
                    {response?.reply}
                  </Text>
                )}
              </View>
              {error ? (
                <Pressable
                  accessibilityRole="button"
                  onPress={handleSend}
                  disabled={loading || !input.trim()}
                  style={({ pressed }) => [
                    mainPageStyles.retryButton,
                    (pressed || loading || !input.trim()) &&
                    mainPageStyles.retryButtonDisabled,
                  ]}
                >
                  <Text style={mainPageStyles.retryText}>Try again</Text>
                </Pressable>
              ) : null}
            </View>
          ) : null}

          <View style={mainPageStyles.inputBox}>
            <SendInput
              handleSend={handleSend}
              setInput={setInput}
              input={input}
              setIsExpanded={setIsExpanded}
              loading={loading}
            />
          </View>
          <Text style={mainPageStyles.privacyNote}>
            Your reflections are private.
          </Text>
        </ScrollView>
        <Navigation />
      </View>
    </KeyboardAvoidingView>
  )
}

export default Main
