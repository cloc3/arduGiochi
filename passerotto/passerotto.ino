/*
	skietch per una fotoresistenza e un led.	
	Quando la fotoresistenza viene oscurata, il led pulsa ad alta frequenza,
	come il cuore di un passerotto in un pugno.
*/

#define LED 13                // LED collegato al pin digitale 13
#define fotoResistenza 0
#define ciclo 800

int luce;
int freq;
int buio;
int step;
int i;

void setup()
{
	pinMode(LED, OUTPUT);       // imposta il pin digitale come output
	Serial.begin(115200);
}

void loop()
{
		//delay(5);
		luce = analogRead(fotoResistenza);
		Serial.println(luce);
		buio = 950 - luce;
		freq = 1 + buio / 30;
		step = ciclo / freq;
		if ( buio <= 0) {
			digitalWrite(LED, HIGH);
			delay(5);
			digitalWrite(LED,LOW);
			delay(ciclo -5);
		} else {
			for (i = 0;i <= freq; i++) {
				digitalWrite(LED, HIGH);
				delay(5);
				digitalWrite(LED, LOW);
				delay(step - 5);
			}
		}
}
