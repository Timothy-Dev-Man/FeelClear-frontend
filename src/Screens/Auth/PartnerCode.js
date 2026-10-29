import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native"
import { useState } from "react"
import { styles } from "../../Styles/screens/Auth/register-login"
import { COLORS } from "../../Styles/StyleColors"
import { useRelationship } from "../../Providers/Context/relationshipContext"
import { useAuth } from "../../Providers/Context/authContext"
import { partnerStyles } from "../../Styles/screens/Partner/partnerCode"
import { CloudIcon } from "../../Components/Icons/CloudIcon"
import * as Clipboard from "expo-clipboard"

const PartnerCode = ({ navigation }) => {
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const { user } = useAuth()
  const { createRelationship, setHasSkipped } = useRelationship()

  const handleConnect = async () => {
    const normalizedCode = code.trim()
    if (!normalizedCode) {
      alert("Please provide your partners code")
      return
    }
    if (!user?.id) {
      setError("Your session has expired. Please sign in again.")
      return
    }

    try {
      setLoading(true)
      setError("")
      const userId = user.id
      await createRelationship(userId, normalizedCode)
    } catch (connectError) {
      setError(connectError.message || "Unable to connect. Check the code and try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={partnerStyles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={partnerStyles.header}>
          <CloudIcon />
          <Text style={partnerStyles.title}>Partner Code</Text>
        </View>
        <View>
          <Text style={[partnerStyles.subtitle, { fontWeight: "600" }]}>
            Let's connect you with your partner!
          </Text>
          <Text style={partnerStyles.subtitle}>
            Ask your partner for their code and enter it below to sync up.
          </Text>
        </View>
        <View style={partnerStyles.codeSection}>
          <Text style={partnerStyles.title}>Your code:</Text>
          <Pressable
            onPress={() => user?.partner_code && Clipboard.setStringAsync(user.partner_code)}
          >
            <View style={partnerStyles.codeBox}>
              {(user?.partner_code ?? "").split("").map((char, index) => (
                <Text
                  key={index}
                  style={[
                    partnerStyles.title,
                    partnerStyles.code,
                    {
                      textDecorationLine: char === " " ? "none" : "underline",
                      width: 50,
                      textAlign: "center",
                    },
                  ]}
                >
                  {char}
                </Text>
              ))}
            </View>
          </Pressable>
        </View>

        <View style={styles.inputBox}>
          <TextInput
            placeholder="Enter Partner Code..."
            placeholderTextColor={COLORS.placeHolderColor}
            value={code}
            onChangeText={setCode}
            autoCapitalize="characters"
            autoCorrect={false}
            style={styles.input}
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Pressable
            style={({ pressed }) => [
              styles.button,
              (pressed || loading) && styles.buttonDisabled,
            ]}
            onPress={handleConnect}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Connecting..." : "Connect"}
            </Text>
          </Pressable>

          <Pressable onPress={() => setHasSkipped(true)}>
            <Text style={styles.link}>Skip</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default PartnerCode
