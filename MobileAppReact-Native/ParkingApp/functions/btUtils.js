import base64 from "react-native-base64"

const UART = "6E400001-B5A3-F393-E0A9-E50E24DCCA9E";
const UARTRX = "6E400002-B5A3-F393-E0A9-E50E24DCCA9E";

export const onSendMessage = (manager, connection, deviceId, message) => {
    console.log("click")
    
    if (connection) {
        const encodeMessage = base64.encode(message);
        connection.discoverAllServicesAndCharacteristics().then((char) => {
            console.log("character:", char.id)
            console.log("devId:",deviceId)
            manager.writeCharacteristicWithoutResponseForDevice(deviceId, UART, UARTRX, encodeMessage)
        })
    }
}