/*
 * funzione di servizio per stampare il contenuto di un vettore, utile a scopo di debug. codice acquisito qui:
 * http://www.compago.it/manuali/33-programmazione/350-print-arrays-or-object-in-javascript.htmlhttp://www.compago.it/manuali/33-programmazione/350-print-arrays-or-object-in-javascript.html
 * esempio d'uso:
 * e.innerHTML = print_r(vettore);
*/

function print_r(o,level,max) {
  var output = "";
  if(!level) level = 0;
  var padding = "";
  for(var j=0;j<level+1;j++) padding += "    ";
  if(!max) max = 10;
  if(level==max) return padding + "Max level ["+level+"] reached\n";
  if(typeof(o) == 'object') { 
    for(var item in o) {
      var value = o[item];
      if(typeof(value) == 'object') { 
        output += padding + "[" + item + "] => Array\n";
        output += print_r(value,level+1,max);
      } else {
        output += padding + "[" + item + "] => \"" + value + "\"\n";
      }
    }
  } else { 
    output = "("+typeof(o)+") => "+o;
  }
  return output;
}

/* funzione elementare di servizio, utile a scopo di debug */

function putContent(content,elementId) {
    var e = document.getElementById(elementId);
    e.innerHTML = content;
}

function gestioneGrafici(velox) {

// preparazione del vettore globale che contiene i dati da rappresentare nella canvas 
	eventi = new Array;

	xCanvas = document.getElementById('graficoX');
	yCanvas = document.getElementById('graficoY');
	zCanvas = document.getElementById('graficoZ');
	ctx = xCanvas.getContext('2d');
	cty = yCanvas.getContext('2d');
	ctz = zCanvas.getContext('2d');

	ajaxGet("http://localhost:8000",graph,0,velox);
}

// routine di gestione della canvas

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

	ctx.beginPath();
	cty.beginPath();
	ctz.beginPath();
	for (var i=0;i<eventi.length;i++) {
		var coord = eventi[i].split(" ");
		if (coord.length==4) {
   		ctx.lineTo((tempoFinale - coord[0])/velox,50+Number(coord[1]));
   		cty.lineTo((tempoFinale - coord[0])/velox,50+Number(coord[2]));
   		ctz.lineTo((tempoFinale - coord[0])/velox,-245+50+Number(coord[3]));
		}
	}
	ctx.stroke();
	cty.stroke();
	ctz.stroke();

// acquisizione ricorsiva di nuovi dati
	ajaxGet("http://localhost:8000",graph,tempoFinale,velox);
}
