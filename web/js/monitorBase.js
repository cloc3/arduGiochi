function gestioneGrafici(densita) {

// preparazione del vettore globale che contiene i dati da rappresentare nella canvas 
	stringaEventi = new Array;

// preaparazione delle canvas
	xCanvas = document.getElementById('graficoX');
	ctx = xCanvas.getContext('2d');

	ajaxGet(document.URL.slice(0,-1)+":8000",graph,densita);
}

function graph(content,densita) {

// acquisizione dei dati e aggiornamento del vettore stringaEventi.
	var nuoviEventi = content.split("\n");
	nuoviEventi.pop();
	var ultimoMarcatempo = (nuoviEventi[nuoviEventi.length-1].split(" "))[0]
	stringaEventi=nuoviEventi.concat(stringaEventi);

// rimozione dal vettore stringaEventi dei dati in eccesso
// (troppo lontani nel passato, quindi fuori dalla canvas).
	var l = stringaEventi.length;
		while ((ultimoMarcatempo - stringaEventi[l=l-1].split(" ")[0])/densita > ctx.canvas.width) stringaEventi.pop()

// pulizia e successivo ridisegno della canvas.
	ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);

// traccia del primo condensatore.
	ctx.strokeStyle="red";

	ctx.beginPath();
	for (var i=0;i<stringaEventi.length;i++) {
		var coord = stringaEventi[i].split(" ");
		if (coord.length==4) {
   		ctx.lineTo((ultimoMarcatempo - coord[0])/densita,-300+Number(coord[1]));
		}
	}
	ctx.stroke();

// traccia del secondo condensatore.
	ctx.strokeStyle="#8ac007";

	ctx.beginPath();
	for (var i=0;i<stringaEventi.length;i++) {
		var coord = stringaEventi[i].split(" ");
		if (coord.length==4) {
   		ctx.lineTo((ultimoMarcatempo - coord[0])/densita,-300+Number(coord[2]));
		}
	}

	ctx.stroke();

// traccia del terzo condensatore.
	ctx.strokeStyle="blue";

	ctx.beginPath();
	for (var i=0;i<stringaEventi.length;i++) {
		var coord = stringaEventi[i].split(" ");
		if (coord.length==4) {
   		ctx.lineTo((ultimoMarcatempo - coord[0])/densita,-300+Number(coord[3]));
		}
	}
	ctx.stroke();

// acquisizione ricorsiva di nuovi dati
	ajaxGet(document.URL.slice(0,-1)+":8000",graph,densita);
}
