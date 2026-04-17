import { View } from "react-native"
import Home from "../../../assets/Home.svg"

const HomeIcon = ({ currentRoute, size = 50 }) => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        width: size,
        height: size,
        opacity: currentRoute === "Home" ? 1 : 0.4
      }}
    >
      <Home width={size} height={size} />
    </View>
  )
}

export default HomeIcon
