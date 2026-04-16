import { StyleSheet } from "react-native"
import { COLORS } from "../StyleColors"

export const settingsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(34, 34, 34, 0.2)",

    justifyContent: "center",
    alignItems: "center",

    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    zIndex: 9999,
    elevation: 9999,
  },
  subContainer: {
    backgroundColor: COLORS.mainLightBackground,
    borderWidth: 2,
    borderColor: COLORS.mainInput,
    borderRadius: 30,

    padding: 20,

    width: "85%",
    maxWidth: 400,
    flex: 0.2,

    zIndex: 10000,
    elevation: 10000,
    justifyContent: "flex-end",
  },
  logoutButton: {
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    margin: "auto",
    width: "45%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
  },
  cancelButton: {
    backgroundColor: COLORS.mainInput,
    borderWidth: 2,
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    margin: "auto",
    width: "45%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
  },
  header: {
    flexDirection: "row",
    width: "100%",
    gap: 20,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "600",
    color: COLORS.subTitleText,
    marginTop: 30,
  },
})
