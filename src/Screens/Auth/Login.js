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
import { useAuth } from "../../Providers/Context/authContext"
import { styles } from "../../Styles/screens/Auth/register-login"
import { COLORS } from "../../Styles/StyleColors"
import { CloudIcon } from "../../Components/Icons/CloudIcon"

const Login = ({ navigation }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const { login } = useAuth()

  const handleLogin = async () => {
    if (!username.trim() || !password) {
      alert("Please enter username and password")
      return
    }

    try {
      setLoading(true)
      setError("")
      await login(username.trim(), password)
    } catch (loginError) {
      setError(loginError.message || "Unable to log in. Please try again.")
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
        <View style={styles.header}>
          <View><CloudIcon /></View>

          <View style={styles.headerTextContainer}>
            <Text style={styles.title}>Welcome back!</Text>
            <Text style={styles.subtitle}>Sign in to continue</Text>
          </View>
        </View>

        <View style={styles.authSpacer} />

        <View style={styles.inputBox}>
          <TextInput
            placeholder="Your Name"
            placeholderTextColor={COLORS.placeHolderColor}
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            style={styles.input}
          />

          <TextInput
            placeholder="Password"
            placeholderTextColor={COLORS.placeHolderColor}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            textContentType="password"
            style={styles.input}
          />

          <Pressable onPress={() => navigation.navigate("Register")}>
            <Text style={styles.link}>Don't have an account? Register</Text>
          </Pressable>
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Pressable
          style={({ pressed }) => [
            styles.button,
            (pressed || loading) && styles.buttonDisabled,
          ]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Logging in..." : "Login"}
          </Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default Login
