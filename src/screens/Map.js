import React, { Component, useRef } from "react";
import Canvas from "react-native-canvas";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

class Map extends Component {
  handleCanvas = (canvas) => {
    canvas.width = windowWidth;
    canvas.height = windowHeight;
    const ctx = canvas.getContext("2d");

    ctx.strokeStyle = "white";
    var bw = windowWidth - 20;
    var bh = windowHeight - 20;
    var p = 5;
    var numberOfRow = 10
    function drawBoard() {
      for (var x = 0; x <= bw; x += numberOfRow) {
        ctx.moveTo(0.5 + x + p, p);
        ctx.lineTo(0.5 + x + p, bh + p);
      }

      for (var x = 0; x <= bh; x += numberOfRow) {
        ctx.moveTo(p, 0.5 + x + p);
        ctx.lineTo(bw + p, 0.5 + x + p);
      }
      ctx.strokeStyle = "white";
      ctx.stroke();
    }

    drawBoard();
  };

  render() {
    return (
      <View style={{ width: "100%" }}>
        <Text style={styles.heading}>Map geneator</Text>
        <Canvas ref={this.handleCanvas} style={{ width: "100%" }} />
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
