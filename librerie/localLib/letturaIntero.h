#include <Arduino.h>

int _intero;
int *intero=&_intero;
boolean _corsoLettura=false;
boolean *corsoLettura=&_corsoLettura;
boolean attendiStringa(int *,boolean *);
boolean digit2int(int *,int *);
