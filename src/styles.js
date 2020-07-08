import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF"
  },
  buttonAction: {
    height: "100%",
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  body: {
    flexDirection: "row",
    backgroundColor: "#FFF"
  },
  picker: {
    flex: 1
  },
  separator: {
    alignSelf: "center",
    fontSize: 16,
    color: "white"
  }
});

export default styles;
