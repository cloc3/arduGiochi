#include <Arduino.h>

// analizza il singolo carattere in ingresso, integra il numero di cicli o,
// se del caso, restituisce uno stato di errore
boolean digit2int( int *cifra, int *numeroCicliRichiesti ) {
	if ((*cifra >= '0') && (*cifra <= '9')) {
		*numeroCicliRichiesti = (*numeroCicliRichiesti)*10 + *cifra -'0';
	} else {
		return false;
	}
	return true;
}

// acquisisce e controlla il flusso in input dalla porta seriale
// per passare i singoli caratteri a digit2int
boolean attendiStringaNumerica(int *numeroCicliRichiesti, boolean *corsoLettura) {
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
				datoValido=digit2int(cifra,numeroCicliRichiesti);
		}
	}
	return inizioLettura && datoValido;
}
