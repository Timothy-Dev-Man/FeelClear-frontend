import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
} from "react-native"
import { settingsStyles } from "../../Styles/screens/Home/settingsStyles"
import { COLORS } from "../../Styles/StyleColors"
import { useState } from "react"
import { useNavigation } from "@react-navigation/native"
import ProfileIcon from "../../Components/Icons/ProfileIcon"
import { useAuth } from "../../Providers/Context/authContext"

const ChangeUserPage = () => {
  const [newUsername, setNewUsername] = useState("")
  const { selectedPic, setSelectedPic, updateUser } = useAuth()

  const navigation = useNavigation()

  async function handleUpdate() {
    try {
      if (newUsername.length < 4 || newUsername.length > 12) {
        alert("Username must be between 4 - 12")
        return
      }

      const upperCaseUserName =
        newUsername.charAt(0).toUpperCase() + newUsername.slice(1)
      await updateUser(upperCaseUserName, selectedPic)

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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={settingsStyles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={settingsStyles.title}>Edit profile</Text>
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
          <Text style={{ color: COLORS.white, fontWeight: "600" }}>Update</Text>
        </Pressable>
        <Pressable
          style={settingsStyles.cancelButton}
          onPress={() => handleCancel()}
        >
          <Text style={{ color: COLORS.berry, fontWeight: "700", fontSize: 15 }}>
            Cancel
          </Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default ChangeUserPage
