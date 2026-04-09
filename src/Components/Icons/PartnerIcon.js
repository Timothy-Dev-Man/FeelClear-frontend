import { View } from "react-native"
import Heart from "../../../assets/Heart.svg"

const PartnerIcon = ({ size = 50 }) => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        width: size,
        height: size,
      }}
    >
      <Heart width={size} height={size} />
    </View>
  )
}

export default PartnerIcon
