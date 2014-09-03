#include <Arduino.h>

#define ALIMENTAZIONE 13
#define CR1 1
#define CR0 0
#define CR2 2
#define INGRESSO 3

#define RITARDO 5

struct evento {
	unsigned long marcaTempo;
	int cr0,cr1,cr2;
	char str[30];					// stringa destinata alla rappresentazione dei dati in formato carattere: non eccedere con le dimensioni
};

struct evento *treCondensatori();
