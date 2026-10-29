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
import { useEffect } from "react"
import { getMeFetch } from "./src/Api/user"
import { getToken } from "./src/Storage/auth"
import { ActivityIndicator, Text, View } from "react-native"
import ChangeUserPage from "./src/Screens/Settings/ChangeUser"
import Login from "./src/Screens/Auth/Login"
import { COLORS } from "./src/Styles/StyleColors"

const Stack = createNativeStackNavigator()
const RootStack = createNativeStackNavigator()

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Login" component={Login} />
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
      <Stack.Screen name="ChangeUserPage" component={ChangeUserPage} />
    </Stack.Navigator>
  )
}

function RootNavigator() {
  const { user, isLoading } = useAuth()
  const { isLoadingRelationship, hasSkipped } = useRelationship()

  /* 
  Create Auth, Connect, and App stacks for RootStack
  Get and set user for app on reset
  If there is no user created, the user will be taken to AuthStack.
*/

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          backgroundColor: COLORS.background,
        }}
      >
        <ActivityIndicator color={COLORS.forest} />
        <Text style={{ color: COLORS.mutedBlueGray }}>Loading FeelClear...</Text>
      </View>
    )
  }

  /* 
  If there is no user created, the user will be taken to AuthStack.
  If there is a user but they're not connected and they have no skipped already they'll be taken to the ConnectStack.
  If all are true then they'll be taken to the main app.
*/
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <RootStack.Screen name="Auth" component={AuthStack} />
      ) : !user.is_connected && !hasSkipped ? (
        <RootStack.Screen name="ConnectPage" component={ConnectStack} />
      ) : (
        <RootStack.Screen name="App" component={AppStack} />
      )}

      <RootStack.Screen name="ChooseIcon" component={ChooseIcon} />
    </RootStack.Navigator>
  )
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
