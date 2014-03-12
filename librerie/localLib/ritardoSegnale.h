#include <Arduino.h>

#define DEVICE0 (0x53)		// indirizzo fisico per l'accelerometro in modalità i2c, con SDO=0
#define DEVICE1 (0x1D)		// indirizzo fisico per l'accelerometro in modalità i2c, con SDO=1

#define TO_READ (6)				// lunghezza in byte dello spazio dati (due byte per ciascun asse)

#define SOGLIA 10					// scarto dalla media per riconoscere un evento

byte buff[TO_READ] ;			// preparazione dello spazio di memoria dedicato all'acquisizione dei dati
char str[512];						// stringa destinata alla rappresentazione dei dati in formato carattere

struct accelerazione {
	int x, y, z;
};

struct evento {
	unsigned long marcaTempo;
	struct accelerazione acc0, acc1;
};

struct evento _lettura, *lettura = &_lettura;

void readFrom(int device, byte address, int num, byte buff[]);
void writeTo(int device, byte address, byte val);
