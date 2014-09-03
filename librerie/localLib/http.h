#include <Arduino.h>
#include <Ethernet.h>

struct stringa {
	char *stringa;
	int l;
	boolean stato;
};

#define MAXWORD 6 // attenzione a non eccedere la memoria di arduino!!!
struct coppieChVal {
	char	chiave[MAXWORD];
	char	valore[MAXWORD];
	int		numero;
};

#define MAXPARAMETRI 5

struct parametriGet {
	coppieChVal *catasta;
	coppieChVal *indice;
	int l;
};

struct cercaChiave {
	coppieChVal *nome;
	boolean	trovato;
};

stringa *getline(char*, int);
stringa *letturaHeader(EthernetClient);
parametriGet *cercaParametri(char*, int, char);
cercaChiave *cercaComando(parametriGet*, char);
stringa *eventoSeriale();
boolean leggiIntero(coppieChVal*);
