// Remplir le menu avec les types de pokémon
let ul = document.querySelector('#liste-types')
for (let type of types) {
	let li = document.createElement("li")
	li.innerHTML = `<a href="type.html?id=${type['nom']}"><img id="type" src="img/${type['img']}"> </a>`
	ul.appendChild(li)
}

// Renvoie le pokémon en fontion de l'URL
function get_pokemon(data) {
	let queryString = window.location.search
	let urlParams = new URLSearchParams(queryString)
	let id = urlParams.get('id')
	for (let pokemon of data) {
		if (pokemon['nom'] === id) {
			return pokemon
		}
	}
}

// Renvoie une chaîne de caractères avec chaque type de pokémon
// et un lien vers sa page
function format_types(types) {
	let str = ""
	let i = 0
	for (let type of types) {
		str += `<a href="type.html?id=${pokemon['type'][i]}"><img id="poke" src="img/${type}" height="40px"> </a> `
		i += 1
	}
	return str
}

// Renvoie une chaîne de caractères avec chaque pokémon
// et un lien vers sa page
function format_evolutions(evolutions) {
	let queryString = window.location.search
	let urlParams = new URLSearchParams(queryString)
	let id = urlParams.get('id')
	str = ""
	let i = 0
	for (let evolution of evolutions) {
		if (pokemon['evolutions'][i] === id) {
			str += `<div class="actuel"><a class="actuel" href="pokemon.html?id=${pokemon['evolutions'][i]}"><img src="img/${evolution}"> <p>${pokemon['evolutions'][i]}</p></a> </div>`
		}
		else {
			str += `<div class="autre"><a class="autre" href="pokemon.html?id=${pokemon['evolutions'][i]}"><img src="img/${evolution}"> <p>${pokemon['evolutions'][i]}</p></a> </div>` 
		}
		i += 1
	}
	return str
}

//Barre de recherche
function rechercher_pokemon() {
	resultat.textContent=""
	let barre = document.querySelector('#barre_pokemon').value.toLowerCase().trim()
	let flag = false
	for (let pokemon of data) {
		let flag_type = false
		for (let type of pokemon.type) {
			if (barre === type.toLowerCase()) {
				flag_type = true
			}
		}
		if (barre === pokemon.nom.toLowerCase() || barre === pokemon.numéro || barre === pokemon.numéro.substring(1) || barre === pokemon.taille || barre === pokemon.poids || barre === pokemon.nom || flag_type === true){
			resultat.innerHTML += `<a href="pokemon.html?id=${pokemon['nom']}"> ${pokemon['numéro']} ${pokemon['nom']} <img id="gif" src="img/${pokemon['gif']}"></a>`
			flag = true
		}
	}	
	if (flag === false) {
		resultat.innerHTML = `<img src="img/aucun.png" height="100px"> Aucun Pokémon trouvé `
	}
	titreresultat.removeAttribute("hidden")
}

let titreresultat = document.querySelector("#titreresultat")
let resultat = document.querySelector(".resultat")
let bouton = document.querySelector('#bouton_pokemon')
bouton.addEventListener('click',rechercher_pokemon)




// Remplir les informations sur le pokemon
let pokemon = get_pokemon(data)
document.querySelector("title").textContent += pokemon['nom']
document.querySelector("h1").textContent = pokemon['nom'] 
document.querySelector("p#description").textContent = pokemon["description"]
document.querySelector("div#image img").setAttribute("src", "img/" + pokemon["png"])
document.querySelector("#taille").innerHTML = `Taille <img src="img/taille.png" height="20px"> : <br> ${pokemon['taille']}`
document.querySelector("#poids").innerHTML = `Poids <img src="img/poids.png" height="20px"> : <br> ${pokemon['poids']}`
document.querySelector("#noms-en").innerHTML = `Nom anglais <img src="img/drapeau-an.png" height="20px"> : <br> ${pokemon['nom_en']}`
document.querySelector("#noms-ja").innerHTML = `Nom japonais <img src="img/drapeau-ja.png" height="20px"> : <br>${pokemon['nom_ja'][1]} (${pokemon['nom_ja'][0]})`
document.querySelector("#types").innerHTML = format_types(pokemon["typeimg"])
document.querySelector("#evolutions").innerHTML = format_evolutions(pokemon["evolutionspng"])


if (pokemon.type.length === 1){
	for (let type of types) {
		if (pokemon['type'][0] === type['nom']) {
			document.querySelector('body').style.background = `center/cover url(img/${type['fond'][0]}) fixed`
		}
	}
} else{
	let liste= []
	let type2 = ""
	for (let type of types) {
		if (pokemon['type'][0] === type['nom']) {
			liste.push(`center/cover url(img/${type['fond'][1]}) fixed`)
		}
		if (pokemon['type'][1] === type['nom']){
			liste.push(`center/cover url(img/${type['fond'][2]}) fixed`)
			type2 = type['fond'][2]
		}
	} if (liste[0] === `center/cover url(img/${type2}) fixed`) {
		document.querySelector('body').style.background = `${liste[0]}, ${liste[1]}`
	} else {
		document.querySelector('body').style.background = `${liste[1]}, ${liste[0]}`
	}
}
