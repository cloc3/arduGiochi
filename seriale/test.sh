#!/bin/bash

exec 5<> /dev/arduino
stringa="$1"
echo "aspetto un po'"
sleep 5

echo "adesso provo"
for i in 1 2 3; do {
	head -n3 <&5 & echo -e "${stringa} $i" >&5
	}
done
exec 5<&-
