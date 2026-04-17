import { Pressable, Text, TextInput, View } from "react-native"
import { settingsStyles } from "../../Styles/screens/Home/settingsStyles"
import { COLORS } from "../../Styles/StyleColors"
import { useState } from "react"
import { useNavigation } from "@react-navigation/native"
import ProfileIcon from "../../Components/Icons/ProfileIcon"
import { useAuth } from "../../Providers/Context/authContext"

const ChangeUserPage = () => {
  const [newUsername, setNewUsername] = useState()
  const { selectedPic, setSelectedPic, updateUser } = useAuth()

  const navigation = useNavigation()

  async function handleUpdate() {
    try {
      if (newUsername.length < 4 || newUsername.length > 12) {
        alert("Username must be between 4 - 12")
        return
      }
      await updateUser(newUsername, selectedPic)

      setSelectedPic(null)
      setNewUsername("")
      return
    } catch (err) {
      console.error(`handleUpdate error: ${err}`)
      throw err
    }
  }

  function handleCancel() {
    try {
      navigation.goBack()
    } catch (err) {
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
      <Pressable
        style={settingsStyles.cancelButton}
        onPress={() => handleCancel()}
      >
        <Text style={{ color: "#BE6B9D", fontWeight: "800", fontSize: 15 }}>
          Cancel
        </Text>
      </Pressable>
    </View>
  )
}

export default ChangeUserPage
