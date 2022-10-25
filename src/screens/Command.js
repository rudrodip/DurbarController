import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import RNFS from "react-native-fs";
import { sendMessage } from "./Home";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { styles } from "../../Styles/command";
const filePath = RNFS.DocumentDirectoryPath; //absolute path of our file

const makeFile = async (filePath, content) => {
  try {
    await RNFS.writeFile(filePath, content, "utf8");
    console.log("written to file");
  } catch (error) {
    console.log(error);
  }
};

const deleteFile = async (path) => {
  try {
    await RNFS.unlink(path); //delete the item present at 'path'
    console.log("file deleted");
  } catch (error) {
    console.log(error);
  }
};

const handleExecute = (val, device) => {
  if (!val) {
    return;
  }
  const cmdArray = val.split("\n");
  for (let i = 0; i < cmdArray.length; i++) {
    sendMessage(cmdArray[i], device);
  }
};

const Command = () => {
  const [cmd, setCmd] = useState("");
  const [cmdName, setCmdName] = useState("");
  const [files, setFiles] = useState([]);
  const [fileData, setFileData] = useState([]);

  const getFileContent = async (path) => {
    const reader = await RNFS.readDir(path);
    setFiles(reader);
  };

  const saveCommand = (name, cmdVal) => {
    const cmdFilePath = `${filePath}/${name}.durbar`;
    if (!name) {
      Alert.alert(
        "Name missing",
        "Please enter a command name for saving",
      );
    } else if (!cmdVal) {
      Alert.alert(
        "Command Missing",
        "Please enter command script",
      );
    } else {
      makeFile(cmdFilePath, cmdVal);
    }
  };

  const getSavedCommands = () => {
    getFileContent(RNFS.DocumentDirectoryPath); // getting all files in directory
    console.log(files)
    let tempfileData = []; // initializing temp file data array
    files.map(async (file) => {
      // mapping every element in files array got from getFileContent() function
      if (file.name.endsWith(".durbar")) {
        // if file has .durbar extension
        let cmdObject = {}; // creating a blank command object
        cmdObject.name = file.name; // assigning name to command file
        cmdObject.content = await RNFS.readFile(file.path); // reading the file content and assigning to content property of cmdObject
        tempfileData.push(cmdObject); // pushing object to temp array
      }
    });
    setFileData(tempfileData); // setting file data
    console.log(fileData)
    
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
      <Text style={styles.heading}>Saved Commands</Text>
      <FlatList
        data={fileData}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
};

export default Command;

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
    <TouchableOpacity
      onPress={() => handleExecute(content, global.connectedDevice)}
    >
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.script}>{content}</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => deleteFile(`${filePath}/${name}`)}>
      <MaterialIcons name="delete" color="#D84727" size={30} />
    </TouchableOpacity>
  </View>
);

const renderItem = ({ item }) => (
  <Item name={item.name} content={item?.content} />
);
