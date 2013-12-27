#include <Arduino.h>

int main(void)
{
	init();

#if defined(USBCON)
	USBDevice.attach();
#endif
	
	setup();
    
	for (;;) {
		loop();
		if (serialEventRun) serialEventRun();
	}
        
	return 0;
}

#line 1 "build/lucciola.ino"
// This is just a mockup sketch for test scons works

#define PIN_LED 13 

void setup(void)
{
  pinMode(PIN_LED, OUTPUT);
	Serial.begin(112500);
}

void loop(void)
{
  digitalWrite(PIN_LED, HIGH);
	Serial.println("Acceso");
  delay(1000);
  digitalWrite(PIN_LED, LOW);
	Serial.println("Spento");
  delay(1000);
}

/* vim: set sw=2 et: */
