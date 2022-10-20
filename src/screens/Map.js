import React, { Component, useRef } from "react";
import Canvas from "react-native-canvas";
import { View, Text, StyleSheet } from "react-native";

class Map extends Component {
  handleCanvas = (canvas) => {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "purple";
    ctx.fillRect(0, 0, 100, 100);
  };

  render() {
    return (
      <View>
        <Text style={styles.heading}>Map geneator</Text>
        <Canvas ref={this.handleCanvas} />
      </View>
    );
  }
}

export default Map;

const styles = StyleSheet.create({
  heading: {
    color: "white",
    margin: 10,
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
});
