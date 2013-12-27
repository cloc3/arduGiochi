#!/bin/sh
timestamp=$(date +%s)
echo "HTTP/1.1 200 OK\r\nContent-Type:text/html\r\nAccess-Control-Allow-Origin: *\r\nKeep-Alive: timeout=2,max=100\r\nConnection: Keep-Alive\r\nTimestamp: ${timestamp}\r\n\r\n"
