import cv2
import requests
import numpy as np
import sys
import imutils
import plateDetector
import warnings
import paho.mqtt.client as paho
import re
from difflib import SequenceMatcher


broker="192.168.1.1"
client= paho.Client("GATE001PiClient")

client.connect(broker)
client.loop_start()

class PlateFinder:

    def __init__(self):
        warnings.simplefilter("ignore",DeprecationWarning)
        self.bytes=bytes()

    def plateFinder(self,IP):
        plates=[]
        r = requests.get('http://'+IP+'/stream', stream=True, timeout=5)
        if(r.status_code == 200):
            bytes = self.bytes
            for chunk in r.iter_content(chunk_size=4096):
                bytes += chunk 
                a = bytes.find(b'\xff\xd8')
                b = bytes.find(b'\xff\xd9')
                if a != -1 and b != -1:
                    jpg = bytes[a:b+2]
                    bytes = bytes[b+2:]
                    img = np.fromstring(jpg, dtype=np.uint8)
                    video = cv2.imdecode(img, cv2.IMREAD_COLOR)
                    plate=plateDetector.PlateDetector.detectPlate(video)
                    if plate!=None:
                        plates.append(plate)
                        while len(plates)>1:
                            finPlate=""
                            p1 = re.sub('[\W_]+', '', plates[1])
                            p2 = re.sub('[\W_]+', '', plates[0])
                            if SequenceMatcher(None, p2, p1).ratio() > 0.7:
                                finPlate = p1
                            if len(finPlate)>=4:
                               return finPlate
                               
                            p1=None
                            p2=None
                            plates=[];    
                        
                    #cv2.imshow('video', video)
                    if cv2.waitKey(1) == 27:
                        exit(0)       
                        break
             
        else:
            print("Received unexpected status code {}".format(r.status_code))
while True:
  
    Plate = None
    try:
        Plate = PlateFinder().plateFinder("192.168.1.101")
    except:
        print("Nie można połączyć")

    if Plate:
        print("odczytano!: ",Plate)
        data=requests.post("http://192.168.1.1:8080/car/access/"+Plate)
        if data.status_code==200:
            print("przyszlo: "+data.text)
            if data.text == "true":
                print("Otwieranie")
                client.publish("GATE001/Gate","Open")
    Plate = None
    if cv2.waitKey(1) == 27:
        exit(0)       
        break