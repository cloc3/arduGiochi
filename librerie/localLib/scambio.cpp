#include "Arduino.h"

void scambia(int *a, int *b) {
	//char str[200];
	int tmp;
	Serial.print("dentro prima: a=");
	Serial.print(*a);
	Serial.print(" ,b=");
	Serial.println(*b);
	//sprintf(str,"dentro prima: a=%d, b=%d\n",*a,*b);
	//Serial.write(str);
	tmp=*a;
	*a=*b;
	*b=tmp;
	Serial.print("dentro prima: a=");
	Serial.print(*a);
	Serial.print(" ,b=");
	Serial.println(*b);
	//sprintf(str,"dentro dopo: a=%d, b=%d\n",*a,*b);
	//Serial.write(str);
}
