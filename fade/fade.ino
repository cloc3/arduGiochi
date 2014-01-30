#define LUCCIOLA 9 //Il canale 9 può operare in modalità pwm

int bit=5;    //incremento ciclico
int lumen=0; //valore corrente della luminosità

void setup() {
	pinMode(LUCCIOLA,OUTPUT);
}

void loop() {
	analogWrite(LUCCIOLA,lumen+=bit);
	if (lumen%255==0) bit*=-1;
	delay(30);
}
