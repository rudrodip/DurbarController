import React from "react";
import {
    TouchableOpacity,
    Button,
    View
} from "react-native";
import { styles } from "../../Styles/styles";

export default function ConnectButton(props){
    return (
    <View style={styles.rowView}>
        <TouchableOpacity style={{ width: 100 }}>
            {!props.isConnected ? (
            <Button
                title="Connect"
                onPress={() => {
                props.scanDevices();
                }}
                disabled={false}
                color='#06AED5'
            />
            ) : (
            <Button
                title="Disonnect"
                onPress={() => {
                props.disconnectDevice();
                }}
                disabled={false}
                color='#086788'
            />
            )}
        </TouchableOpacity>
    </View>
    )
}