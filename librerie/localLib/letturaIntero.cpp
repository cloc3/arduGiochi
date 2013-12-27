#include <Arduino.h>
//char str[40];

boolean digit2int( int* cifra, int* intero ) {
	if ((*cifra >= '0') && (*cifra <= '9')) {
		*intero = (*intero)*10 + *cifra -'0';
	} else {
		return false;
	}
	return true;
}

boolean attendiStringa(int *intero, boolean *corsoLettura) {
	static boolean inizioLettura,datoValido;
	static int *cifra;

	inizioLettura=false;
	*corsoLettura=true;
	datoValido=true;

  while (Serial.available())  {
		inizioLettura=true;
		*cifra = Serial.read();
		if (*corsoLettura) {
			if (*cifra == '\n') *corsoLettura=false;
			else if (datoValido == true)
				datoValido=digit2int(cifra,intero);
		}
	}
	return inizioLettura && datoValido;
}
