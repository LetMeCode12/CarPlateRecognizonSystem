import React, { Component } from "react";
import { View, AsyncStorage, Button, StyleSheet, Dimensions } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { faBluetooth } from "@fortawesome/free-brands-svg-icons"
import { BleManager } from "react-native-ble-plx";
import { onSendMessage } from "../functions/btUtils";


const DevPrefix = "GATE";

class GatePanel extends Component {

    constructor(props) {
        super(props)
        this.state = {
            pressed: false,
            connected: false,
            readDevice: undefined,
            readDeviceId:undefined,
        }
        this.manager = new BleManager();
    }

    componentDidMount(){
        this.findDevice()
    }

    componentDidUpdate(prevProps,prevState){
        const {connected} = this.state;
        if(connected!==prevState.connected && !connected){
            console.log("Interval:",this.checkConnection)
            clearInterval(this.checkConnection)
            this.scanAndConnect()
        }
    }

    findDevice = () => {
        const subscription = this.manager.onStateChange((state) => {
            console.log("Statek:", state)
            if (state === 'PoweredOn') {
                this.scanAndConnect()
                subscription.remove();
            }
        }, true);
    }

    scanAndConnect = () => {
        this.manager.startDeviceScan(null, null, async (error, device) => {
            if (error) {
                console.log("error:", error);
                return
            }

            console.log("Devices:", device.name);

            if (device && device.name && device.name.startsWith(DevPrefix)) {
                console.log("Devices2:", device.name);
                this.manager.stopDeviceScan();

                this.setState({
                    readDeviceId:device.id,
                    readDevice: await this.manager.connectToDevice(device.id)
                }, () => {
                    console.log("Connection:", this.state.readDevice)
                    
                })

                this.checkConnection = setInterval(async()=>{
                        this.setState({
                            connected: await this.manager.isDeviceConnected(device.id)
                        },() => {
                            console.log("Connection2:", this.state.connected)
                            
                        })
                },1000)
            }
        });
    }

    onLogout = () => {
        const { history } = this.props;
        AsyncStorage.clear();
        history.push("/");
    }

    onOpen = () => {
        const {readDevice,connected,readDeviceId} = this.state;
        console.log("Open!")
        this.setState({
            pressed: true
        })
        if(readDevice && readDevice.id && connected && readDeviceId){
        onSendMessage(this.manager,readDevice,readDeviceId,"open")
        }
        setTimeout(() => {
            this.setState({
                pressed: false
            })
        }, 1000)
    }

    render() {
        const { pressed, connected } = this.state;
        return (
            <View style={styles.component}>
                <View style={styles.info}>
                    <FontAwesomeIcon icon={faBluetooth} size={35} color={connected ? "blue" : "gray"} />
                </View>
                <View style={styles.buttonArea}>
                    <View style={!pressed ? styles.button : styles.buttonPressed}>
                        <FontAwesomeIcon icon={faPowerOff} size={200} onPress={() => this.onOpen()} />
                    </View>
                </View>
                <View style={styles.logout}>
                    <Button title="Wyloguj" onPress={() => this.onLogout()} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    component: {
        height: Dimensions.get("window").height,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    buttonArea: {
        display: "flex",
        alignItems: "center",
    },
    button: {

    },
    buttonPressed: {
        backgroundColor: "#03adfc",
        borderRadius: 300,
    },
    info: {
        padding: 10
    }
})

export default GatePanel;
