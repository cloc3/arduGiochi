#include <Arduino.h>

int main(void)
{
	init();

#if defined(USBCON)
	USBDevice.attach();
#endif
	
	setup();
    
	for (;;) {
		loop();
		if (serialEventRun) serialEventRun();
	}
        
	return 0;
}

void setup();
void loop();
void writeTo(int device, byte address, byte val);
#line 1 "build/accelerometro.ino"
#include <letturaStringa.h>
#include <Wire.h>

#define DEVICE (0x53)    //ADXL345 device address
#define TO_READ (6)        //num of bytes we are going to read each time (two bytes for each axis)

byte buff[TO_READ] ;    //6 bytes buffer for saving data read from the device
char str[512];                      //string buffer to transform data before sending it to the serial port

void writeTo(int device, byte address, byte val) {
	Wire.beginTransmission(device); //start transmission to device 
	Wire.write(address);        // send register address
	Wire.write(val);        // send value to write
	Wire.endTransmission(); //end transmission
}

void readFrom(int device, byte address, int num, byte buff[]) {
	Wire.beginTransmission(device); //start transmission to device 
	Wire.write(address);        //sends address to read from
	Wire.endTransmission(); //end transmission

	Wire.beginTransmission(device); //start transmission to device (initiate again)
	Wire.requestFrom(device, num);    // request 6 bytes from device

	int i = 0;
	while(Wire.available())    //device may send less than requested (abnormal)
	{ 
		buff[i] = Wire.read(); // receive a byte
		i++;
	}
  Wire.endTransmission(); //end transmission
}

void setup()
{
	Wire.begin();        // join i2c bus (address optional for master)
	Serial.begin(115200);  // start serial for output

	//Turning on the ADXL345
	writeTo(DEVICE, 0x2D, 0);      
	writeTo(DEVICE, 0x2D, 16);
	writeTo(DEVICE, 0x31, 8);
	writeTo(DEVICE, 0x2D, 8);
}

void loop()
{
	int regAddress = 0x32;    //first axis-acceleration-data register on the ADXL345
	int i, x, y, z;

/*
	int serialBuffSize;
	char serialRead;
*/

	attendiStringa();
	if (stringaCompleta) {
		if (stringaDiInput == "azzeraCronometro") {
		for (int count=0;count<90;count++) {
			str[0]='\0';
		 	readFrom(DEVICE, regAddress, TO_READ, buff); //read the acceleration data from the ADXL345
			//each axis reading comes in 10 bit resolution, ie 2 bytes.  Least Significat Byte first!!
			//thus we are converting both bytes in to one int

			x = (((int)buff[1]) << 8) | buff[0];
			y = (((int)buff[3])<< 8) | buff[2];
			z = (((int)buff[5]) << 8) | buff[4];
	
			delay(25);
			sprintf(str, "%d %d %d", x, y, z);
			Serial.print(str);
			Serial.write(10);
		}
		while (Serial.available()>0)
			Serial.read();
	}
