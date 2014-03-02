function gestioneGrafici(velox) {

// preparazione del vettore globale che contiene i dati da rappresentare nella canvas 
	eventi = new Array;

// preaparazione delle canvas
	xCanvas = document.getElementById('graficoX');
	yCanvas = document.getElementById('graficoY');
	zCanvas = document.getElementById('graficoZ');
	ctx = xCanvas.getContext('2d');
	cty = yCanvas.getContext('2d');
	ctz = zCanvas.getContext('2d');

	ajaxGet(document.URL.slice(0,-1)+":8000",graph,0,velox);
}

function graph(content,tempoFinale,velox) {

	var tempoFinalePrecedente = tempoFinale;

// acquisizione dei dati e aggiornamento del vettore eventi.
	var nuoviEventi = content.split("\n");
	nuoviEventi.pop();
	var tempoFinale = (nuoviEventi[nuoviEventi.length-1].split(" "))[0]
	eventi=nuoviEventi.concat(eventi);

// rimozione dal vettore eventi dei dati in eccesso
// (troppo lontani nel passato, quindi fuori dalla canvas).
	var l = eventi.length;
		while ((tempoFinale - eventi[l=l-1].split(" ")[0])/velox > ctx.canvas.width) eventi.pop()

// pulizia e successivo ridisegno della canvas.
	ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
	cty.clearRect(0,0,cty.canvas.width,cty.canvas.height);
	ctz.clearRect(0,0,ctz.canvas.width,ctz.canvas.height);

	ctx.strokeStyle="red";
	cty.strokeStyle="red";
	ctz.strokeStyle="red";

	ctx.beginPath();
	cty.beginPath();
	ctz.beginPath();
	for (var i=0;i<eventi.length;i++) {
		var coord = eventi[i].split(" ");
		if (coord.length==7) {
   		ctx.lineTo((tempoFinale - coord[0])/velox,50+Number(coord[1]));
   		cty.lineTo((tempoFinale - coord[0])/velox,50+Number(coord[2]));
   		ctz.lineTo((tempoFinale - coord[0])/velox,-245+50+Number(coord[3]));
		}
	}
	ctx.stroke();
	cty.stroke();
	ctz.stroke();

	ctx.strokeStyle="#8ac007";
	cty.strokeStyle="#8ac007";
	ctz.strokeStyle="#8ac007";

	ctx.beginPath();
	cty.beginPath();
	ctz.beginPath();
	for (var i=0;i<eventi.length;i++) {
		var coord = eventi[i].split(" ");
		if (coord.length==7) {
   		ctx.lineTo((tempoFinale - coord[0])/velox,50+Number(coord[4]));
   		cty.lineTo((tempoFinale - coord[0])/velox,50+Number(coord[5]));
   		ctz.lineTo((tempoFinale - coord[0])/velox,-245+50+Number(coord[6]));
		}
	}
	ctx.stroke();
	cty.stroke();
	ctz.stroke();

// acquisizione ricorsiva di nuovi dati
	ajaxGet(document.URL.slice(0,-1)+":8000",graph,0,velox);
}
