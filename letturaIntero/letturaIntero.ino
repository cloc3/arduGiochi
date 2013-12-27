/*
	test porta seriale
	http://arduino.cc/en/Tutorial/SerialEvent
 */

#include <letturaIntero.h>

void setup() {
  Serial.begin(115200);
}

void loop() {
	static char str[40];
	if (attendiStringa(intero,corsoLettura)) {
		if (! *corsoLettura) {
			sprintf(str,"intero = %d\n",*intero);
			Serial.print(str);
			*intero=0;
		}
	}
}
