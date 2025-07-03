// Function to load the search box HTML into the page
const loadSearchBox = () => {
  fetch('search-bar/searchbar.html')
    .then(res => res.text())
    .then(html => {
      document.getElementById('search-box-container').innerHTML = html;
      initializeSearchFunctionality();
    })
    .catch(err => console.error("Error loading search box:", err));
};

const initializeSearchFunctionality = () => {
  const searchInput = document.getElementById("search-input");
  const searchResultsContainer = document.getElementById("search-results");
  const gameApiKey = "6bf9db2e65b94207965bb05b2623aac1";
  const movieApiKey = "f7f860eb9f4587839d83fd21430f4205"; // movie ve series api keyler aynı

  // Fetch games from RAWG
  const fetchGames = async (query) => {
    const url = `https://api.rawg.io/api/games?key=${gameApiKey}&search=${query}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      return data.results || [];
    } catch (err) {
      console.error("Game API error:", err);
      return [];
    }
  };

  // Fetch movies from TMDb
  const fetchMovies = async (query) => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${movieApiKey}&query=${encodeURIComponent(query)}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      return data.results || [];
    } catch (err) {
      console.error("Movie API error:", err);
      return [];
    }
  };

  // Fetch series from TMDb
  const fetchSeries = async (query) => {
    const url = `https://api.themoviedb.org/3/search/tv?api_key=${movieApiKey}&query=${encodeURIComponent(query)}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      return data.results || [];
    } catch (err) {
      console.error("Series API error:", err);
      return [];
    }
  };

  // Display results with icons
  const displaySearchResults = (games, movies, series) => {
    searchResultsContainer.innerHTML = "";

    if (games.length === 0 && movies.length === 0 && series.length === 0) {
      searchResultsContainer.innerHTML = "<p>No results found</p>";
      return;
    }

    games.forEach((game) => {
      const item = document.createElement("a");
      item.classList.add("search-result");
      item.href = `games/game-detail.html?gameId=${game.id}`;
      item.innerHTML = `
        <span class="search-icon"><i class="fas fa-gamepad"></i></span>
        <span>${game.name}</span>
      `;
      searchResultsContainer.appendChild(item);
    });

    movies.forEach((movie) => {
      const item = document.createElement("a");
      item.classList.add("search-result");
      item.href = `movies/movie-detail.html?movieId=${movie.id}`;
      item.innerHTML = `
        <span class="search-icon"><i class="fas fa-film"></i></span>
        <span>${movie.title}</span>
      `;
      searchResultsContainer.appendChild(item);
    });

    series.forEach((tv) => {
      const item = document.createElement("a");
      item.classList.add("search-result");
      item.href = `series/series-detail.html?seriesId=${tv.id}`;
      item.innerHTML = `
        <span class="search-icon"><i class="fas fa-tv"></i></span>
        <span>${tv.name}</span>
      `;
      searchResultsContainer.appendChild(item);
    });
    books.forEach((book) => {
      if (!book.key.startsWith("/works/")) return; // sadece works linklerini al
      const item = document.createElement("a");
      item.classList.add("search-result");
      item.href = `books/book-detail.html?key=${book.key}`;
      item.innerHTML = `
        <span class="search-icon"><i class="fas fa-book"></i></span>
        <span>${book.title}</span>
      `;
      searchResultsContainer.appendChild(item);
    });
  };

  

  searchInput.addEventListener("input", async (event) => {
    const query = event.target.value.trim();
    if (query.length >= 2) {
      const [games, movies, series] = await Promise.all([
        fetchGames(query),
        fetchMovies(query),
        fetchSeries(query)
      ]);
      displaySearchResults(games, movies, series);
    } else {
      searchResultsContainer.innerHTML = "";
    }
  });
};

document.addEventListener('DOMContentLoaded', () => {
  loadSearchBox();
});
