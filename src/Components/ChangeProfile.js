import { Pressable, Text, View } from "react-native"
import { useAuth } from "../Providers/Context/authContext"
import { settingsStyles } from "../Styles/screens/Home/settingsStyles"
import UserIcon from "../Components/UserIcon"

const EditProfile = () => {
  const { user } = useAuth()

  console.log("user: ", user)
  return (
    <View style={settingsStyles.subContainer}>
      <Text style={[settingsStyles.name, { marginBottom: 20 }]}>
        Edit Profile
      </Text>
      <View style={settingsStyles.row}>
        <UserIcon style={{ alignSelf: "flex-end" }} url={user.profile_pic} />
        <Text style={settingsStyles.name}>{user.username}</Text>
        <Pressable
          style={({ pressed }) => [
            settingsStyles.pressable,
            { opacity: pressed ? 0.7 : 1 },
          ]}
        >
          <Text>Change</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default EditProfile
