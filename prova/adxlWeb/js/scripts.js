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

function gestioneGrafici() {

	eventi = new Array;
	traslazione = 0;
	xCanvas = document.getElementById('graficoX');
	yCanvas = document.getElementById('graficoY');
	zCanvas = document.getElementById('graficoZ');
	ctx = xCanvas.getContext('2d');
	cty = yCanvas.getContext('2d');
	ctz = zCanvas.getContext('2d');
	ctx.fillStyle = "rgb(200,0,0)";
	cty.fillStyle = "rgb(0,200,0)";
	ctz.fillStyle = "rgb(0,0,200)";
	ajaxGet("http://localhost:8000",graph,"footer",0);
}

// routine di gestione della canvas

function graph(content,elementId,tempoFinale) {
	var e = document.getElementById(elementId)
	var e = document.getElementById("footer")
	var nuoviEventi = content.split("\n");
	var tempoFinalePrecedente = tempoFinale;
	nuoviEventi.pop();
	var tempoFinale = (nuoviEventi[nuoviEventi.length-1].split(" "))[0]
	eventi=nuoviEventi.concat(eventi);
	var n;
	if ( n = eventi.length ) {
		while ((tempoFinale - eventi[n=n-1].split(" ")[0])/50000 >600) eventi.pop()
	}


	ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
	cty.clearRect(0,0,cty.canvas.width,cty.canvas.height);
	ctz.clearRect(0,0,ctz.canvas.width,ctz.canvas.height);
	ctx.beginPath(); 
	cty.beginPath(); 
	ctz.beginPath(); 
	for (var i=0;i<eventi.length;i++) {
		var coord = eventi[i].split(" ");
		if (coord.length==4) {
   		ctx.lineTo((tempoFinale - coord[0])/50000,50+Number(coord[1]));
   		cty.lineTo((tempoFinale - coord[0])/50000,50+Number(coord[2]));
   		ctz.lineTo((tempoFinale - coord[0])/50000,-245+50+Number(coord[3]));
		}
	}
	ctx.stroke();
	cty.stroke();
	ctz.stroke();
	ajaxGet("http://localhost:8000",graph,"footer",tempoFinale);
}

