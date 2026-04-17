import { View } from "react-native"
import Cloud from "../../../assets/cloud.svg"
import SadCloud from "../../../assets/SadCloud.svg"

export const CloudIcon = () => {
  return (
    <View style={{ flex: 0.5, justifyContent: "center", alignItems: "center" }}>
      <Cloud width={100} height={100} />
    </View>
  )
}

export const SadCloudIcon = () => {
  return (
    <View style={{ flex: 0.5, justifyContent: "center", alignItems: "center" }}>
      <SadCloud width={100} height={100} />
    </View>
  )
}
