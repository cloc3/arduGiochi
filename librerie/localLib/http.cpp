#include <Arduino.h>
#include <Ethernet.h>
#include <http.h>
#define MAXLINE 512
#define	 MAXL MAXWORD -1

struct coppieChVal catasta[MAXPARAMETRI];
struct parametriGet _pGet, *pGet = &_pGet;
struct stringa _riga, *riga = &_riga;
struct stringa _header, *header = &_header;
struct cercaChiave _comando, *comando = &_comando;

char	contenutoHeader[MAXLINE];
char	_stringa[MAXLINE];
//char *h = header; // non ancora utilizzato. Può tornare utile per passare le linee di header successive alla prima.

boolean digit2int( int cifra, int *n) {
	if ((cifra >= '0') && (cifra <= '9')) {
		*n = *n*10 + cifra -'0';
	} else {
		return false;
	}
	return true;
}

stringa *eventoSeriale() {
	riga->stato = false;
	static char *p;
	riga = getline((char*)"?",2);
	p = riga->stringa + 1;
	while (!riga->stato) {
		if (Serial.available()) {
			*p = Serial.read();
			if (*p++ == '\n') {
				*--p='\0';
				riga->l = p - riga->stringa +1;
				riga->stato = true;
				return riga;
			}
		}
	}
}

boolean leggiIntero(coppieChVal *parametro) {
	int _n; int *n = &_n;
	boolean datoValido = true;
	char cifra;
	char *p = parametro->valore;
	_n = 0;
	while ((cifra = *p++) != '\0' && datoValido) {
		digit2int(cifra, n);
	}
	if (datoValido) {
		parametro->numero = *n;
		return true;
	}
	else return false;
}

stringa *getline(char *inputText, int lim) {
	char c;
	char *p;
	p=_stringa;
	while (--lim>0 && (c = *inputText++) != '\n') *p++ = c;
	if (c == '\n') *p++ = '\n';
	*p='\0';
	riga->stringa = _stringa;
	riga->l = p - _stringa;
	return riga;
}

stringa *letturaHeader(EthernetClient client) {
	char c;
	int lim = MAXLINE;
	char *p; p=contenutoHeader;
	while (client.connected()) {
		if (client.available()) {
			if (--lim>0 && (c = client.read()) != EOF) {
				*p++ = c;
				*p='\0';
				if ( *(p-3) == (c = *(p-1)) && c == '\n') {
					header->stringa = contenutoHeader;
					header->l = p - contenutoHeader;
					return header;
				}
			}
		}
	}
}

parametriGet *cercaParametri(char *s, int lim, char formato) {
	pGet->indice = catasta;
	pGet->catasta = catasta;
	char	c;
	char	*ps; //puntatore di stringa
	char	*pk; //puntatore della catasta
	ps = s;
	while (--lim>0 && (c = *ps++) != '?');
	while (lim>0) {
		pk = pGet->indice->chiave;
		if (pGet->indice - catasta < MAXPARAMETRI) {
			while (--lim>0 && (c = *ps++) != '=') if (pk -pGet->indice->chiave < MAXL) *(pk++) = c;
			*pk='\0';
			if (pk > pGet->indice->chiave) {
				pk=pGet->indice->valore;
				while (--lim>0 && (c = *ps++) != '&') if (pk -pGet->indice->valore < MAXL) *pk++ = c;
				*pk='\0';
				if (formato == 'I') leggiIntero(pGet->indice);
			}
			pGet->indice++;
			continue;
		}
		pGet->l = pGet->indice - catasta -1;
		return pGet;
	}
	pGet->l = pGet->indice - pGet->catasta -1;
	return pGet;
}

cercaChiave *cercaComando(parametriGet *pGet, char chiave) {
	pGet->indice = pGet->catasta -1;
	while (pGet->indice++ - pGet->catasta < pGet->l) {
		if (*pGet->indice->chiave == chiave) {
			comando->nome = pGet->indice;
			comando->trovato = true;
			return comando;
		}
	}
	comando->trovato = false;
	return comando;
}
