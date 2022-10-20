import React, { useState } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider";

export default function ServoController(props) {
  const [positions, setPositions] = useState({
    base: 90,
    wristPitch: 90,
    wristRoll: 90,
  });

  const handleChange = (servo, pos) => {
    switch (servo) {
      case 1:
        setPositions((prevState) => {
          let position = { ...prevState };
          position.base = pos;
          return position;
        });
        break;
      case 4:
        setPositions((prevState) => {
          let position = { ...prevState };
          position.wristPitch = pos;
          return position;
        });
      case 5:
        setPositions((prevState) => {
          let position = { ...prevState };
          position.wristRoll = pos;
          return position;
        });
      default:
        break;
    }
    var cmd = "s" + servo + pos;
    console.log(cmd);
    props.sendVal(cmd);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Servo Control</Text>
      <View style={{ margin: 10 }}>
        <ServoSlider
          name="Base"
          handleChange={(val) => handleChange(1, val)}
          minColor="#F17105"
          maxColor="#F7C59F"
          thumbColor="#FF7733"
          val={positions.base}
        />
        <ServoSlider
          name="Shoulder"
          handleChange={(val) => handleChange(2, val)}
          minColor="#6B5CA5"
          maxColor="#71A9F7"
          thumbColor="#C6D8FF"
        />
        <ServoSlider
          name="Elbow"
          handleChange={(val) => handleChange(3, val)}
          minColor="#F40076"
          maxColor="#EBA6A9"
          thumbColor="#002A32"
        />
        <ServoSlider
          name="Wrist Pitch"
          handleChange={(val) => handleChange(4, val)}
          minColor="#8CC084"
          maxColor="#C1D7AE"
          thumbColor="#95BF74"
          val={positions.wristPitch}
        />
        <ServoSlider
          name="Writst Roll"
          handleChange={(val) => handleChange(5, val)}
          minColor="#F17105"
          maxColor="#F7C59F"
          thumbColor="#FF7733"
          val={positions.wristRoll}
        />
        <ServoSlider
          name="Gripper"
          handleChange={(val) => handleChange(6, val)}
          minColor="#F17105"
          maxColor="#F7C59F"
          thumbColor="#FF7733"
        />
        <TouchableOpacity style={{ width: 150, alignItems: 'center' }}>
          <Button
            title="Reset Positions"
            disabled={false}
            color="#06AED5"
            onPress={() =>
              setPositions({ base: 90, wristPitch: 90, wristRoll: 90 })
            }
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const ServoSlider = (props) => {
  return (
    <View>
      <Text
        style={{
          color: props.minColor,
          marginHorizontal: 10,
          fontWeight: "bold",
        }}
      >
        {props.name}
      </Text>
      <Slider
        style={{ width: "100%", height: 40 }}
        minimumValue={props.minVal ? props.minVal : 0}
        maximumValue={props.maxVal ? props.maxVal : 180}
        value={props.val ? props.val : 0}
        step={1}
        minimumTrackTintColor={props.minColor}
        maximumTrackTintColor={props.maxColor}
        thumbTintColor={props.thumbColor}
        onSlidingComplete={props.handleChange}
      />
    </View>
  );
};

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
});
