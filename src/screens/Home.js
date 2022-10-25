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
  LogBox,
  Alert
} from "react-native";
import ConnectButton from "../components/connectButton";
import ServoController from "../components/servoController";
import JoyStick from "../components/joyStick";
import SensorDataVisualize from "../components/sensorData";
import base64 from "react-native-base64";
import { BleManager, Device } from "react-native-ble-plx";
import { styles } from "../../Styles/styles";

LogBox.ignoreLogs(["new NativeEventEmitter"]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const BLTManager = new BleManager();

const SERVICE_UUID = "4fafc201-1fb5-459e-8fcc-c5c9c331914b";

const MESSAGE_UUID = "6d68efe5-04b6-4a85-abc4-c2670b7bf7fd";

global.connectedDevice = null

const processData = (data) => {
  if (data[0] == "t"){
    var sensorData = data.replace("t", "");
    sensorData = sensorData.split("-");
    let sensorDataObject = {
      temp: 0,
      humid: 0,
      smoke: 0
    }
    if (sensorData.length == 4){

      sensorDataObject.temp = sensorData[0];
      sensorDataObject.humid = sensorData[1];
      sensorDataObject.smoke = sensorData[2];
      sensorDataObject.sonar = sensorData[3];
    }
    return sensorDataObject
  }
  return 0;
}

export async function sendMessage(message, connectedDevice) {
  console.log(message)
  if (connectedDevice) {
    BLTManager.writeCharacteristicWithResponseForDevice(
      connectedDevice?.id,
      SERVICE_UUID,
      MESSAGE_UUID,
      base64.encode(message.toString())
    ).then((characteristic) => {
      console.log("message sent to :", base64.decode(characteristic.value));
    });
  } else {
    console.warn('not connected')
  }
}

export function receiveMessage(device, setSensorData){
  device.monitorCharacteristicForService(
  SERVICE_UUID,
  MESSAGE_UUID,
  (error, characteristic) => {
    if (characteristic?.value != null) {
      var receivedMessage = base64.decode(characteristic?.value)
      setSensorData(processData(receivedMessage))
      console.log(
        "Message update received: ",
        base64.decode(characteristic?.value)
      );
    }
  },
  "messagetransaction"
);
}

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [connectedDevice, setConnectedDevice] = useState();
  const [sensorData, setSensorData] = useState('');
  const [recvText, setRecvText] = useState('')

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
          Alert.alert("BLE Error", error.toString());
        }
        console.log(scannedDevice ? scannedDevice.name : '')
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

  //Connect the device and start monitoring characteristics
  async function connectDevice(device) {
    console.log("connecting to Device:", device.name);

    device
      .connect()
      .then((device) => {
        setConnectedDevice(device);
        global.connectedDevice = device
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

        // receiveMessage(device, setSensorData)
        device.monitorCharacteristicForService(
          SERVICE_UUID,
          MESSAGE_UUID,
          (error, characteristic) => {
            if (characteristic?.value != null) {
              var receivedMessage = base64.decode(characteristic?.value)
              if (processData(receivedMessage)){
                setSensorData(processData(receivedMessage))
              }
              setRecvText(receivedMessage)
              console.log(
                "Message update received: ",
                receivedMessage
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
      <ServoController sendVal={sendMessage} connectedDevice={connectedDevice}/>
      <SensorDataVisualize sensorData={sensorData} />
      <View style={{margin: 15}}>
        <Text style={{color: 'yellow', fontSize: 10, textAlign: 'center'}}>
          {`Log: ${recvText.toString()}`}
        </Text>
      </View>
    </ScrollView>
  );
}
