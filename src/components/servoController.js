import React, { useState } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider";

export default function ServoController(props) {
  const [base, setBase] = useState(90);
  const [shoulder, setShoulder] = useState(0);
  const [elbow, setElbow] = useState(0);
  const [wristPitch, setWristPitch] = useState(90);
  const [wristRoll, setWristRoll] = useState(90);
  const [gripper, setGripper] = useState(0);

  const handleReset = () => {
    setBase(90);
    setShoulder(0);
    setElbow(0);
    setWristPitch(90);
    setWristRoll(90);
    setGripper(0);
    props.sendVal("close", props.connectedDevice);
  }

  const handleChange = (servo, pos) => {
    switch (servo) {
      case 1:
        setBase(pos);
        break;
      case 2:
        setShoulder(pos);
        break;
      case 3:
        setElbow(pos);
        break;
      case 4:
        setWristPitch(pos);
        break;
      case 5:
        setWristRoll(pos);
        break;
      case 6:
        setGripper(pos);
        break;
      default:
        break;
    }
    var cmd = "s" + servo + pos;
    console.log(cmd);
    props.sendVal(cmd, props.connectedDevice);
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
          val={base}
        />
        <ServoSlider
          name="Shoulder"
          handleChange={(val) => handleChange(2, val)}
          minColor="#6B5CA5"
          maxColor="#71A9F7"
          thumbColor="#C6D8FF"
          val={shoulder}
        />
        <ServoSlider
          name="Elbow"
          handleChange={(val) => handleChange(3, val)}
          minColor="#F40076"
          maxColor="#EBA6A9"
          thumbColor="#002A32"
          val={elbow}
        />
        <ServoSlider
          name="Wrist Pitch"
          handleChange={(val) => handleChange(4, val)}
          minColor="#8CC084"
          maxColor="#C1D7AE"
          thumbColor="#95BF74"
          val={wristPitch}
        />
        <ServoSlider
          name="Writst Roll"
          handleChange={(val) => handleChange(5, val)}
          minColor="#F17105"
          maxColor="#F7C59F"
          thumbColor="#FF7733"
          val={wristRoll}
        />
        <ServoSlider
          name="Gripper"
          handleChange={(val) => handleChange(6, val)}
          minColor="#F17105"
          maxColor="#F7C59F"
          thumbColor="#FF7733"
          val={gripper}
        />
        <TouchableOpacity style={{ width: 150, alignItems: "center" }}>
          <Button
            title="Reset Positions"
            disabled={false}
            color="#06AED5"
            onPress={handleReset}
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
        {`${props.name} (${props.val ? props.val : 0})`}
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
