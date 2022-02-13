"use strict";

let nbVotantTotal;
let nbSiegeDispo;
let nbListe;
let QE;

document.querySelector("#form-input").addEventListener("submit", (e) => {
	e.preventDefault();

	nbVotantTotal = document.querySelector("#nbVotant").value;
	nbSiegeDispo = document.querySelector("#nbSiege").value;
	nbListe = document.querySelector("#nbList").value;

	if (!nbVotantTotal || !nbSiegeDispo || !nbListe) {
		alert("Un ou plusieurs champs vident");
		return;
	}

	QE = nbVotantTotal / nbSiegeDispo;
	calculer();
});

const startCode = 65;

function getKeyByValue(object, value) {
	return Object.keys(object).find((key) => object[key] === value);
}

let calculer = () => {
	let char;

	let nbVoixDistribue = 0;
	let nbSiegeTotal = 0;

	let nbVoix = {};
	let nbSiege = {};

	//init nombre de voix
	//nbSiege au QE

	let correct = false;
	while (!correct) {
		nbVoixDistribue = 0;
		nbSiegeTotal = 0;

		nbVoix = {};
		nbSiege = {};

		let nb;
		for (let i = 0; i < nbListe; i++) {
			char = String.fromCharCode(65 + i);

			nb = prompt("Nombre de voix pour la liste " + char);
			if (nb == null) {
				return;
			}
			nbVoix[char] = parseInt(nb);
			nbVoixDistribue += nbVoix[char];

			//répartition au QE
			nbSiege[char] = Math.floor(nbVoix[char] / QE);
			nbSiegeTotal += nbSiege[char];
		}

		if (nbVotantTotal < nbVoixDistribue) {
			alert("Erreur : le nombre de voix distribuée est supérieur au nombre de votant total");
		} else {
			correct = true;
		}
	}

	let calcul = {};
	while (nbSiegeTotal < nbSiegeDispo) {
		for (let i = 0; i < nbListe; i++) {
			char = String.fromCharCode(65 + i);
			calcul[char] = nbVoix[char] - nbSiege[char] * QE;
		}

		let max = Math.max(...Object.values(calcul));
		let letter = getKeyByValue(calcul, max);

		nbSiege[letter]++;

		nbSiegeTotal = 0;
		for (let i = 0; i < nbListe; i++) {
			char = String.fromCharCode(65 + i);
			nbSiegeTotal += nbSiege[char];
		}
	}

	let resultat = "Le résultat est :\n";
	for (let key in nbSiege) {
		resultat += "- Liste " + key + " : " + nbSiege[key] + "\n";
	}

	//remove la \n
	resultat = resultat.slice(0, -1);
	alert(resultat);
};
