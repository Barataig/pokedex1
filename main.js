const pokemonName=document.getElementById('pokemonName'),
pokemonNumber=document.getElementById('pokemonNumber'),
pokemonImage=document.getElementById('pokemonImage'),
pokemonDetails=document.getElementById('pokemonDetails'),
form=document.getElementById('searchForm'),
input=document.getElementById('inputSearch'),
buttonPrev=document.getElementById('btnPrev'),
buttonNext=document.getElementById('btnNext');

let searchPokemon=1;

const fetchPokemon=async e=>{const t=await fetch(`https://pokeapi.co/api/v2/pokemon/${e}`);if(200===t.status)return await t.json()};

const setBackgroundByType=e=>{const t={grass:"#78C850",fire:"#F08030",water:"#6890F0",bug:"#A8B820",normal:"#A8A878",poison:"#A040A0",electric:"#F8D030",ground:"#E0C068",fairy:"#EE99AC",fighting:"#C03028",psychic:"#F85888",rock:"#B8A038",ghost:"#705898",ice:"#98D8D8",dragon:"#7038F8",dark:"#705848",steel:"#B8B8D0",flying:"#A890F0"},o=e[0].type.name,n=e[1]?e[1].type.name:null;if(n){const e=t[o]||"#fff",r=t[n]||"#fff";document.body.style.background=`linear-gradient(45deg, ${e}, ${r})`}else document.body.style.backgroundColor=t[o]||"#fff"};

const renderPokemon=async e=>{pokemonName.innerHTML="Carregando...",pokemonNumber.innerHTML="",pokemonDetails.innerHTML="";const t=await fetchPokemon(e);t?(pokemonImage.style.display="block",pokemonName.innerHTML=t.name,pokemonNumber.innerHTML=t.id,pokemonDetails.innerHTML=`Tipo: ${t.types.map(e=>e.type.name).join(", ")}<br> Altura: ${(t.height/10).toFixed(1)} m<br> Peso: ${(t.weight/10).toFixed(1)} kg`,pokemonImage.src=t.sprites.versions["generation-v"]["black-white"].animated.front_default,input.value="",searchPokemon=t.id,setBackgroundByType(t.types)):(pokemonImage.style.display="none",pokemonName.innerHTML="Não encontrado :c",pokemonNumber.innerHTML="",pokemonDetails.innerHTML="",document.body.style.backgroundColor="#fff")};

form.addEventListener("submit",e=>{e.preventDefault(),renderPokemon(input.value.toLowerCase())});

buttonPrev.addEventListener("click",()=>{searchPokemon>1&&(searchPokemon-=1,renderPokemon(searchPokemon))});

buttonNext.addEventListener("click",()=>{searchPokemon+=1,renderPokemon(searchPokemon)});

renderPokemon(searchPokemon);