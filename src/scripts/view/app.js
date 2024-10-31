// Import modul dan data
import { option } from "../data/option.js";
import { getMovies } from "../data/api.js";
import "../components/AppBar.js";
import "../components/Footer.js";

// Variabel global untuk menyimpan data film
let movies = [];

// Menemukan elemen pencarian pada halaman
const searchBox = document.getElementById("search");

// Fungsi untuk memuat semua film dari API
const loadMovies = async () => {
  movies = await getMovies();
};

// Fungsi untuk memfilter film berdasarkan kata kunci
const filterMovies = (keyword) => {
  return movies.filter((movie) =>
    movie.title.toLowerCase().includes(keyword.toLowerCase())
  );
};

// Fungsi untuk merender film-film yang sudah difilter
const renderFilteredMovies = (filteredMovies, keyword) => {
  const movieElements = document.querySelector("#movie-list");
  movieElements.innerHTML = "";

  if (filteredMovies.length === 0) {
    movieElements.innerHTML = `<p class="text-2xl text-white font-medium">No result for '${keyword}'<p/>`;
  } else {
    filteredMovies.forEach((movie) => {
      const releaseDate = new Date(movie.release_date);
      const releaseYear = releaseDate.getFullYear();

      movieElements.innerHTML += `
        <figure class="max-w-sm rounded-xl overflow-hidden shadow-lg bg-slate-800">
          <img 
            src=${option.image_url + movie?.poster_path} 
            alt=${movie.title}
          >
          <div class="px-6 py-4">
            <figcaption class="text-lg font-medium">
              <div class="text-2xl text-white mb-5">${movie.title}</div>
            <figcaption/>
            
            <blockquote>
              <p class="text-slate-400 text-base truncate text-justify" 
                id="overview-${movie.id}"
              >
                ${movie.overview}
              </p> 
               
            <blockquote/>
        
            <button 
              class="text-sky-400 hover:underline focus:outline-none mt-2"
              onclick="toggleOverview(${movie.id})"
              id="btn-overview-${movie.id}"
            >
              More
            </button>
          </div>
          <div class="px-6 pt-4 pb-2">
            <span class="inline-block bg-gray-800 border border-sky-400 rounded-full px-3 py-1 text-sm font-semibold text-sky-400 mr-2 mb-2">
              ${movie.vote_average}
            </span>
            <span class="inline-block bg-gray-800 border border-sky-400 rounded-full px-3 py-1 text-sm font-semibold text-sky-400 mr-2 mb-2">
              ${releaseYear}
            </span>
          </div>
        </figure>        
      `;
    });
  }
};

// Fungsi untuk menangani klik pada tombol "Selengkapnya"
window.toggleOverview = (id) => {
  const overviewElement = document.getElementById(`overview-${id}`);
  const buttonElement = document.getElementById(`btn-overview-${id}`);

  if (overviewElement.classList.contains("truncate")) {
    overviewElement.classList.remove("truncate");
    buttonElement.textContent = "Hide";
  } else {
    overviewElement.classList.add("truncate");
    buttonElement.textContent = "More";
  }
};

// Fungsi untuk menangani input pada kotak pencarian
const handleSearchInput = () => {
  const keyword = searchBox.value.trim();
  const filteredMovies = filterMovies(keyword);
  renderFilteredMovies(filteredMovies, keyword);
};

// Menambahkan event listener pada kotak pencarian
searchBox.addEventListener("input", handleSearchInput);

// Memanggil fungsi loadMovies saat halaman dimuat
export const initializeApp = async () => {
  await loadMovies();
  renderFilteredMovies(movies, "");
};

// Export fungsi-fungsi yang dibutuhkan
export { renderFilteredMovies };
