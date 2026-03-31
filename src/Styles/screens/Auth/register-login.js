import { StyleSheet } from "react-native"
import { COLORS } from "../../StyleColors"

export const styles = StyleSheet.create({
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
  },

  button: {
    backgroundColor: COLORS.mainButton,
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    margin: 10,
    width: "80%",
    alignSelf: "center",
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
