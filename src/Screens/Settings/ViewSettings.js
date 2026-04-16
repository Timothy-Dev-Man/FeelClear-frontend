import { Pressable, Text, View } from "react-native"
import { useAuth } from "../../Providers/Context/authContext"
import EditProfile from "../../Components/ChangeProfile"
import { settingsStyles } from "../../Styles/screens/Home/settingsStyles"
import Navigation from "../../Components/Navigation"
import Verify from "../../Components/Logout"
import { useState } from "react"
import { useRelationship } from "../../Providers/Context/relationshipContext"

const SettingsPage = () => {
  const [showLogout, setShowLogout] = useState(false)
  const [showUnpair, setShowUnpair] = useState(false)

  const { deleteRelationship, setIsConnected } = useRelationship()

  const { getUser, logout } = useAuth()

  async function handleUnpair() {
    try {
      await deleteRelationship()
      const me = await getUser()
      console.log(" handleUnpair ME: ", me)
      setIsConnected(me)
    } catch (err) {
      throw err
    }
  }

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

      <Pressable
        style={settingsStyles.logoutButton}
        onPress={() => setShowUnpair(true)}
      >
        <Text>Unpair with partner</Text>
      </Pressable>
      {showLogout && (
        <Verify
          cancel={setShowLogout}
          functionPassed={logout}
          color="#BE6B9D"
          text="Logout"
        />
      )}
      {showUnpair && (
        <Verify
          cancel={setShowUnpair}
          functionPassed={handleUnpair}
          color="#BE6B9D"
          text="Unpair"
        />
      )}
      <Navigation />
    </View>
  )
}

export default SettingsPage
