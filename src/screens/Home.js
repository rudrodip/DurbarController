/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */

import React, { useState } from "react";
import {
  TouchableOpacity,
  Button,
  PermissionsAndroid,
  View,
  Text,
  ScrollView,
} from "react-native";
import ConnectButton from "../components/connectButton";
import ServoController from "../components/servoController";
import JoyStick from "../components/joyStick";
import SensorDataVisualize from "../components/sensorData";
import base64 from "react-native-base64";

import { BleManager, Device } from "react-native-ble-plx";
import { styles } from "../../Styles/styles";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["new NativeEventEmitter"]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const BLTManager = new BleManager();

const SERVICE_UUID = "4fafc201-1fb5-459e-8fcc-c5c9c331914b";

const MESSAGE_UUID = "6d68efe5-04b6-4a85-abc4-c2670b7bf7fd";

const processData = (data) => {

}

export default function Home() {
  //Is a device connected?
  const [isConnected, setIsConnected] = useState(false);

  //What device is connected?
  const [connectedDevice, setConnectedDevice] = useState();

  const [sensorData, setSensorData] = useState({
    temp: 29.5,
    humid: 30,
    smoke: 63.5,
    sonar: 15,
  });

  // Scans availbale BLT Devices and then call connectDevice
  async function scanDevices() {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Permission Localisation Bluetooth",
        message: "Requirement for Bluetooth",
        buttonNeutral: "Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    ).then((answer) => {
      console.log("scanning");
      // display the Activityindicator

      BLTManager.startDeviceScan(null, null, (error, scannedDevice) => {
        if (error) {
          console.warn(error);
        }

        if (scannedDevice && scannedDevice.name === "Durbar") {
          BLTManager.stopDeviceScan();
          connectDevice(scannedDevice);
        }
      });

      // stop scanning devices after 5 seconds
      setTimeout(() => {
        BLTManager.stopDeviceScan();
      }, 5000);
    });
  }

  // handle the device disconnection (poorly)
  async function disconnectDevice() {
    console.log("Disconnecting start");

    if (connectedDevice != null) {
      const isDeviceConnected = await connectedDevice.isConnected();
      if (isDeviceConnected) {
        BLTManager.cancelTransaction("messagetransaction");
        BLTManager.cancelTransaction("nightmodetransaction");

        BLTManager.cancelDeviceConnection(connectedDevice.id).then(() =>
          console.log("DC completed")
        );
      }

      const connectionStatus = await connectedDevice.isConnected();
      if (!connectionStatus) {
        setIsConnected(false);
      }
    }
  }

  async function sendMessage(message) {
    if (isConnected) {
      BLTManager.writeCharacteristicWithResponseForDevice(
        connectedDevice?.id,
        SERVICE_UUID,
        MESSAGE_UUID,
        base64.encode(message.toString())
      ).then((characteristic) => {
        console.log("message sent to :", base64.decode(characteristic.value));
      });
    } else {
      console.warn("not connected");
    }
  }

  //Connect the device and start monitoring characteristics
  async function connectDevice(device) {
    console.log("connecting to Device:", device.name);

    device
      .connect()
      .then((device) => {
        setConnectedDevice(device);
        setIsConnected(true);
        return device.discoverAllServicesAndCharacteristics();
      })
      .then((device) => {
        //  Set what to do when DC is detected
        BLTManager.onDeviceDisconnected(device.id, (error, device) => {
          console.log("Device DC");
          setIsConnected(false);
        });

        //Read inital values

        //Message
        device
          .readCharacteristicForService(SERVICE_UUID, MESSAGE_UUID)
          .then((valenc) => {
            setSensorData(base64.decode(valenc?.value));
          });

        //monitor values and tell what to do when receiving an update

        //Message
        device.monitorCharacteristicForService(
          SERVICE_UUID,
          MESSAGE_UUID,
          (error, characteristic) => {
            if (characteristic?.value != null) {
              setSensorData(base64.decode(characteristic?.value));
              console.log(
                "Message update received: ",
                base64.decode(characteristic?.value)
              );
            }
          },
          "messagetransaction"
        );

        console.log("Connection established");
      });
  }

  return (
    <ScrollView>
      <ConnectButton
        isConnected={isConnected}
        scanDevices={scanDevices}
        disconnectDevice={disconnectDevice}
      />
      <JoyStick sendVal={sendMessage} />
      <ServoController sendVal={sendMessage} />
      <SensorDataVisualize sensorData={sensorData} />
    </ScrollView>
  );
}
