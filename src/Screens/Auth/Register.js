import { View, Text, TextInput, Pressable, DevSettings } from "react-native"
import { useEffect, useState } from "react"
import { useAuth } from "../../Providers/Context/authContext"
import { styles } from "../../Styles/screens/Auth/register-login"
import { COLORS } from "../../Styles/StyleColors"
import ProfileIcon from "../../Components/Icons/ProfileIcon"

const Register = ({ navigation }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(false)

  const { register, selectedPic } = useAuth()

  useEffect(() => {
    if (selectedPic) {
      setSelected(selectedPic)
    }
  }, [selectedPic])

  const handleRegister = async () => {
    if (!username || !selected || !password) {
      alert("Please choose a Username, Profile icon, and password.")
      return
    }

    const upperCaseUserName = username.charAt(0).toUpperCase() + username.slice(1)

    try {
      setLoading(true)
      await register(upperCaseUserName, selected, password)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <ProfileIcon
        userProfileUri={selected}
        title="Choose your avatar"
        text="This can be changed in settings."
        onPress={() => navigation.navigate("ChooseIcon", { mode: "register" })}
      />
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

        <Pressable onPress={() => navigation.navigate("Login")}>
          <Text style={styles.link}>Already have an account? Login</Text>
        </Pressable>
      </View>

      <Pressable style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>
          {loading ? "Registering..." : "Register"}
        </Text>
      </Pressable>
    </View>
  )
}

export default Register
