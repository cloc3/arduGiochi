/*
	test porta seriale
	http://arduino.cc/en/Tutorial/SerialEvent
 */
#include "scambio.h"

char str[200];
void setup() {
  Serial.begin(115200);
}

/*
void scambia(int *a, int *b) {
	int tmp;
	tmp=*a;
	*a=*b;
	*b=tmp;
}
*/

void loop() {
	int *a;
	int aa;
	int *b;
	int bb;

	a=&aa;
	b=&bb;
	*a=34;
	*b=45;

	if (Serial.available()) {
		Serial.read();
		sprintf(str,"\nprima: a=%d, b=%d\n",*a,*b);
		Serial.write(str);
		scambia(a,b);
		sprintf(str,"dopo: a=%d, b=%d\n",*a,*b);
		Serial.write(str);
	}
}
