const pokemon_name = document.querySelector('.pokemon_name');

const pokemon_number = document.querySelector('.pokemon_number');

const pokemon_image = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');

const input_search = document.querySelector('.input_search');

const btn_prv = document.querySelector('.btn-prev');
const btn_next = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {

    const APIresponse =  await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIresponse.status === 200) {

        const data = await APIresponse.json();
        
        return data;
    }

}


const renderPokemon = async (pokemon) => {

    pokemon_name.innerHTML = 'Loading...';
    pokemon_number.innerHTML = '';
    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemon_image.style.display = 'block';
        pokemon_name.innerHTML = data.name;
        pokemon_number.innerHTML = data.id;
        pokemon_image.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

        input_search.value = '';
        searchPokemon.value = data.id;
    }

    else{
        pokemon_name.innerHTML = 'Not Found';
        pokemon_number.innerHTML = '';
        pokemon_image.style.display = 'none';
    }
}



form.addEventListener('submit', (event) => {
    event.preventDefault();

    renderPokemon(input_search.value.toLowerCase());
    
});

btn_next.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);   
});

btn_prv.addEventListener('click', () => {
    if (searchPokemon > 1){
        searchPokemon -= 1;
        renderPokemon(searchPokemon); 
    }
});

renderPokemon(searchPokemon);