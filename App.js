import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useAuth } from "./src/Providers/Context/authContext"
import Register from "./src/Screens/Auth/Register"
import { AuthProvider } from "./src/Providers/Auth"
import Main from "./src/Screens/Home.js/Main"
import ChooseIcon from "./src/Screens/Auth/ChooseIcons"
import { useRelationship } from "./src/Providers/Context/relationshipContext"
import { RelationshipProvider } from "./src/Providers/Relationship"
import PartnerCode from "./src/Screens/Auth/PartnerCode"
import SettingsPage from "./src/Screens/Settings/ViewSettings"
import ViewPartner from "./src/Screens/Partner/ViewPartner"

const Stack = createNativeStackNavigator()

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ChooseIcon" component={ChooseIcon} />
    </Stack.Navigator>
  )
}

function ConnectStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Connect" component={PartnerCode} />
    </Stack.Navigator>
  )
}

function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Main} />
      <Stack.Screen name="Settings" component={SettingsPage} />
      <Stack.Screen name="ViewPartner" component={ViewPartner} />
    </Stack.Navigator>
  )
}

function RootNavigator() {
  const { user, isLoading } = useAuth()
  const { isConnected, isLoadingRelationship, hasSkipped } = useRelationship()

  if (isLoading || isLoadingRelationship) return null

  if (!user) return <AuthStack />

  if (!isConnected && !hasSkipped) return <ConnectStack />

  return <AppStack />
}

export default function App() {
  return (
    <AuthProvider>
      <RelationshipProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </RelationshipProvider>
    </AuthProvider>
  )
}
