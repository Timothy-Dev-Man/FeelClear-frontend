import { StyleSheet } from "react-native"
import { COLORS } from "../../StyleColors"

export const mainPageStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 90,
    backgroundColor: COLORS.mainLightBackground,
    justifyContent: "flex-start",
    flexDirection: "column",
  },
  header: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    justifyContent: "center",
    alignItems: "center",
    gap: 40,
  },
  title: {
    fontSize: 25,
    fontWeight: "600",
    marginBottom: 10,
    color: COLORS.subTitleText,
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 25,
    textAlign: "center",
    color: COLORS.subTitleText,
  },
  inputBox: {
    backgroundColor: COLORS.sendInputBackground,
    borderColor: COLORS.mainInputOutline,
    borderWidth: 2,
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 10,
    maxHeight: "60%",
    position: "relative",
    alignItems: "center",
    shadowColor: "#171717",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
  },

  spaceIcons: {
    flexDirection: "row",
    backgroundColor: "rgba(231, 223, 233, 1)",
    borderColor: COLORS.mainInputOutline,
    borderWidth: 2,
    borderLeftWidth: 2,
    borderRadius: 50,
    minHeight: "10%",
    width: "100%",
  },

  spaceIconsContent: {
    justifyContent: "space-between",
    alignItems: "center",
  },

  input: {
    paddingLeft: 20,
    fontSize: 20,
    width: "70%",
  },
  responseBox: {
    backgroundColor: "rgba(245, 215, 226, 1)",
    borderColor: COLORS.mainInputOutline,
    borderWidth: 2,
    borderRadius: 25,
    padding: 20,
    minHeight: "20%",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#171717",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
  },
  responseText: {
    fontSize: 25,
    color: COLORS.subTitleText,
  },
  button: {
    alignSelf: "flex-end",
    marginBottom: 12,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
})
