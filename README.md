accelerometro
==========

----
Questo branch contiene il software relativo alla sperimentazione didattica in tema di sismologia del Liceo Paschini,
in collaborazione con il Centro di Ricerche Sismologiche di Udine (http://www.crs.inogs.it), che è una sezione staccata
dell'OGS - Istituto Nazionale di Oceanografia e di Geofisica Sperimentale (http://www.inogs.it).

L'unità didattica associata a questa sperimentazione è documentata all'indirizzo internet seguente:
http://www.cloc3.net/dokuwiki/doku.php/progettoSisifo

----

In questo branch sono contenuti:

 - Il file ADXL345.pdf # contiene le specifiche dell'accelerometro adxl345.
 - La cartella sketchAdxl345 # contiene tre sketch per arduino applicabili 
 
ketchartella ./accelerometro :DXL345.pdf

Contiene due sketch.
Lo sketch accelerometro.adafruit è il programma di test distribuito da Adafruit.

Lo scketch arduGiochi è un programma che permette di ottenere una successione finita di letture
dell'accelerometro ADXL345.

Si utilizza da terminale con:
$ n = 4 # numero di letture desiderate
$ head -n $n /dev/arduino &
$ echo 4 >/dev/arduino

Il formato generato dallo sketch arduGiochi è:

time x y z

---
cartella ./adxlWeb

Contiene una applicazione web per il monitoraggio dell'accelerometro e un server web in linguaggio bash, basato su netcat, per la trasmissione dei dati su internet.
Testato con konqueror (webkit), midori (webkit) e firefox.
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
 - lo sketch arduGiochi.ino è caricato e attivo (lanciare ad esempio scons upload);
 - il servizio ncWebServer.sh è attivo.

Il file adxlWeb/adxl345.mp4 contiene un video dimostrativo.

----
cartella ./librerie

Contiene la libreria che gestisce l'input-output dalla porta seriale.
Per utilizzarla con scons, impostare la variabile d'ambiente EXTRA_LIB.

----
Le cartelle ./seriale e ./letturaIntero contengono sketch provvisori di test dell'input output seriale.
