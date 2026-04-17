import { View, Text, TextInput, Pressable, DevSettings } from "react-native"
import { useEffect, useState } from "react"
import { useAuth } from "../../Providers/Context/authContext"
import { styles } from "../../Styles/screens/Auth/register-login"
import { COLORS } from "../../Styles/StyleColors"
import ProfileIcon from "../../Components/Icons/ProfileIcon"
import {CloudIcon} from "../../Components/Icons/CloudIcon"

const Login = ({ navigation }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()

  const handleLogin = async () => {
    if (!username) {
      alert("Please enter username and password")
      return
    }

    try {
      setLoading(true)
      await login(username, password)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <CloudIcon />
        </View>


        <View style={styles.headerTextContainer}>
          <Text style={styles.title}>Welcome back!</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>
        </View>
      </View>

        <View style={{flex: 0.39}}></View>

      <View style={styles.inputBox}>
        <TextInput
          placeholder="Your Name"
          placeholderTextColor={COLORS.placeHolderColor}
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor={COLORS.placeHolderColor}
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />

        <Pressable onPress={() => navigation.navigate("Register")}>
          <Text style={styles.link}>Don't have an account? Register</Text>
        </Pressable>
      </View>

      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>
          {loading ? "Logging in..." : "Login"}
        </Text>
      </Pressable>

      <Pressable onPress={() => DevSettings.reload()}>
        <Text style={styles.link}>Reload</Text>
      </Pressable>
    </View>
  )
}

export default Login
