import { Image, View } from "react-native"
import { COLORS } from "../Styles/StyleColors"

const UserIcon = ({ url, style }) => {
  return (
    <View
      style={[
        {
          borderRadius: 40,
          padding: 3,
          backgroundColor: COLORS.surface,
          marginBottom: -10,

          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.12,
          shadowRadius: 4,
          elevation: 3,
        },
        style,
      ]}
    >
      <Image
        source={{ uri: url }}
        style={{
          width: 70,
          height: 70,
          borderRadius: 35,
        }}
      />
    </View>
  )
}

export default UserIcon
