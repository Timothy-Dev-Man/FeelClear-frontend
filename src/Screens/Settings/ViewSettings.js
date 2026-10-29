import { Pressable, Text, View } from "react-native"
import { useAuth } from "../../Providers/Context/authContext"
import EditProfile from "../../Components/ChangeProfile"
import { settingsStyles } from "../../Styles/screens/Home/settingsStyles"
import Navigation from "../../Components/Navigation"
import Verify from "../../Components/Verify"
import { useState } from "react"
import { useRelationship } from "../../Providers/Context/relationshipContext"
import { SadCloudIcon } from "../../Components/Icons/CloudIcon"
import { COLORS } from "../../Styles/StyleColors"

const SettingsPage = () => {
  const [showLogout, setShowLogout] = useState(false)
  const [showUnpair, setShowUnpair] = useState(false)

  const { deleteRelationship, relationship } = useRelationship()

  const { logout } = useAuth()

  async function handleUnpair() {
    try {
      if (!relationship) {
        return
      }
      await deleteRelationship()
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
    <>
      <View style={settingsStyles.container}>
        <Text style={settingsStyles.title}>Settings</Text>
        <EditProfile />
        <Pressable
          style={settingsStyles.logoutButton}
          onPress={() => setShowLogout(true)}
        >
          <Text style={{ color: COLORS.white, fontWeight: "600" }}>Logout</Text>
        </Pressable>

        <Pressable
          style={[settingsStyles.logoutButton, { opacity: !relationship ? 0.4 : 1 }]}
          onPress={() => handleShowUnpair()}
        >
          <Text style={{ color: COLORS.white, fontWeight: "600" }}>
            Unpair with partner
          </Text>
        </Pressable>
        {showLogout && (
          <Verify
            cancel={setShowLogout}
            functionPassed={logout}
            color={COLORS.berry}
            text="Logout"
            component={<SadCloudIcon />}
          />
        )}
        {showUnpair && (
          <Verify
            cancel={setShowUnpair}
            functionPassed={handleUnpair}
            color={COLORS.berry}
            text="Unpair"
            component={<SadCloudIcon />}
          />
        )}
      </View>
      <Navigation />
    </>
  )
}

export default SettingsPage
