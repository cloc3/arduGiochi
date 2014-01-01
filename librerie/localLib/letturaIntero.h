#include <Arduino.h>

int _numeroCicliRichiesti=0;
int *numeroCicliRichiesti=&_numeroCicliRichiesti;

boolean _corsoLettura=false;
boolean *corsoLettura=&_corsoLettura;

boolean attendiStringaNumerica(int *,boolean *);
boolean digit2int(int *,int *);
