const pokemonName = document.getElementById('pokemonName'),
      pokemonNumber = document.getElementById('pokemonNumber'),
      pokemonImage = document.getElementById('pokemonImage'),
      pokemonDetails = document.getElementById('pokemonDetails'),
      form = document.getElementById('searchForm'),
      input = document.getElementById('inputSearch'),
      buttonPrev = document.getElementById('btnPrev'),
      buttonNext = document.getElementById('btnNext');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (response.status === 200) return await response.json();
};

const setBackgroundByType = (types) => {
    const colors = {
        grass: "#78C850", fire: "#F08030", water: "#6890F0",
        bug: "#A8B820", normal: "#A8A878", poison: "#A040A0",
        electric: "#F8D030", ground: "#E0C068", fairy: "#EE99AC",
        fighting: "#C03028", psychic: "#F85888", rock: "#B8A038",
        ghost: "#705898", ice: "#98D8D8", dragon: "#7038F8",
        dark: "#705848", steel: "#B8B8D0", flying: "#A890F0"
    };
    
    const type1 = types[0].type.name;
    const type2 = types[1] ? types[1].type.name : null;

    if (type2) {
        const color1 = colors[type1] || "#fff";
        const color2 = colors[type2] || "#fff";
        document.body.style.background = `linear-gradient(45deg, ${color1}, ${color2})`;
    } else {
        document.body.style.backgroundColor = colors[type1] || "#fff";
    }
};

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = "Carregando...";
    pokemonNumber.innerHTML = "";
    pokemonDetails.innerHTML = "";

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonImage.style.display = "block";
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonDetails.innerHTML = `
            Tipo: ${data.types.map(type => type.type.name).join(", ")}<br>
            Altura: ${(data.height / 10).toFixed(1)} m<br>
            Peso: ${(data.weight / 10).toFixed(1)} kg
        `;
        pokemonImage.src = data.sprites.versions["generation-v"]["black-white"].animated.front_default;
        input.value = "";
        searchPokemon = data.id;
        setBackgroundByType(data.types);
    } else {
        pokemonImage.style.display = "none";
        pokemonName.innerHTML = "Não encontrado :c";
        pokemonNumber.innerHTML = "";
        pokemonDetails.innerHTML = "";
        document.body.style.backgroundColor = "#fff";
    }
};

form.addEventListener("submit", (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener("click", () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

buttonNext.addEventListener("click", () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);
