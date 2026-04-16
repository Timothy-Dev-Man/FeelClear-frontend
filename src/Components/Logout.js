import { Pressable, Text, View } from "react-native"
import { InfoCardStyles } from "../Styles/screens/Home/infoCard"
import { useNavigation } from "@react-navigation/native"
import { useAuth } from "../Providers/Context/authContext"
import { settingsStyles } from "../Styles/components/settingsStyles"
import CloudIcon from "./Icons/CloudIcon"

const Logout = ({ cancel }) => {
  const navigation = useNavigation()
  const { logout } = useAuth()

  function handleCancel() {
    try {
      cancel(false)
    } catch (err) {
      throw err
    }
  }
  return (
    <View style={settingsStyles.container}>
      <View style={settingsStyles.subContainer}>
        <CloudIcon />
        <Text style={settingsStyles.title}>
          Are you sure you want to logout?
        </Text>
        <View style={settingsStyles.header}>
          <Pressable
            style={settingsStyles.cancelButton}
            onPress={() => handleCancel()}
          >
            <Text style={{ color: "#BE6B9D", fontWeight: "800", fontSize: 15 }}>
              Cancel
            </Text>
          </Pressable>
          <Pressable
            style={settingsStyles.logoutButton}
            onPress={() => logout()}
          >
            <Text>Logout</Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

export default Logout
