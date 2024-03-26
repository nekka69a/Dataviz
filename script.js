const form = document.querySelector("form");
const loading = document.querySelector(".loading");
const search = document.querySelector("#search");
const result = document.querySelector(".result");
let maxNum = 650; //
const randomBtn = document.querySelector(".btn-random");
randomBtn.addEventListener("click", () => {
  removeResult();
  loading.classList.remove("d-none");
  let ranNum = Math.floor(Math.random() * maxNum);
  console.log(ranNum);
  const URI = `https://pokeapi.co/api/v2/pokemon/${ranNum}`;
  getPokemon(URI, ranNum);
});
form.addEventListener("submit", (e) => {
  e.preventDefault();
  removeResult();
  loading.classList.remove("d-none");
  loadPokemon();
});
const removeResult = () => {
  result.className = "result";
  result.innerHTML = null;
};
result.addEventListener("click", removeResult);
const getPokemon = async (URI, text) => {
  try {
    const res = await fetch(URI);
    if (!res.ok || !text || text <= 0 || text >= 650) {
      throw "Please only numbers between 1 and 649 or type the name correctly";
    }
    const data = await res.json();
    console.log(data);
    const {
      id,
      name,
      sprites: {
        other: {
          dream_world: { front_default },
        },
      },
    } = data;
    setTimeout(() => {
      loading.classList.add("d-none");
      result.className = "result active";
      result.innerHTML = `
        <div class="pokebox found">
          <span class="closebox">x</span>
          <img src="${front_default}" alt="${name}" class="pokemon">
          <h3 class="pokename">${name}</h3>
          <p class="pokenumber">#${id.toString().padStart(3, "0")}</p>
        </div>`;
      search.value = null;
    }, 1600);
  } catch (error) {
    console.log(error);
    let pokenumber = search.value
      ? isNaN(search.value)
        ? search.value
        : `#${search.value}`
      : "";
    setTimeout(() => {
      loading.classList.add("d-none");
      result.className = "result active";
      result.innerHTML = `
      <div class="pokebox notfound">
        <span class="closebox">x</span>
        <h4><span>4</span><span>0</span><span>4</span></h4>
        <p>Pokemon <span class="pokenumber">${pokenumber}</span> not found</p>
      </div>`;
    }, 1600);
  }
};
function loadPokemon() {
  let text = search.value.trim();
  if (isNaN(text)) text = text.toLowerCase();
  const URI = `https://pokeapi.co/api/v2/pokemon/${text}`;
  getPokemon(URI, text);
}
