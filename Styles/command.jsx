import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 30,
  },
  heading: {
    color: "white",
    marginHorizontal: 10,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  input: {
    height: 100,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: "grey",
    color: "white",
    borderRadius: 15
  },
  button: {
    alignItems: "center",
    backgroundColor: "#6CD4FF",
    padding: 10,
    margin: 12,
    borderRadius: 10
  },
  name: {
    color: "white",
  },
  label: {
    color: "white",
    marginHorizontal: 10,
    fontSize: 15,
    margin: 10,
  },
  item: {
    backgroundColor: "#53B3CB",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    borderRadius: 20
  },
  title: {
    fontSize: 14,
    color: "#000000",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  script: {
    fontSize: 14,
    color: "#2D3142",
    fontStyle: "italic",
  },
});
