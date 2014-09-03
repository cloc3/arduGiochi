#include <Arduino.h>
#include <evento.h>

struct evento _presaDato, *presaDato = &_presaDato;

evento *treCondensatori() {
	presaDato->marcaTempo=micros();																// tempo corrente dall'accensione di arduino, in microsecondi
	presaDato->cr2=analogRead(CR2);
	presaDato->cr1=analogRead(CR1);
	presaDato->cr0=analogRead(CR0);

	if ( presaDato->cr1 > 550 ) {																	// mantiene la tensione del condensatore cr1 tra 450 mV e 550 mV
		digitalWrite(ALIMENTAZIONE,LOW);
	} else if ( presaDato->cr1 < 450) {
		digitalWrite(ALIMENTAZIONE,HIGH);
	}
	sprintf(presaDato->str,"%lu %d %d %d\n", presaDato->marcaTempo, presaDato->cr0, presaDato->cr1, presaDato->cr2);

	return presaDato;
}

