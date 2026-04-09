import { View } from "react-native"
import Home from "../../../assets/Home.svg"

const HomeIcon = ({ size = 50 }) => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        width: size,
        height: size,
      }}
    >
      <Home width={size} height={size} />
    </View>
  )
}

export default HomeIcon
