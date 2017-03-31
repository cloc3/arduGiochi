#include <Arduino.h>
#include <Wire.h>

void writeTo(int device, byte address, byte val) {
	Wire.beginTransmission(device);	// avvio della comunicazione i2c, tra l'accelerometro e arduino
	Wire.write(address);						// impostazione dell'indirizzo fisico del registro su cui si desidera effettuare la scrittura.
	Wire.write(val);								// invio del valore da scrivere
	Wire.endTransmission();					// chiusura della comunicazione
}

void readFrom(int device, byte address, int num, byte buff[]) {
	Wire.beginTransmission(device);	// avvio della comunicazione i2c, tra l'accelerometro e arduino
	Wire.write(address);						// impostazione dell'indirizzo fisico del registro su cui si desidera effettuare la lettura
	Wire.endTransmission();					// chiusura della comunicazione

	Wire.beginTransmission(device);	// riapertura della comunicazione (l'accelerometro ha ricevuto l'indirizzo del registro da leggere,
																	// ma non è ancora stata effettuata alcuna lettura
	Wire.requestFrom(device, num);	// richiesta di leggere 6 bytes, a partire dall'indirizzo comunicato in precedenza

	int i = 0;
	while(Wire.available())					// attesa della lettura
	{ 
		buff[i] = Wire.read();				// ricezione dei byte richiesti, uno alla volta
		i++;
	}
  Wire.endTransmission();					// chiusura della comunicazione
}

