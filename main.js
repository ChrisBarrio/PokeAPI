
//selecciono contenedor donde luego 'meter' el componente
const spinner = document.querySelector("#spinner");
const containerCards = document.querySelector('#container-cards')
const previous = document.querySelector("#previous");
const next = document.querySelector("#next");


let offset = 1;
let limit = 8;

document.addEventListener('DOMContentLoaded', () =>{
    // const random = getRandomInt(1, 152);
    // fetchData(random)
    fetchPokemon()
});

previous.addEventListener("click", () => {
    if (offset != 1) {
        offset -= 9;
        fetchPokemons(offset, limit);
        removeChildNodes(containerCards);
    }
});

next.addEventListener("click", () => {
    offset += 9;
    fetchPokemons(offset, limit);
    removeChildNodes(containerCards);
});

function fetchPokemon(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then((res) => res.json())
        .then((data) => {
            createPokemon(data)
            spinner.style.display = "none";//spiner de loading...
            containerCards.style.display = 'grid'
            console.log(data)
        })
}

function fetchPokemons(offset, limit) { // offset:minimo cuando carga la pagina y limit: cuantos elementos carga
    spinner.style.display = "block";
    containerCards.style.display = 'none'
    spinner.style.height = '100vh'
    spinner.style.display = "flex";//spinner de loading...
    spinner.style.justifyContent = 'center'
    spinner.style.alignItems = 'center'
    
    for (let i = offset; i <= offset + limit; i++) {
        fetchPokemon(i);
    }
}

// creo el pokemon
function createPokemon(pokemon) {
    //card
    const card = document.createElement('div')
    card.classList.add('pokemon-block');//
    

    //figura e imagen
    const spriteContainer = document.createElement('figure')
    spriteContainer.classList.add('img-container');
    
    const sprite = document.createElement('img')
    sprite.src = pokemon.sprites.other.dream_world.front_default
    spriteContainer.appendChild(sprite)//

    //text card
    const number = document.createElement('p')
    number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`

    const name = document.createElement('p')
    name.classList.add('name')
    name.textContent = pokemon.name //

    //segun como lo ponga establezco el orden
    card.appendChild(spriteContainer)
    card.appendChild(number)
    card.appendChild(name)

    containerCards.appendChild(card)
    

    //cardBack
    const cardBack = document.createElement('div')
    cardBack.classList.add('pokemon-block-back')
    cardBack.textContent = 'parte de atras'

    card.appendChild(cardBack);
}

function removeChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

fetchPokemons(offset, limit)
