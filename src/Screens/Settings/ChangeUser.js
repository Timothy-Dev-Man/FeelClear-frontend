import { Pressable, Text, TextInput, View } from "react-native"
import { settingsStyles } from "../../Styles/screens/Home/settingsStyles"
import { COLORS } from "../../Styles/StyleColors"
import { useState } from "react"
import { useNavigation } from "@react-navigation/native"
import ProfileIcon from "../../Components/Icons/ProfileIcon"
import { useAuth } from "../../Providers/Context/authContext"

const ChangeUserPage = () => {
  const [newUsername, setNewUsername] = useState()
  const { user, selectedPic, setSelectedPic, updateUser } = useAuth()

  const navigation = useNavigation()

  async function handleUpdate() {
    try {
      console.log("Before calling updateUser: ", newUsername, "Url: ", selectedPic)
      await updateUser(newUsername, selectedPic)

        setSelectedPic(null)
        setNewUsername("")
        return
    } catch (err) {
      console.error(`handleUpdate error: ${err}`)
      throw err
    }
  }

  return (
    <View
      style={[
        settingsStyles.container,
        { backgroundColor: COLORS.mainDarkBackground },
      ]}
    >
      <Text style={settingsStyles.title}>Settings</Text>
      <ProfileIcon
        userProfileUri={selectedPic}
        title="Choose your avatar"
        text="This can be changed in settings."
        onPress={() => navigation.navigate("ChooseIcon", { mode: "settings" })}
      />

      <TextInput
        placeholder="New username"
        placeholderTextColor={COLORS.placeHolderColor}
        value={newUsername}
        onChangeText={setNewUsername}
        style={settingsStyles.input}
      />

      <Pressable
        style={settingsStyles.logoutButton}
        onPress={() => handleUpdate()}
      >
        <Text>Update</Text>
      </Pressable>
    </View>
  )
}

export default ChangeUserPage
