import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import { sendMessage } from "./Home";

const Command = () => {
  const handleExecute = (val, device) => {
    const cmdArray = val.split("\n");
    for (let i = 0; i < cmdArray.length; i++) {
      sendMessage(cmdArray[i], device);
    }
  };
  const [cmd, setCmd] = useState("");
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Custom Commands</Text>
      <TextInput
        style={styles.input}
        onChangeText={setCmd}
        value={cmd}
        multiline
        numberOfLines={4}
      />
      <View style={{ flexDirection: "row" }}>
        <CustomButton
          name="Execute"
          handleChange={handleExecute}
          val={cmd}
          device={global.connectedDevice}
        />
        <CustomButton
          name="Save"
          handleChange={() => console.log("wow")}
          val={cmd}
        />
      </View>
      <View></View>
    </View>
  );
};

export default Command;

const styles = StyleSheet.create({
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
    borderColor: "white",
    color: "white",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#6CD4FF",
    padding: 10,
    width: 90,
    margin: 12,
  },
});

const CustomButton = ({ name, handleChange, val, device=null }) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleChange(val, device)}
      >
        <Text style={{ color: "white" }}>{name}</Text>
      </TouchableOpacity>
    </View>
  );
};
