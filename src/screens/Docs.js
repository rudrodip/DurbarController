import React from "react";
import { View, Text, ScrollView } from "react-native";
import { styles } from "../../Styles/command";

export default function Docs() {
  return (
    <ScrollView>
      <View>
        <Text style={{ ...styles.heading, marginTop: 30 }}>
          Durbar Controller Application
        </Text>
        <Text
          style={{
            textAlign: "center",
            fontSize: 13,
            color: "gray",
            margin: 10,
          }}
        >
          made by Rudrodip Sarker
        </Text>
        <Text style={{ ...styles.title, color: "#D81E5B", fontSize: 18 }}>
          About this app:
        </Text>
        <Text style={{ marginHorizontal: 10, marginTop: 5, fontSize: 20 }}>
          This application is built specifically for controlling Durbar (a
          mmultipurpose customizable robot) As well as giving user-friendly UI,
          this app also has a feature called Custom Command for advanced users
          who want to fully customize command script and get the full potential
          out of it. There are certain rules to command this robot which are
          given in manual.
        </Text>

        <Text
          style={{
            ...styles.title,
            color: "#D81E5B",
            fontSize: 18,
            marginTop: 15,
          }}
        >
          Manual:
        </Text>
        <Text
          style={{ ...styles.title, color: "gray", fontSize: 15, margin: 15 }}
        >
          Motor command format:
        </Text>
        <Text style={styles.name}>m[DIR][MOTOR][PWM]</Text>
        <Text style={styles.name}>
          DIR == f - forward, b - backward, r - right, l -
        </Text>
        <Text style={styles.name}>
          left, s - stop, c - custom Motor == 0 or 1 PWM == (0-255)
        </Text>

        <Text
          style={{ ...styles.title, color: "gray", fontSize: 15, margin: 15 }}
        >
          Servo command format:
        </Text>
        <Text style={styles.name}>s[servo_number][pos] pos == (0-180)</Text>
        
      </View>
    </ScrollView>
  );
}
