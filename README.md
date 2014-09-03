dueAccelerometri
==========

----
Questo branch contiene software cerca di adattare gli sketch del branch condensatori alla scheda ethernet per Arduino:
http://arduino.cc/en/Main/ArduinoEthernetShield

---

fasi di sviluppo:
	1. estrazione variabili: sketch capace di leggere l'header della richiesta, analizzare la prima riga, estrarre le coppie chiave valore eventualmente incluse nell'header e restituirle al client
	2. monitorWeb: sketch completo, che può rispondere sia a richieste provenienti dalla porta seriale, sia a richieste provenienti da web.
			le librerie di monitorWeb sono state riviste in modo da risultare indipendenti dal main. 
