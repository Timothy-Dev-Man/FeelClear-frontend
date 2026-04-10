import { Pressable, Text, View } from "react-native"
import { useAuth } from "../../Providers/Context/authContext"
import EditProfile from "../../Components/ChangeProfile"
import { settingsStyles } from "../../Styles/screens/Home/settingsStyles"
import Navigation from "../../Components/Navigation"

const SettingsPage = () => {
    const { logout } = useAuth()
  return (
    <View style={settingsStyles.container}>
      <Text style={settingsStyles.title}>Settings</Text>
      <EditProfile />
      <Pressable style={settingsStyles.logoutButton} onPress={() => logout()}>
        <Text>Logout</Text>
      </Pressable>
      <Navigation />
    </View>
  )
}

export default SettingsPage
