dueAccelerometri
==========

----
Questo branch contiene software relativo alla sperimentazione didattica in tema di sismologia del Liceo Paschini,
in collaborazione con il Centro di Ricerche Sismologiche di Udine (http://www.crs.inogs.it), che è una sezione staccata
dell'OGS - Istituto Nazionale di Oceanografia e di Geofisica Sperimentale (http://www.inogs.it).

L'unità didattica associata a questa sperimentazione è documentata all'indirizzo internet seguente:
http://www.cloc3.net/dokuwiki/doku.php/progettoSisifo

----

Questo branch è specifico all'uso simultaneo di due accelerometri ADXL345.
Contenuti del branch:

 - file ADXL345.pdf # contiene le specifiche dell'accelerometro adxl345.
 - cartella sketchAdxl345 # contiene tre sketch per arduino applicabili.
 - cartella librerie # contiene le librerie degli sketch. 
 - cartella adxlWeb # contiene:
		a) ncWebService.sh: servizio, basato su netcat6, per redirigere il flusso di arduino verso una connessione ip/tcp.
		b) file index.html + cartelle di contorno: applicazione web per visualizzare un monitor dell'accelerometro
 - cartella passerotto # contiene lo sketch per utilizzare la fotoresistenza. Vedi il branch passerotto.

----

Informazioni sulla cartella dueAccelerometri:

 - sketchAdafruit # https://github.com/adafruit/Adafruit\_ADXL345 (per un singolo accelerometro)
 - acc2Guida #  http://codeyoung.blogspot.it/2009/11/adxl345-accelerometer-breakout-board.html
 - acc2ArduGiochi # sketch per l'applicazione monitor
 - ritardoSegnale # studio in fase di sviluppo per la rilevazione del ritardo nella rilevazione di un singolo segnale.
 - dueAccelerometri.ino # collegamento con funzioni di wrapper (selettore).
 - SConstruct # collegamento allo script arscons (https://github.com/suapapa/arscons) per la compilazione.

----

Come usare lo acc2ArduGiochi:

$ cd dueAccelerometri
$ ln -sf acc2ArduGiochi dueAccelerometri.ino # prepara il collegamento
$ scons upload
$ exec 5<>/dev/arduino #> rende disponibile la porta /dev/arduino in lettura e scrittura
$ head -n 80 </dev/arduino & echo -n 80 >/dev/arduino # stampa 80 letture consecutive dell'accelerometro.

Il formato dei dati prodotti dallo acc2ArduGiochi è:

time x0 y0 z0 x1 y1 z1

---
cartella ./adxlWeb

Contiene una applicazione web per il monitoraggio dell'accelerometro e un server web in linguaggio bash, basato su netcat, per la trasmissione dei dati su internet.
Testato con konqueror (webkit), midori (webkit), firefox e chromium-browser.
Non funziona con konqueror (khtml) e google-chrome.

Il servizio web è il programma ncWebServer.sh.
Gestisce in modo corretto la porta seriale, aprendo un descrittore di file dedicato, che consente una lettura ricorsiva fluida dell'accelerometro.
ncWebServer.sh distribuisce il flusso dei dati sulla porta 8000.
Per testare ncWebServer.sh eseguire:
$ echo|nc localhost 8000

Il file index.html gestisce il monitor grafico per la visualizzazione dei dati dell'accelerometro.
Rispetta lo standard html5, scambia dati con la tecnica ajax (script js/ajax.js) e utilizza le canvas per la visualizzazione dei grafici (js/index.js).

Per utilizzare il monitor, è sufficiente lanciare l'applicazione web, quando:
 - arduino è collegato attraverso la porta seriale alla macchina che gestisce il servizio web;
 - lo sketch acc2ArduGiochi è caricato e attivo su arduino;
 - il servizio ncWebServer.sh è attivo.

Il file adxlWeb/adxl345.mp4 contiene un video dimostrativo.

----
cartella ./librerie

Contiene una libreria che gestisce l'input-output dalla porta seriale.
Aggiunta la libreria con le funzioni di input output verso il sensore.
Per utilizzarla con scons, impostare la variabile d'ambiente EXTRA_LIB.

----
Le cartelle ./seriale e ./letturaIntero contengono sketch provvisori di test dell'input output seriale.
