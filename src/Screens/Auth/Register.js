import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  View,
  Text,
  TextInput,
} from "react-native"
import { useState } from "react"
import { useAuth } from "../../Providers/Context/authContext"
import { styles } from "../../Styles/screens/Auth/register-login"
import { COLORS } from "../../Styles/StyleColors"
import ProfileIcon from "../../Components/Icons/ProfileIcon"

const Register = ({ navigation }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const { register, selectedPic } = useAuth()

  const handleRegister = async () => {
    if (!username.trim() || !selectedPic || !password) {
      alert("Please choose a Username, Profile icon, and password.")
      return
    }

    const trimmedUsername = username.trim()
    const upperCaseUserName = trimmedUsername.charAt(0).toUpperCase() + trimmedUsername.slice(1)

    try {
      setLoading(true)
      setError("")
      await register(upperCaseUserName, selectedPic, password)
    } catch (registerError) {
      setError(registerError.message || "Unable to register. Please try again.")
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
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <ProfileIcon
          userProfileUri={selectedPic}
          title="Choose your avatar"
          text="This can be changed in settings."
          onPress={() => navigation.navigate("ChooseIcon", { mode: "register" })}
        />
        <View style={[styles.inputBox, { marginTop: 12 }]}>
          <TextInput
            placeholder="Your Name"
            placeholderTextColor={COLORS.placeHolderColor}
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
          />

          <TextInput
            placeholder="Password"
            placeholderTextColor={COLORS.placeHolderColor}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            textContentType="newPassword"
            style={styles.input}
          />

          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text style={styles.link}>Already have an account? Login</Text>
          </Pressable>
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Pressable
          style={({ pressed }) => [
            styles.button,
            (pressed || loading) && styles.buttonDisabled,
          ]}
          onPress={handleRegister}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Registering..." : "Register"}
          </Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default Register
