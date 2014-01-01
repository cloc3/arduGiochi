#include <Arduino.h>

boolean digit2int( int *cifra, int *numeroCicliRichiesti ) {
        if ((*cifra >= '0') && (*cifra <= '9')) {
                *numeroCicliRichiesti = (*numeroCicliRichiesti)*10 + *cifra -'0';
        } else {
                return false;
        }
        return true;
}

boolean attendiStringaNumerica(int *numeroCicliRichiesti, boolean *corsoLettura) {
        static boolean inizioLettura,datoValido;
        static int *cifra;

        inizioLettura=false;
        *corsoLettura=true;
        datoValido=true;

  while (Serial.available()) {
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
