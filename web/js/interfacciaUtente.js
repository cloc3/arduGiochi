var rigeneraGrafici= function(nGrafici) {

	delete window.vettoreMin
	delete window.vettoreMax
	delete window.numeroOrdinate
	delete window.numeroCanali
	delete window.coloreCanali
	delete window.direzioneCanali
	numeroGrafici=nGrafici
	var finestraTemporale = 10000000; // tempo necessario ad un impulso per attraversare la finestra, in millisecondi
	gestioneGrafici(finestraTemporale/600,numeroGrafici);
}

var divisori = function(nOrdinate) {
	var divisoriBassi = [1]
	var divisoriAlti = [nOrdinate]
	var maxDiv = nOrdinate/2
	i=1
	for (var div=2;div<maxDiv;div++){
		nFrattoDiv = Math.floor(nOrdinate/div)
		if (nOrdinate%div == 0) {
			divisoriBassi[i]=div
			divisoriAlti[i++]=nFrattoDiv
		}	
		maxDiv=nFrattoDiv
	}

	if (divisoriBassi[divisoriBassi.length-1]==divisoriAlti[divisoriAlti.length-1]) divisoriAlti.pop()
	return divisoriAlti.concat(divisoriBassi.reverse())
}

var invertiDirezione = function(canale) {
	if (direzioneCanali[canale]=="rtl") direzioneCanali[canale]="ltr"
	else direzioneCanali[canale]="rtl"
}

var creaListaDirezioni = function(el) {
	if (el.childElementCount!=0) return // controllo necessario per evitare gli effetti di bubbling, dovuti alla presenza di due onmouseover annidati 
	contenuto = 'cambiaDirezione<ul class="menu">'
	for (var canale=0;canale<numeroCanali;canale++) {
			contenuto+=''+
			'<li class="menu" onmouseover="invertiDirezione('+canale+')">'+
				'<a href="#" target="blank">'+
					'canale '+(canale+1)+
				'</a>'+
			'</li>'
	}
	contenuto+='</ul>'
	el.innerHTML=contenuto
}

var creaLista = function(el, indice, testo) {
		var nuovaVoce=document.createElement("li")
		nuovaVoce.setAttribute("class","menu")
		nuovaVoce.setAttribute("onmouseover","rigeneraGrafici('"+indice+"')")
		nuovaVoce.innerHTML=
			'<a href="" target="blank">'+
				indice + " "+testo +
			'</a>'
		el.appendChild(nuovaVoce)
}

var controlloNumeroGrafici = function(el) {
	if (el.childElementCount!=0) return // controllo necessario per evitare gli effetti di bubbling, dovuti alla presenza di due onmouseover annidati 
	var opzioni = divisori(numeroGrafici*numeroOrdinate)
	el.innerHTML="scegli il numero dei grafici"
	var sottoElenco=document.createElement("ul")
	sottoElenco.setAttribute("class","menu")
	for (var indice in opzioni) creaLista(sottoElenco,opzioni[indice],"grafici")
	el.appendChild(sottoElenco)
}

var start_e_stop = function(el) {
	if (el.childElementCount!=0) return // controllo necessario per evitare gli effetti di bubbling, dovuti alla presenza di due onmouseover annidati 
	if (fermaAcquisizione) {
		fermaAcquisizione=false
		el.innerHTML="Stop"
		avvio()
		document.getElementById("tendinaGrafici").style.display="none"
		document.getElementById("tendinaDirezioni").style.display="none"
	}
	else {
		fermaAcquisizione=true
		el.innerHTML="Start"
		document.getElementById("tendinaGrafici").style.display="block"
		document.getElementById("tendinaDirezioni").style.display="block"
	}
}
