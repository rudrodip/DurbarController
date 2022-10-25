import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function JoyStick(props) {
  const handleChange = (dir, pressState) => {
    var cmd;
    var dirKey = dir.toLowerCase()[0];
    if (pressState == 'in'){
        cmd = 'm' + dirKey
        props.sendVal(cmd, global.connectedDevice)
    } else {
        cmd = 'ms'
        props.sendVal(cmd, global.connectedDevice)
    }
    console.log(cmd);
  };
  return (
    <View style={styles.container}>
      <View>
        <DirectionKey name="Forward" onChange={handleChange} />
      </View>
      <View style={{ flexDirection: 'row' }}>
        <DirectionKey name="Left" onChange={handleChange} />
        <DirectionKey name="Right" onChange={handleChange} />
      </View>
      <View>
        <DirectionKey name="Backward" onChange={handleChange} />
      </View>
    </View>
  );
}

const DirectionKey = (props) => {
  return (
    <View>
      <TouchableOpacity 
      style={styles.button} 
      onPressIn={() => props.onChange(props.name, 'in')}
      onPressOut={() => props.onChange(props.name, 'out')}
      >
        <Text style={{color: 'white'}}>{props.name}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
    alignItems: 'center',
    marginVertical: 10
  },
  button: {
    alignItems: "center",
    backgroundColor: "#6CD4FF",
    padding: 10,
    width: 90,
    margin: 5
  }
});
