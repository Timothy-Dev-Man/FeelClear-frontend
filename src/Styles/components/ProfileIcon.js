import { StyleSheet } from "react-native"
import { COLORS } from "../StyleColors"

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.border,
    borderWidth: 1,
    minHeight: 180,
    width: "100%",
    borderRadius: 16,
    alignItems: "stretch",
    justifyContent: "center",
    padding: 16,
  },
  avatarWrapper: {
    position: "absolute",
    top: -50,
    alignSelf: "center",
    zIndex: 10,
  },
  pressable: {
    alignSelf: "center",
    margin: 10,
    borderRadius: 50,
  },
  title: {
    fontSize: 21,
    fontWeight: "700",
    marginBottom: 10,
    textAlign: "center",
    color: COLORS.indigo,
  },
  small: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: "center",
    color: COLORS.mutedBlueGray,
  },
})
