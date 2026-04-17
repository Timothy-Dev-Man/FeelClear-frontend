import { Pressable, Text, View } from "react-native"
import Settings from "../../../assets/Settings.svg"
import { useAuth } from "../../Providers/Context/authContext"

const SettingsIcon = ({ currentRoute, size = 50 }) => {
  const { logout } = useAuth()
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        width: size,
        height: size,
        opacity: currentRoute === "Settings" ? 1 : 0.4,
      }}
    >
      <Settings width={size} height={size} />
    </View>
  )
}

export default SettingsIcon
