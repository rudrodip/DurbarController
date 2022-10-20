import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function SensorDataVisualize(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sensor Data Visualization</Text>
      <DynamicBar
        name="Temperature (Celcius)"
        minVal="0"
        maxVal="100"
        color="#06D6A0"
        val={props.sensorData.temp}
      />
      <DynamicBar
        name="Humidity"
        minVal="10"
        maxVal="100"
        color="#118AB2"
        val={props.sensorData.humid}
      />
      <DynamicBar
        name="Smoke presence"
        minVal="0"
        maxVal="100"
        color="#DE3C4B"
        val={props.sensorData.smoke}
      />
      <DynamicBar
        name="Sonar"
        minVal="0"
        maxVal="20"
        color="#FE5F55"
        val={props.sensorData.sonar}
      />
    </View>
  );
}

const DynamicBar = (props) => {
  var relativeVal = (props.val - props.minVal) / (props.maxVal - props.minVal) * 100
  var relativeVal = `${relativeVal}%`
  return (
    <View>
      <Text style={{ ...styles.title, color: props.color }}>{props.name}</Text>
      <View>
        <View
          style={{
            ...styles.bar,
            width: relativeVal,
            backgroundColor: props.color,
            position: "absolute"
          }}
        />
        <View
          style={{
            ...styles.bar,
            width: '100%',
            backgroundColor: '#3D3A4B',
            zIndex: -1
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  heading: {
    color: "white",
    marginHorizontal: 10,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    padding: 5,
    margin: 5,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#6CD4FF",
    padding: 10,
    width: 90,
    margin: 5,
  },
  bar: {
    height: 15,
    borderRadius: 5,
  },
});
