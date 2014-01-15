arduGiochi
==========

accelerometro.manuale legge una successione finita di lunghezza arbitraria di dati.

si utilizza da terminale con:

$ cat /dev/arduino &
$ echo 12 >/dev/arduino
$ pkill -9 cat

l'output è emesso in bit: +/- 2^10 da sistemare la sensibilità e l'unità di misura.
il formato dell'output è:

time x y z
