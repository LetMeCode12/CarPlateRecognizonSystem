#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <limits.h>
#include <errno.h>
#include <PubSubClient.h>
#include <WiFi.h>


BLEServer *pServer = NULL;
BLECharacteristic * pTxCharacteristic;
bool deviceConnected = false;
bool oldDeviceConnected = false;
uint8_t txValue = 0;

//Replace with your network credentials
const char* ssid = "Bridge";
const char* password = "raspberry4349";

// Add your MQTT Broker IP address:
const char* mqtt_server = "192.168.1.1";

String stateGate = "";

WiFiClient espClient;
PubSubClient client(espClient);

IPAddress local_IP(192, 168, 1, 102);
IPAddress gateway(192, 168, 1, 1);
IPAddress subnet(255, 255, 0, 0);
 

#define SERVICE_UUID           "6E400001-B5A3-F393-E0A9-E50E24DCCA9E" // UART service UUID
#define CHARACTERISTIC_UUID_RX "6E400002-B5A3-F393-E0A9-E50E24DCCA9E"
#define CHARACTERISTIC_UUID_TX "6E400003-B5A3-F393-E0A9-E50E24DCCA9E"

#define IN1 33
#define IN2 32
#define IN3 26
#define IN4 25

void gateOpen(int dly){
  digitalWrite(IN1,HIGH);
  delay(dly);
  digitalWrite(IN1,LOW);
  digitalWrite(IN2,HIGH);
  delay(dly);
  digitalWrite(IN2,LOW);
  digitalWrite(IN3,HIGH);
  delay(dly);
  digitalWrite(IN3,LOW);
  digitalWrite(IN4,HIGH);
  delay(dly);
  digitalWrite(IN4,LOW);
}

void gateClose(int dly){
  digitalWrite(IN4,HIGH);
  delay(dly);
  digitalWrite(IN4,LOW);
  digitalWrite(IN3,HIGH);
  delay(dly);
  digitalWrite(IN3,LOW);
  digitalWrite(IN2,HIGH);
  delay(dly);
  digitalWrite(IN2,LOW);
  digitalWrite(IN1,HIGH);
  delay(dly);
  digitalWrite(IN1,LOW);
}

void gateController(){
  if(stateGate=="open"){
    gateOpen(2);
  }
  if(stateGate=="close"){
    gateClose(2);
  }  
}

class MyServerCallbacks: public BLEServerCallbacks {
    void onConnect(BLEServer* pServer) {
      deviceConnected = true;
    };

    void onDisconnect(BLEServer* pServer) {
      deviceConnected = false;
    }
};

void sendMessage(char* message){
  if (deviceConnected) {
    for(int i =0; i<(strlen(message)); i++){
      Serial.println(i);
      txValue= message[i];
      pTxCharacteristic->setValue(&txValue, 1);
      pTxCharacteristic->notify();
      delay(10); // bluetooth stack will go into congestion, if too many packets are sent
    }
    txValue=0;
  }
  
}




class MyCallbacks: public BLECharacteristicCallbacks {
    void onWrite(BLECharacteristic *pCharacteristic) {
      std::string rxValue = pCharacteristic->getValue();
      String Mess= "";
      if (rxValue.length() > 0) {
        Serial.println("*********");
        Serial.print("Received Value: ");
        for (int i = 0; i < rxValue.length(); i++){
          Mess += rxValue[i];
//          Serial.print(rxValue[i]);
        }
        if(Mess == "open"){
           client.publish("GATE001/Gate","Open"); 
           Serial.println("Weszło");
        }
        //sendMessage("Test");
        Serial.println(Mess);
        Serial.println("*********");
        pServer->getAdvertising()->start();
      }
    }
};


void setup() {
  pinMode(IN1,OUTPUT);
  pinMode(IN2,OUTPUT);
  pinMode(IN3,OUTPUT);
  pinMode(IN4,OUTPUT);
  
  if (!WiFi.config(local_IP, gateway,subnet)) {
    Serial.println("STA Failed to configure");
  }
  
  Serial.begin(115200);

  // Create the BLE Device
  BLEDevice::init("GATE");

  // Create the BLE Server
  pServer = BLEDevice::createServer();
  pServer->setCallbacks(new MyServerCallbacks());

  // Create the BLE Service
  BLEService *pService = pServer->createService(SERVICE_UUID);

  // Create a BLE Characteristic
  pTxCharacteristic = pService->createCharacteristic(
										CHARACTERISTIC_UUID_TX,
										BLECharacteristic::PROPERTY_NOTIFY
									);
                      
  pTxCharacteristic->addDescriptor(new BLE2902());

  BLECharacteristic * pRxCharacteristic = pService->createCharacteristic(
											 CHARACTERISTIC_UUID_RX,
											BLECharacteristic::PROPERTY_WRITE
										);

  pRxCharacteristic->setCallbacks(new MyCallbacks());

  // Start the service
  pService->start();

  // Start advertising
  pServer->getAdvertising()->start();
  Serial.println("Waiting a client connection to notify...");


 // Wi-Fi connection
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
  
  Serial.print(WiFi.localIP());
  //Connect mqtt
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);

  
}

void callback(char* topic, byte* message, unsigned int length) {
  Serial.print("Message arrived on topic: ");
  Serial.print(topic);
  Serial.print(". Message: ");
  String messageTemp;
  
  for (int i = 0; i < length; i++) {
    Serial.print((char)message[i]);
    messageTemp += (char)message[i];
  }
  Serial.println();

  if (String(topic) == "GATE001/State") {
      if(messageTemp=="1"){
        stateGate="open";      
      }else if(messageTemp=="3"){
        stateGate="close";
  
      }else{
        stateGate="";
      }
  }
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    if (client.connect("GATE001GateClient")) {
      Serial.println("connected");
      client.subscribe("GATE001/#");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      delay(5000);
    }
  }
}

void loop() {

  gateController();
    // disconnecting
    if (!deviceConnected && oldDeviceConnected) {
        delay(500); // give the bluetooth stack the chance to get things ready
        pServer->startAdvertising(); // restart advertising
        Serial.println("start advertising");
        oldDeviceConnected = deviceConnected;
    }
    // connecting
    if (deviceConnected && !oldDeviceConnected) {
        oldDeviceConnected = deviceConnected;
    }

    if (!client.connected()) {
    reconnect();
    }
    client.loop();
}
