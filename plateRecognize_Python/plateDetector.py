import cv2
import numpy as np
import imutils
import pytesseract
import re

class PlateDetector:
    #wykomentować na linux
    pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

    def detectPlate(video):
        video = cv2.resize(video,(1280 ,720))
        gray = cv2.cvtColor(video,cv2.COLOR_BGR2GRAY)
        grayFiltered = gray
        grayFiltered = cv2.bilateralFilter(grayFiltered,13,100,0) 
        
        edged = cv2.Canny(grayFiltered,20,200)
        contours = cv2.findContours(edged.copy(),cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)
        contours = imutils.grab_contours(contours)
        contours = sorted(contours,key=cv2.contourArea, reverse = True)[:10]
        screenCnt = []
        cv2.imshow('video', video)
        
        for c in contours:
            peri = cv2.arcLength(c, True)
            approx = cv2.approxPolyDP(c, 0.018 * peri, True)
           
            if len(approx) == 4 and cv2.isContourConvex(approx):
                screenCnt = approx
                break
    
        if len(screenCnt) == 0:
            detected = 0
        else:
            detected = 1
     
        if detected == 1:
            cv2.drawContours(video, [screenCnt], -1, (255, 0, 255), 2)
    
            mask = np.zeros(gray.shape,np.uint8)
            cv2.drawContours(mask,[screenCnt],0,255,-1)
                      
            (x, y) = np.where(mask == 255)
            (topx, topy) = (np.min(x), np.min(y))
            (bottomx, bottomy) = (np.max(x), np.max(y))
            Cropped = gray[topx:bottomx+1, topy:bottomy+1]
           
            text = pytesseract.image_to_string(Cropped, config='--psm 11')
            cv2.imshow('video', video)
            if len(text)>=4:
                text=text.replace(" ", "").upper().replace('O',"0")
                return text

             

x=21
cnt=0
allCnt=0
while False:    
    
    photo = cv2.imread("C:\\Users\\Norbert\\Desktop\\Testy\\Noc\\"+str(x)+".jpg",cv2.IMREAD_COLOR) 
    findPlate =  re.sub('[\W_]+', '', str(PlateDetector.detectPlate(photo)))
    print(findPlate)
   
    if findPlate.find("CZNLR34") != -1 or findPlate.find("PGN425HM") != -1 or findPlate.find("CZNFK01") != -1:
        cnt+=1

    if cv2.waitKey(1) == 27:
        exit(0)
        break       
    x+=1
    allCnt+=1
    print("AllPhotos:"+str(allCnt))
    print("DetectPhotos:"+str(cnt))
    if x > 40:
        break

                    

                   