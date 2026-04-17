import { Pressable, Text, View } from "react-native"
import { useAuth } from "../../Providers/Context/authContext"
import EditProfile from "../../Components/ChangeProfile"
import { settingsStyles } from "../../Styles/screens/Home/settingsStyles"
import Navigation from "../../Components/Navigation"
import Verify from "../../Components/Verify"
import { useState } from "react"
import { useRelationship } from "../../Providers/Context/relationshipContext"
import { SadCloudIcon } from "../../Components/Icons/CloudIcon"

const SettingsPage = () => {
  const [showLogout, setShowLogout] = useState(false)
  const [showUnpair, setShowUnpair] = useState(false)

  const { deleteRelationship, relationship } = useRelationship()

  const { getUser, logout } = useAuth()

  async function handleUnpair() {
    try {
      if (!relationship) {
        return
      }
      await deleteRelationship()
      const me = await getUser()
      console.log(" handleUnpair ME: ", me)
    } catch (err) {
      throw err
    }
  }

  function handleShowUnpair() {
    if (!relationship) {
      return
    }
    setShowUnpair(true)
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
        style={[settingsStyles.logoutButton, { opacity: !relationship ? 0.4 : 1 }]}
        onPress={() => handleShowUnpair()}
      >
        <Text>Unpair with partner</Text>
      </Pressable>
      {showLogout && (
        <Verify
          cancel={setShowLogout}
          functionPassed={logout}
          color="#BE6B9D"
          text="Logout"
          component={<SadCloudIcon />}
        />
      )}
      {showUnpair && (
        <Verify
          cancel={setShowUnpair}
          functionPassed={handleUnpair}
          color="#BE6B9D"
          text="Unpair"
          component={<SadCloudIcon />}
        />
      )}
      <Navigation />
    </View>
  )
}

export default SettingsPage
