/*
	howto di riferimento per la prograamzione dell'accelerometro:
	http://codeyoung.blogspot.it/2009/11/adxl345-accelerometer-breakout-board.html
	specifiche dell'accelerometro:
	http://www.sparkfun.com/datasheets/Sensors/Accelerometer/ADXL345.pdf
*/

#include <letturaIntero.h>
#include <Wire.h>

#define DEVICE (0x53)		// indirizzo fisico che identifica l'accelerometro
												// nella configurazione predisposta per scambiare dati con il protocollo i2c
#define TO_READ (6)			// dimensione del registro che contiene i dati (due bytes per ciascun asse) dell'accelerometro

byte buff[TO_READ] ;		// preparazione della memoria per ospitare la lettura dei dati
char str[512];					// preparazione di una stringa per comunicare la lettura sulla porta seriale

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

void setup()
{
	Wire.begin();										// impostazione del bus i2c
	Serial.begin(115200);						// impostazione della porta seriale

	//operazioni di accensione dell'accelerometro ADXL345
	writeTo(DEVICE, 0x2D, 0);      
	writeTo(DEVICE, 0x2D, 16);
	writeTo(DEVICE, 0x31, 0);				// questa configurazione seleziona il range +/-2g. impostare 8 per ottenere la massima risoluzione 4mg/LSB (da capire meglio)
	//writeTo(DEVICE, 0x31, 8);			// questa configurazione seleziona il range +/-2g. impostare 8 per ottenere la massima risoluzione 4mg/LSB (da capire meglio)
	writeTo(DEVICE, 0x2D, 8);
}

void loop()
{
	int regAddress = 0x32;					// indirizzo fisico del primo registro dati sull'accelerometro ADXL345
	int i, x, y, z;
	unsigned long time;

	if (attendiStringaNumerica(numeroCicliRichiesti,corsoLettura)) { // attende una richiesta di acquisizione
		if (! *corsoLettura) {
			for (int count=0;count<*numeroCicliRichiesti;count++) {
				str[0]='\0';
				time=micros();																// tempo dall'accensione di arduino, in microsecondi
	 			readFrom(DEVICE, regAddress, TO_READ, buff);	// lettura del campo dati sull'accelerometro ADXL345
				// per ciascun asse sono riservati 10 bit di precisione (più il segno?). Il primo byte contiene le cifre più significative
				// each axis reading comes in 10 bit resolution, ie 2 bytes. Least Significant Byte first!!
				// è necessario convertire i dati in variabili intere

				x = (((int)buff[1]) << 8) | buff[0];
				y = (((int)buff[3]) << 8) | buff[2];
				z = (((int)buff[5]) << 8) | buff[4];

				delay(1); // il ritardo consigliato da blogspot per il ripristino della comunicazione i2c è 15 millisecondi
									// la lettura delle specifiche lascia pensare che la comunicazione i2C sia molto più rapida:
									// dai 100 ai 400 KHz
									// ad occhio, con 5 millisecondo la risposta sembra ottima. Da studiare.
									// inoltre, tale velocità può essere abbassata ulteriormente implementando la comunicazione seriale SPI
				sprintf(str, "%lu %d %d %d\n",time, x, y, z);
				Serial.print(str);
			}
		*numeroCicliRichiesti=0;
		}
	}
}
