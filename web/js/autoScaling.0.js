var colore = function() {

    var colore = '#';
    var hex = '0123456789ABCDEF'.split('');
     for(var i=0; i<=5; i++){
       colore +=  hex[Math.round(Math.random() * 16)];
     }

		return colore
    return Math.round(Math.random()*0x1000000);
   }

var confronto = function(a,b,selettore) {
	if (selettore == "min") return foo = a < b ?  true  :  false
	if (selettore == "max")	return foo = a > b ?  true  :  false
}

var somma = function (vettore) {
	return vettore.reduce(function(prev,curr,index,array){
		curr_0=curr.shift()
		tot=0
		for (n of curr) tot+=n
		curr.unshift(curr_0)
 		return prev+tot
	},0)
}

var ricalcoloEstremi = function(vettore,selettore) {
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

min = new Array(0,1024,0,"min")
max = new Array(0,-1024,0,"max")
Min = new Array(0,1024,0,"min")
Max = new Array(0,-1024,0,"max")
vettoreMedio = new Array()
vettoreScala= new Array()

function gestioneGrafici(densita,numeroGrafici) {

// preparazione del vettore globale che contiene i dati da rappresentare nella canvas 
	vettoreEventi = new Array;
	vettoreTracce = new Array;

// preparazione delle canvas
	var areaDiLAvoro = document.getElementById("areaDiLavoro");
	areaDiLavoro.innerHTML=""
	var commentDiv = document.createElement("div");
	var testDiv = document.createElement("div");
	var vettoreCanvas = new Array();
	var vettoreDiv = new Array();
	vettoreContext = new Array();
	vettoreCanvasSize = new Array();
	h = Math.floor(4/numeroGrafici)*100
	var canvasHeight = ""+h+"px"
	canvasHeight = "400px"
	w = 600
	canvasWidth = ""+w+"px"
	for (var nG=0; nG<numeroGrafici;nG++) {
		vettoreDiv[nG]=document.createElement("div")
		vettoreDiv[nG].setAttribute("margin-top","30px")
		vettoreDiv[nG].setAttribute("left","80px")
		vettoreDiv[nG].setAttribute("z-index","2")

		vettoreDiv[nG].innerHTML="asse "+nG
		vettoreCanvas[nG]=document.createElement("canvas")
		vettoreContext[nG]=vettoreCanvas[nG].getContext('2d')
		vettoreCanvas[nG].id="canvas["+nG+"]"
		vettoreCanvasSize[nG] = new Object()
		vettoreCanvasSize[nG].width=vettoreCanvas[nG].width
		vettoreCanvas[nG].setAttribute("width",canvasWidth)
		vettoreCanvas[nG].setAttribute("height",canvasHeight)
		vettoreCanvas[nG].setAttribute("height",canvasHeight)
		vettoreCanvasSize[nG].h=Number(vettoreCanvas[nG].height)/2
		vettoreCanvas[nG].style.border="solid thin black"
		vettoreCanvas[nG].style.margin="1em auto"
		areaDiLavoro.appendChild(vettoreDiv[nG])
		vettoreDiv[nG].appendChild(vettoreCanvas[nG])
	}
	var commentDiv = document.createElement("div");
	var testDiv = document.createElement("div");
	var maxDiv = document.createElement("div");
	var minDiv = document.createElement("div");
	commentDiv.id="commento"
	testDiv.id="test"
	maxDiv.id="max"
	minDiv.id="min"
	areaDiLavoro.appendChild(commentDiv)
	areaDiLavoro.appendChild(testDiv)
	areaDiLavoro.appendChild(minDiv)
	areaDiLavoro.appendChild(maxDiv)
	if (!window.vettoreMin) { vettoreMin = new Array();for (var nG=0; nG<numeroGrafici; nG++) vettoreMin=[min].concat(vettoreMin)}
	if (!window.vettoreMax) { vettoreMax = new Array();for (var nG=0; nG<numeroGrafici; nG++) vettoreMax=[max].concat(vettoreMax)}

// acquisizione da remoto e successiva riproduzione grafica dei dati
	ajaxGet(document.URL.slice(0,-1)+":8000",graph,Number(densita),numeroGrafici);
}

function graph(content,densita,numeroGrafici) {

// acquisizione dei dati e aggiornamento del vettore vettoreEventi.
	content = content.substr(1,content.length-2)
	var nuoviEventi = content.split("\n");
	if (!window.numeroOrdinate) numeroOrdinate=nuoviEventi[0].split(" ").length -1
	if (!window.numeroSensori)	numeroSensori=Math.floor(numeroOrdinate/numeroGrafici)
	if (!window.coloriSensori)	{ coloriSensori = new Array(); for ( var nS=0; nS<numeroSensori; nS++) coloriSensori[nS] = colore()}
	for (var nE in nuoviEventi) {
		var evento=nuoviEventi[nE].split(" ")
		for (var i in evento) evento[i]=Number(evento[i])
		eventoSingoloSensore=evento
		tempo = eventoSingoloSensore.shift()
		for (var nG = 0; nG < numeroGrafici; nG++) {
			var eventoSingoloSensore=evento.splice(0,numeroSensori)
			// ricerca di eventuali eventi esterni agli estremi correnti, per un eventuale ricalcolo della scala
			for ( var ctrl of [vettoreMin[nG],vettoreMax[nG]] ) {
				for (var canale in eventoSingoloSensore) {
					if (confronto(eventoSingoloSensore[canale],ctrl[1],ctrl[3])) {
						ctrl[0]=tempo
						ctrl[1]=eventoSingoloSensore[canale]
						ctrl[2]=1
					}
				}
			} // fine ciclo cu ctrl
			eventoSingoloSensore.splice(0,0,tempo)
			if (!window.vettoreTracce[nG]) vettoreTracce[nG] = new Array()
			vettoreTracce[nG] = [eventoSingoloSensore].concat(vettoreTracce[nG])
		} // fine primo ciclo su nG
	} //fine ciclo su nE 
	for ( nG in vettoreTracce) {
// rimozione da vettoreTracce[nG] dei valori in eccesso
// (troppo lontani nel passato, quindi fuori dalla canvas).
		var l = vettoreTracce[nG].length
		var marcatempoFinale = vettoreTracce[nG][0][0]
		while ((marcatempoFinale - vettoreTracce[nG][l-=1][0])/densita > w)	vettoreTracce[nG].pop()
		//while ((marcatempoFinale - vettoreTracce[nG][l-=1][0])/densita > vettoreCanvasSize[nG].width)	vettoreTracce[nG].pop()

		if (marcatempoFinale > vettoreMin[nG][0]) vettoreMin[nG] = ricalcoloEstremi(vettoreTracce[nG],"min")
		if (marcatempoFinale > vettoreMax[nG][0]) vettoreMax[nG] = ricalcoloEstremi(vettoreTracce[nG],"max")
		if ( vettoreMin[nG][2] || vettoreMax[nG][2]) {
			vettoreMedio[nG] = somma(vettoreTracce[nG])/(numeroSensori*vettoreTracce[nG].length)
			vettoreScala[nG] = 1.4*h/(vettoreMax[nG][1]-vettoreMin[nG][1])
			vettoreMin[nG][2] = 0
			vettoreMax[nG][2] = 0
			document.getElementById("commento").innerHTML="<p style='font-size:large;text-align:center'>vettoreMin = "+JSON.stringify(vettoreMin[nG][1])+", vettoreMax = "+JSON.stringify(vettoreMax[nG][1])+"</p>"
		}
	} //fine secondo ciclo su nG

// pulizia e successivo ridisegno della canvas.
	for ( riquadro of vettoreContext) {
		riquadro.clearRect(0,0,riquadro.canvas.width,riquadro.canvas.height);
	} 

//	disegno tracce
	for (var nS=1; nS<numeroSensori+1; nS++) {
		for (var nG in vettoreTracce) {
			vettoreContext[nG].strokeStyle=coloriSensori[nS-1]

			vettoreContext[nG].beginPath()
			for (var punto of vettoreTracce[nG]) {
				vettoreContext[nG].lineTo((marcatempoFinale-punto[0])/densita,h-(punto[nS]-vettoreMedio[nG])*vettoreScala[nG])
			}
			vettoreContext[nG].stroke()
		}
	} //fine ciclo su nS

// tracciatura estremi
	for (var estremo of [vettoreMin[nG],vettoreMax[nG]]) {
		for (var nG in vettoreTracce) {
			if (estremo[3]=="min") vettoreContext[nG].strokeStyle="violet"
			if (estremo[3]=="max") vettoreContext[nG].strokeStyle="yellow"

			vettoreContext[nG].beginPath()
			ordinata = h-(estremo[1]-vettoreMedio[nG])*vettoreScala[nG]
			for (var punto of vettoreTracce[nG]) {
				vettoreContext[nG].lineTo((marcatempoFinale-punto[0])/densita,ordinata)
			}
			vettoreContext[nG].stroke()
		}
	}

// tracciatura asse centrale
	for (var nG in vettoreTracce) {
		vettoreContext[nG].strokeStyle="black"
		vettoreContext[nG].beginPath()
		for (var punto of vettoreTracce[nG]) {
			vettoreContext[nG].lineTo((marcatempoFinale-punto[0])/densita,h)
		}
		vettoreContext[nG].stroke()
	}

	ajaxGet(document.URL.slice(0,-1)+":8000",graph,densita,numeroGrafici);
}
