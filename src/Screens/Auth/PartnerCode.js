import { View, Text, TextInput, Pressable } from "react-native"
import { useState } from "react"
import { styles } from "../../Styles/screens/Auth/register-login"
import { COLORS } from "../../Styles/StyleColors"
import { useRelationship } from "../../Providers/Context/relationshipContext"
import { useAuth } from "../../Providers/Context/authContext"
import { partnerStyles } from "../../Styles/screens/Partner/partnerCode"
import CloudIcon from "../../Components/Icons/CloudIcon"

const PartnerCode = ({ navigation }) => {
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)

  const { user } = useAuth()
  const { createRelationship, setHasSkipped } = useRelationship()

  const handleConnect = async () => {
    if (!code) {
      alert("Please provide your partners code")
      return
    }

    try {
      setLoading(true)
      const userId = user.id
      await createRelationship(userId, code)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={partnerStyles.container}>
      <View style={partnerStyles.header}>
        <CloudIcon />
        <Text style={partnerStyles.title}>Partner Code</Text>
      </View>
      <View>
        <Text style={[partnerStyles.subtitle, { fontWeight: "600" }]}>
          Let's connect you with your partner!
        </Text>
        <Text style={partnerStyles.subtitle}>
          Ask your partner for their code and enter it below to sync up.
        </Text>
      </View>
      <View style={styles.inputBox}>
        <TextInput
          placeholder="Enter Partner Code..."
          placeholderTextColor={COLORS.placeHolderColor}
          value={code}
          onChangeText={setCode}
          style={[styles.input, { height: "23%" }]}
        />

        <Pressable style={styles.button} onPress={handleConnect}>
          <Text style={styles.buttonText}>
            {loading ? "Connecting..." : "Connect"}
          </Text>
        </Pressable>

        <Pressable onPress={() => setHasSkipped(true)}>
          <Text style={styles.link}>Skip</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default PartnerCode
