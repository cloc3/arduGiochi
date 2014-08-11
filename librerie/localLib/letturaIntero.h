#include <Arduino.h>

int _numeroCicliRichiesti;
int *numeroCicliRichiesti=&_numeroCicliRichiesti;

boolean _corsoLettura=false;
boolean *corsoLettura=&_corsoLettura;

boolean abilitaMisura(int *,boolean *);
boolean digit2int(int *,int *);
