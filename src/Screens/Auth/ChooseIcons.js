import { View, Image, Pressable, Text } from "react-native"
import { styles } from "../../Styles/screens/Auth/register-login"
import { useEffect, useState } from "react"
import ProfileList from "../../Components/ProfileItem"
import { IconsFetch } from "../../Api/auth"
import { chooseStyles } from "../../Styles/screens/Auth/chooseIcon"
import ProfileIcon from "../../Components/Icons/ProfileIcon"
import { useAuth } from "../../Providers/Context/authContext"
import { useRoute } from "@react-navigation/native"
import { settingsStyles } from "../../Styles/screens/Home/settingsStyles"

export default function ChooseIcon({ navigation }) {
  const [images, setImages] = useState([])
  const [selected, setSelected] = useState(null)

  const route = useRoute()
  const { setSelectedPic } = useAuth()

  useEffect(() => {
    async function loadIcons() {
      const data = await IconsFetch()
      setImages(data)
    }
    loadIcons()
  }, [])

  function handleSetIcon() {
    if (!selected) return

    if (route.params?.mode === "settings") {
      setSelectedPic(selected)
    }

    if (route.params?.mode === "register") {
      setSelectedPic(selected)
    }

    navigation.goBack()
  }

  return (
    <View style={chooseStyles.container}>
      <Text style={settingsStyles.title}>Settings</Text>
      <ProfileIcon
        userProfileUri={selected}
        title="Your avatar"
        text="This can be changed in settings."
      />
      <Pressable style={styles.button} onPress={handleSetIcon}>
        <Text style={styles.buttonText}>Select</Text>
      </Pressable>
      <View style={{ flex: 0.3 }}></View>
      <View style={chooseStyles.listContainer}>
        <ProfileList list={images} selected={selected} onSelect={setSelected} />
      </View>
    </View>
  )
}
