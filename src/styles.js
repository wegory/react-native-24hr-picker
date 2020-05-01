import { StyleSheet, Dimensions } from "react-native";
var deviceWidth = Dimensions.get("window").width;



const styles = StyleSheet.create({
  header: {
    height: 60,
    borderBottomWidth: 1,
    borderColor: "gold",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#2E2E2E"
  },
  buttonAction: {
    height: "100%",
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    fontSize: 19,
    color: "gold",
    fontWeight: "500"
  },
  buttonTextCancel: {
    color: "white",
    fontWeight: "400",
    fontSize: 18
  },
  body: {
    flexDirection: "row",
    backgroundColor: "#1c2126"
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
