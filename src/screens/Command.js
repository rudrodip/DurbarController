import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import RNFS, { read } from "react-native-fs";
import { sendMessage } from "./Home";

const Command = () => {
  const [cmd, setCmd] = useState("");
  const [cmdName, setCmdName] = useState("");
  const [files, setFiles] = useState([]);
  const [fileData, setFileData] = useState([]);
  const filePath = RNFS.DocumentDirectoryPath; //absolute path of our file

  const makeFile = async (filePath, content) => {
    try {
      await RNFS.writeFile(filePath, content, "utf8");
      console.log("written to file");
    } catch (error) {
      console.log(error);
    }
  };

  const readFile = async (path) => {
    const response = await RNFS.readFile(path);
    return response;
  };

  const getFileContent = async (path) => {
    const reader = await RNFS.readDir(path);
    setFiles(reader);
  };

  const handleExecute = (val, device) => {
    const cmdArray = val.split("\n");
    for (let i = 0; i < cmdArray.length; i++) {
      sendMessage(cmdArray[i], device);
    }
  };

  const saveCommand = (name, cmdVal) => {
    const cmdFilePath = `${filePath}/${name}.durbar`;
    makeFile(cmdFilePath, cmdVal);
  };

  const getSavedCommands = () => {
    getFileContent(RNFS.DocumentDirectoryPath); // getting all files in directory
    let tempfileData = []; // initializing temp file data array

    files.map(async (file) => {
      // mapping every element in files array got from getFileContent() function
      if (file.name.endsWith(".durbar")) {
        // if file has .durbar extension
        let cmdObject = {}; // creating a blank command object
        cmdObject.name = file.name; // assigning name to command file
        cmdObject.content = await RNFS.readFile(file.path); // reading the file content and assigning to content property of cmdObject
        tempfileData.push(cmdObject); // pushing object to temp array
        setFileData(tempfileData); // setting file data
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Custom Commands</Text>
      <Text style={styles.label}>Name of custom command</Text>
      <TextInput
        style={{ ...styles.input, height: 40 }}
        onChangeText={setCmdName}
        value={cmdName}
      />
      <Text style={styles.label}>Command Description</Text>
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
          handleChange={() => {
            saveCommand(cmdName, cmd);
          }}
          val={cmd}
        />
        <CustomButton
          name="Get commands"
          handleChange={() => getSavedCommands()}
          val={cmd}
        />
      </View>
      <FlatList
        data={fileData}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
      />
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
    margin: 12,
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

const CustomButton = ({ name, handleChange, val, device = null }) => {
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

const Item = ({ name, content }) => (
  <View style={styles.item}>
    <TouchableOpacity>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.script}>{content}</Text>
    </TouchableOpacity>
  </View>
);

const renderItem = ({ item }) => (
  <Item name={item.name} content={item?.content} />
);
