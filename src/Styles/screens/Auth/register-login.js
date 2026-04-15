import { StyleSheet } from "react-native"
import { COLORS } from "../../StyleColors"

export const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: COLORS.mainInputOutline,
    borderWidth: 2,
    borderLeftWidth: 2,
    borderRadius: 50,
    width: "100%",
    height: "30%",
    backgroundColor: COLORS.mainLightBackground,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 6,
    gap: 20,
    padding: 20
  },

  headerTextContainer: {
    flex: 1,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
  },

  subtitle: {
    fontSize: 14,
    color: COLORS.placeHolderColor,
    marginTop: 4,
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 90,
    backgroundColor: COLORS.mainDarkBackground,
    justifyContent: "flex-start",
    height: "100%",
    flexDirection: "column",
  },

  inputBox: {
    width: "100%",
    justifyContent: "center",
  },

  input: {
    backgroundColor: COLORS.mainInput,
    borderColor: COLORS.mainInputOutline,
    borderWidth: 2,
    borderLeftWidth: 2,
    borderRadius: 50,
    width: "100%",
    height: "20%",
    marginTop: 10,
    paddingLeft: 50,
    fontSize: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 6,
  },

  button: {
    backgroundColor: COLORS.mainButton,
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    margin: 10,
    width: "80%",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },

  link: {
    marginTop: 15,
    textAlign: "center",
  },
})
