import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  DevSettings,
} from "react-native"
import { useEffect, useState } from "react"
import { useRoute } from "@react-navigation/native"
import { useAuth } from "../../Providers/Context/authContext"
import { styles } from "../../Styles/screens/Auth/register-login"
import ProfileIcon from "../../Components/ProfileIcon"
import { COLORS } from "../../Styles/StyleColors"

const Register = ({ navigation }) => {
  const [username, setUsername] = useState("")
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(false)

  const { register } = useAuth()

  const route = useRoute()

  useEffect(() => {
    if (route.params?.selectedIcon) {
      setSelected(route.params.selectedIcon)
    }
  }, [route.params?.selectedIcon])

  const handleRegister = async () => {
    if (!username || !selected) {
      alert("Please choose a username and profile icon")
      return
    }

    try {
      setLoading(true)
      await register(username, selected)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <ProfileIcon navigation={navigation} userProfileUri={selected} />
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
          style={styles.input}
        />

        <Pressable onPress={() => navigation.navigate("Login")}>
          <Text style={styles.link}>Already have an account? Login</Text>
        </Pressable>
      </View>

      <Pressable style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>
          {loading ? "Registering..." : "Register"}
        </Text>
      </Pressable>

      <Pressable onPress={() => DevSettings.reload()}>
        <Text style={styles.link}>Reload</Text>
      </Pressable>
    </View>
  )
}

export default Register
