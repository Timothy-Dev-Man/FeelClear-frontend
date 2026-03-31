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
    flexDirection: "row",
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    minHeight: "10%",
    position: "relative",
    alignItems: 'center',
  },

  input: {
    backgroundColor: "rgba(231, 223, 233, 1)",
    borderColor: COLORS.mainInputOutline,
    borderWidth: 2,
    borderLeftWidth: 2,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    paddingLeft: 20,
    fontSize: 20,
    textAlignVertical: "top",
    width: "80%",
  },
  button: {
    alignSelf: "flex-end",
    marginBottom: 12,
  },
})
