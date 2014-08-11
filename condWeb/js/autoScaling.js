var confronto = function(a,b,selettore) {
	if (selettore == "min") return foo = a < b ?  true  :  false
	if (selettore == "max")	return foo = a > b ?  true  :  false
}

var somma = function (vettore) {
	return vettore.reduce(function(prev,curr,index,array){
 		return prev+curr[1]+curr[2]+curr[3]
	},0)
}

var ricalcoloEstremi = function (vettore,selettore) {
	this.cambiaFunzione=function(selezione) {
		if (selezione == "min") return {"funzione":Math.min,"init":[0,1024,1,"min"]}
		else if (selezione == "max") return {"funzione":Math.max,"init":[0,-1024,1,"max"]}
	}
	return vettore.reduce(function(prev,curr,index,array){
		tempo = curr.shift()
 		var test=this.cambiaFunzione(selettore).funzione.apply(null,[prev[1]].concat(curr))
		curr.unshift(tempo)
 		if (test == prev[1])	return [prev[0],test,1,this.cambiaFunzione(selettore).init[3]]
		else 									return [curr[0],test,1,this.cambiaFunzione(selettore).init[3]]
	}, this.cambiaFunzione(selettore).init)
}

var min = new Array(0,1024,0,"min")
var max = new Array(0,-1024,0,"max")

function gestioneGrafici(densita) {

// preparazione del vettore globale che contiene i dati da rappresentare nella canvas 
	vettoreEventi = new Array;

// preaparazione delle canvas
	var xCanvas = document.getElementById('graficoX');
	ctx = xCanvas.getContext('2d');
	h=ctx.canvas.height/2
	w=ctx.canvas.width

	ajaxGet(document.URL.slice(0,-1)+":8000",graph,Number(densita));
}

function graph(content,densita) {

// acquisizione dei dati e aggiornamento del vettore vettoreEventi.
	content = content.substr(1,content.length-2)
	var nuoviEventi = content.split("\n");
	for (var i in nuoviEventi) {
		var evento=nuoviEventi[i].split(" ")
		for (var j in evento) evento[j]=Number(evento[j])
		vettoreEventi = [evento].concat(vettoreEventi)
		// ricerca di eventuali eventi esterni agli estremi correnti, per un evenutale ricalcolo della scala
		for ( var ctrl of [max,min] ) {
			for (var canale in evento) {
				if (canale >0) {
					if (confronto(evento[canale],ctrl[1],ctrl[3])) {
						//if (ctrl[3]=="min")alert("ole")
						ctrl[0]=evento[0]
						if (evento[canale]!=0) ctrl[1]=evento[canale]
						ctrl[2]=1
					}
				}
			}
		}
	}

// rimozione da vettoreEventi dei valori in eccesso
// (troppo lontani nel passato, quindi fuori dalla canvas).
	var l = vettoreEventi.length - 1
	var ultimoMarcatempo = vettoreEventi[0][0];
	while ((ultimoMarcatempo - vettoreEventi[l-=1][0])/densita > ctx.canvas.width) {
		vettoreEventi.pop()
	}

// controllo per limitare il ricalcolo della scala solo ai casi in cui è necessario

	if (vettoreEventi[0][0] >= min[0]) min = ricalcoloEstremi(vettoreEventi,"min")
	if (vettoreEventi[0][0] >= max[0]) max = ricalcoloEstremi(vettoreEventi,"max")
	if ( min[2] || max[2]) {
		medio = somma(vettoreEventi)/(3*vettoreEventi.length)
		scala = 1.4*h/(max[1]-min[1])
		min[2] = 0
		max[2] = 0
		document.getElementById("commento").innerHTML="<p style='font-size:large;text-align:center'>min = "+min[1]+", max = "+max[1]+"</p>"
	}

// pulizia e successivo ridisegno della canvas.
	ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);

// traccia del primo condensatore.
	ctx.strokeStyle="red";

	ctx.beginPath();
	for (var evento in vettoreEventi) {
		//per dispetto, facciamo viaggiare il canale 1 all'indietro.
   	ctx.lineTo(w+((vettoreEventi[evento][0] - vettoreEventi[0][0])/densita),h+(vettoreEventi[evento][1]-medio)*scala)
	}
	ctx.stroke();

// traccia del secondo condensatore.
	ctx.strokeStyle="#8ac007";

	ctx.beginPath();
	for (var evento in vettoreEventi) {
   	ctx.lineTo((-vettoreEventi[evento][0] + vettoreEventi[0][0])/densita,h+(vettoreEventi[evento][2]-medio)*scala);
	}

	ctx.stroke();

// traccia del terzo condensatore.
	ctx.strokeStyle="blue";

	ctx.beginPath();
	for (var evento in vettoreEventi) {
  	ctx.lineTo((-vettoreEventi[evento][0] + vettoreEventi[0][0])/densita,h+(vettoreEventi[evento][3]-medio)*scala);
	}
	ctx.stroke();

	ctx.strokeStyle="grey";

	ctx.beginPath();
	for (var evento in vettoreEventi) {
  	ctx.lineTo((-vettoreEventi[evento][0] + vettoreEventi[0][0])/densita,h+(max[1]-medio)*scala);
	}
	ctx.stroke();

	ctx.strokeStyle="orange";

	ctx.beginPath();
	for (var evento in vettoreEventi) {
  	ctx.lineTo((-vettoreEventi[evento][0] + vettoreEventi[0][0])/densita,h+(min[1]-medio)*scala);
	}

	ctx.stroke();

	ctx.strokeStyle="black";

	ctx.beginPath();
	for (var evento in vettoreEventi) {
  	ctx.lineTo((-vettoreEventi[evento][0] + vettoreEventi[0][0])/densita,h);
	}
	ctx.stroke();


// acquisizione ricorsiva di nuovi dati
	ajaxGet(document.URL.slice(0,-1)+":8000",graph,densita);
}
