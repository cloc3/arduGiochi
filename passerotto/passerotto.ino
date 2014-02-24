/*
	sketch per una fotoresistenza e un led.	
	Quando la fotoresistenza viene oscurata, il led pulsa ad alta frequenza,
	come il cuore di un passerotto in un pugno.
*/

#define LED 13								// LED collegato al pin digitale 13
#define fotoResistenza 0			// indirizzo fisico del canale di lettura
#define ciclo 800							// intervallo di acquisizione del dato
#define MAXINPUT 850					// valore del canale di input in condizioni di massima illuminazione (minima resistenza)
#define MININPUT 60						// valore del canale di input in condizioni di minima illuminazione (massima resistenza)
#define MAXFREQ 25						// massima frequenza di lampeggio
#define MINFREQ 1							// minima frequenza di lampeggio
#define intensita 40					// tempo di accensione della lampadina (fissare inferiore a ciclo/MAXFREQ)

int luce;
int freq;
int unoSuM;
int lampeggio;

void pulsazione(int lampeggiamento) {
	digitalWrite(LED, HIGH);
	delay(intensita);
	digitalWrite(LED, LOW);
	delay(lampeggiamento - intensita);
}

void setup()
{
	pinMode(LED, OUTPUT);       // imposta il pin digitale come output
	Serial.begin(115200);
	unoSuM=(MAXINPUT - MININPUT)/(MAXFREQ-MINFREQ); // reciproco del coefficiente angolare di conversione tra intervallo di input e intervallo di frequenza
}

void loop()
{
	int indice;

	// lettura analogica
	luce = analogRead(fotoResistenza);
	freq = MAXFREQ - (luce - MININPUT)/unoSuM;

	// stampa di controllo via seriale
	Serial.print("luce = ");
	Serial.println(luce);
	Serial.print("frequenza = ");
	Serial.println(freq);

	// definizione della frequenza di lampeggiamento
	lampeggio = ciclo / freq;
	if ( freq < MINFREQ) {							// filtro per alta illuminazione
		lampeggio=ciclo; 
	} else if (freq > MAXFREQ ) {				// filtro per bassa illuminazione
		lampeggio=ciclo/MAXFREQ; 
	} else {
		lampeggio=ciclo/freq; 
	}

	// esecuzione del lampeggiamento
	for (indice = 0;indice < freq; indice++) {
		pulsazione(lampeggio);
	}
}
