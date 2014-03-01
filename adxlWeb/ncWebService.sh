#!/bin/bash

exec 5<>/dev/arduino  # apre la porta seriale in lettura e scrittura
sleep 3
typeset -fx handle_req
while  true;do nc -l -p 8000 -e ". ./spedisciInRete.sh" -q0;done # apre il servizio web
exec 5<&- # questo è il modo corretto di chiudere la porta seriale. Questo esempio è acerbo, e nasconde il comando dietro un loop infinito. Da correggere.
