#!/bin/bash
handle_req()
{
	#read req file proto #inutile con netcat6
	timestamp=$(date +%s)
	echo -e "HTTP/1.1 200 OK\r\nContent-Type: text/html\r\nAccess-Control-Allow-Origin: *\r\nKeep-Alive: timeout=2, max=100\r\nConnection: Keep-Alive\r\nTimestamp: ${timestamp}\r\n\r\n"
	head -n 150 /dev/arduino
	#echo "1" >/dev/arduino
}
typeset -fx handle_req
while true;do nc -l -p 8000 -e handle_req  -q1;done
