import { View } from "react-native"
import Heart from "../../../assets/Heart.svg"

const PartnerIcon = ({ currentRoute, size = 50 }) => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        width: size,
        height: size,
        opacity: currentRoute === "ViewPartner" ? 1 : 0.4,
      }}
    >
      <Heart width={size} height={size} />
    </View>
  )
}

export default PartnerIcon
