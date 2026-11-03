//Barre de recherche
function rechercher_pokemon() {
	resultat.textContent=""
	let barre = document.querySelector('#barre_index').value.toLowerCase().trim()
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
let bouton = document.querySelector('#bouton_index')
bouton.addEventListener('click',rechercher_pokemon)


// Remplir le menu avec les types de pokémon

let ul = document.querySelector('#liste-types')
for (let type of types) {
    let li = document.createElement("li")
    li.innerHTML = `<a href="type.html?id=${type['nom']}"><img id="type" src="img/${type['img']}"></a>`
    ul.appendChild(li)
}

// Remplir la liste de pokemon avec le nom, le lien vers sa page et une image
ul = document.querySelector('#liste-pokemon')
for (let pokemon of data) {
    let li = document.createElement("li")
	if (pokemon.typeimg.length === 1) {
		li.innerHTML = `<a href="pokemon.html?id=${pokemon['nom']}"> ${pokemon['numéro']} ${pokemon['nom']} <img id="gif" src="img/${pokemon['gif']}"> <img id="type" src="img/${pokemon['typeimg'][0]}"></a>`
	}
	else{
		li.innerHTML = `<a href="pokemon.html?id=${pokemon['nom']}"> ${pokemon['numéro']} ${pokemon['nom']} <img id="gif" src="img/${pokemon['gif']}"> <img id="type" src="img/${pokemon['typeimg'][0]}"><img id="type" src="img/${pokemon['typeimg'][1]}"></a>`
	}
    ul.appendChild(li)
	}

// Afficher le pokemon en survol

function afficher(event) {
	let nom = event.target.textContent
	str = nom.substring(6,nom.length-2)
	for (let pokemon of data) {
		if (pokemon.nom === str.toString()) {
			image.innerHTML = `<div class="titre_pokemon_main">C'est ${pokemon['nom']} ! </div><img id="pokedex" src="img/${pokemon['png']}">`
		}
	}
}

function cacher(event) {
	let nom = event.target.textContent
	str = nom.substring(6,nom.length-2)
	for (let pokemon of data) {
		if (pokemon.nom === str.toString()) {
			image.innerHTML = `<div class="titre_pokemon_main">Quel est ce pokemon ? </div><img src="img/pokemon-mystere.png">`
		}
	}
}


//Tri
function afficherListe(liste) {
    let ul = document.querySelector('#liste-pokemon')
    ul.innerHTML = "" 
    for (let pokemon of liste) {
        let li = document.createElement("li")
		if (pokemon.typeimg.length === 1) {
			li.innerHTML = `<a href="pokemon.html?id=${pokemon['nom']}"> ${pokemon['numéro']} ${pokemon['nom']} <img id="gif" src="img/${pokemon['gif']}"> <img id="type" src="img/${pokemon['typeimg'][0]}"></a>`
		}
		else{
			li.innerHTML = `<a href="pokemon.html?id=${pokemon['nom']}"> ${pokemon['numéro']} ${pokemon['nom']} <img id="gif" src="img/${pokemon['gif']}"> <img id="type" src="img/${pokemon['typeimg'][0]}"><img id="type" src="img/${pokemon['typeimg'][1]}"></a>`
		}
        ul.appendChild(li)

        li.addEventListener('mouseenter', afficher)
        li.addEventListener('mouseleave', cacher)
    }
}

let btn_numero = document.querySelector("#tri-numéro")
btn_numero.addEventListener("click", triNumero)
let btn_az = document.querySelector("#tri-a-z")
btn_az.addEventListener("click", triAlphabetique)
let btn_type = document.querySelector("#tri-type")
btn_type.addEventListener("click", triType)

function triNumero() {
	for (let i = 0; i < data.length; i++) {
		for (let j = i + 1; j < data.length; j++) {
			if (data[i].numéro > data[j].numéro) {
				let temp = data[i]
				data[i] = data[j]
				data[j] = temp
			}
		}
	}

	afficherListe(data)
}

function triAlphabetique() {
	for (let i = 0; i < data.length; i++) {
		for (let j = i + 1; j < data.length; j++) {
			if (data[i].nom.localeCompare(data[j].nom, 'fr') > 0) {
				let temp = data[i]
				data[i] = data[j]
				data[j] = temp
			}
		}
	}

	afficherListe(data)
}

function triType() {
    for (let i = 0; i < data.length; i++) {
        for (let j = i + 1; j < data.length; j++) {
            if (data[i].type[0].localeCompare(data[j].type[0]) > 0) {
                let temp = data[i]
                data[i] = data[j]
                data[j] = temp
            }
        }
    }
    afficherListe(data)
}

let image = document.querySelector('.image_pokemon_main')
let liens = document.querySelectorAll('#liste-pokemon li')
for (let lien of liens) {
	lien.addEventListener('mouseenter', afficher)
	lien.addEventListener('mouseleave', cacher)
}