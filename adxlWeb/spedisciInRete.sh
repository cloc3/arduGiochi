#!/bin/bash

	read req file proto
	timestamp=$(date +%s)
	# la risposta deve contenere un header per indurre il browser di includere il contenuto della risposta in una pagina web.
	echo -e "HTTP/1.1 200 OK\r\nContent-Type: text/html; charset=utf-8\r\nAccess-Control-Allow-Origin: *\r\nKeep-Alive: timeout=0, max=100\r\nConnection: keep-alive\r\nTimestamp: ${timestamp}\r\n\r\n"
	head -n4 <&5|sort -r & echo 4 >&5 # Prima leggere e poi scrivere
