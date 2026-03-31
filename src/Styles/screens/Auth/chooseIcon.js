import { StyleSheet } from "react-native"
import { COLORS } from "../../StyleColors"

export const chooseStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.mainDarkBackground,
    justifyContent: "center",
    height: "100%",
    paddingLeft: 0,
    paddingRight: 0,
    justifyContent: "flex-end",
  },
  listContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.mainLightBackground,
    justifyContent: "start",
    maxHeight: "40%",
    width: "100%",
    borderColor: "black",
    borderWidth: 2,
  },
  // header: {
  //   display: 'flex',
  //   justifyContent: "flex-start",
  //   backgroundColor: 'red'
  // },
})
