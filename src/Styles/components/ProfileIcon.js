import { StyleSheet } from "react-native"
import { COLORS } from "../StyleColors"

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.mainLightBackground,
    borderColor: COLORS.mainInputOutline,
    borderWidth: 2,
    borderLeftWidth: 2,
    height: "30%",
    width: "100%",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  pressable: {
    alignSelf: "center",
    margin: 10,
    shadowColor: "#171717",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
    borderRadius: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  small: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: "center",
    opacity: 0.7,
  },
})
