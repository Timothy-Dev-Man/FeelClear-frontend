import { Pressable, Text, View } from "react-native"
import Settings from "../../../assets/Settings.svg"
import { useAuth } from "../../Providers/Context/authContext"

const SettingsIcon = ({ size = 50 }) => {
  const { logout } = useAuth()
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        width: size,
        height: size,
      }}
    >
      <Settings width={size} height={size} />
      {/* <Pressable onPress={() => logout()}>
        <Text>Logout</Text>
      </Pressable> */}
    </View>
  )
}

export default SettingsIcon
