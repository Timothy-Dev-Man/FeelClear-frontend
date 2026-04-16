import { Pressable, Text, View } from "react-native"
import { useAuth } from "../../Providers/Context/authContext"
import EditProfile from "../../Components/ChangeProfile"
import { settingsStyles } from "../../Styles/screens/Home/settingsStyles"
import Navigation from "../../Components/Navigation"
import Logout from "../../Components/Logout"
import { useState } from "react"

const SettingsPage = () => {
    const [showLogout, setShowLogout] = useState(false)

  return (
    <View style={settingsStyles.container}>
      <Text style={settingsStyles.title}>Settings</Text>
      <EditProfile />
      <Pressable
        style={settingsStyles.logoutButton}
        onPress={() => setShowLogout(true)}
      >
        <Text>Logout</Text>
      </Pressable>
      {showLogout && <Logout cancel={setShowLogout} />}
      <Navigation />
    </View>
  )
}

export default SettingsPage
