let allMovies = [];
let categorizedMovies = {};
let activeRating = null;
let activeDateSort = "all";

document.addEventListener("DOMContentLoaded", () => {
  const starSpans = document.querySelectorAll("#star-filter span");
  const dateFilter = document.getElementById("date-filter");
  const allMoviesContainer = document.getElementById(
    "all-movie-sections-container"
  );

  if (!allMoviesContainer) return;

  fetch("data/all-movie.json")
    .then((response) => response.json())
    .then((data) => {
      const categories = [
        { key: "all-movies-section-1", title: "Critics Favorites" },
        { key: "all-movies-section-2", title: "Modern Epics" },
        { key: "all-movies-section-3", title: "Emotional Journeys" },
      ];

      categories.forEach(({ key, title }) => {
        const movies = data[key] || [];
        categorizedMovies[title] = movies.map((movie) => ({
          ...movie,
          sectionTitle: title,
        }));
      });

      allMovies = Object.values(categorizedMovies).flat();

      Object.entries(categorizedMovies).forEach(([title, movies]) => {
        if (movies.length > 0) {
          renderMovieSection(movies, allMoviesContainer, 10, title);
        }
      });

      setTimeout(setupScrollButtons, 100);

      handleStars(applyFilters);

      if (dateFilter) {
        dateFilter.addEventListener("change", () => {
          activeDateSort = dateFilter.value;
          applyFilters();
        });
      }
    });

function applyFilters(selectedRating = activeRating) {
  activeRating = selectedRating;
  let filteredMovies = [...allMovies];

  //Filter
  if (activeRating !== null) {
    filteredMovies = filteredMovies.filter(movie => movie.rating === activeRating);
  }

  //Sort by date
  if (activeDateSort === "newest") {
    filteredMovies.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
  } else if (activeDateSort === "oldest") {
    filteredMovies.sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));
  }

 //Group filtered movies by titles
  const groupedMovies = {};
  filteredMovies.forEach(movie => {
    if (!groupedMovies[movie.sectionTitle]) {
      groupedMovies[movie.sectionTitle] = [];
    }
    groupedMovies[movie.sectionTitle].push(movie);
  });

 
  allMoviesContainer.innerHTML = "";
  for (let title in groupedMovies) {
    renderMovieSection(groupedMovies[title], allMoviesContainer, 10, title);
  }

  setTimeout(setupScrollButtons, 100);
}

  function handleStars(applyFilterFn) {
    starSpans.forEach((star) => {
      const rating = parseInt(star.getAttribute("data-value"));

      star.addEventListener("click", () => {
        const isActive = activeRating === rating;
        activeRating = isActive ? null : rating;

        starSpans.forEach((s, i) => {
          s.classList.toggle("active", !isActive && i < rating);
        });

        applyFilterFn(activeRating);
      });

      star.addEventListener("mouseover", () => {
        starSpans.forEach((s, i) => s.classList.toggle("hover", i < rating));
      });

      star.addEventListener("mouseout", () => {
        starSpans.forEach((s) => s.classList.remove("hover"));
      });
    });
  }

  function setupScrollButtons() {
    document.querySelectorAll(".product").forEach((section) => {
      const container = section.querySelector(".product-container");
      const next = section.querySelector(".nxt-btn");
      const prev = section.querySelector(".pre-btn");
      const width = container.getBoundingClientRect().width;

      next.addEventListener("click", () => (container.scrollLeft += width));
      prev.addEventListener("click", () => (container.scrollLeft -= width));
    });
  }

  function renderMovieSection(
    movies,
    container,
    numberToShow = 10,
    heading = ""
  ) {
    let sectionHTML = `
      <section class="product">
        <h2>${heading}</h2>
        <button class="pre-btn">
          <img class="arrow-image" src="img/arrow-velour.png" alt="previous movies button">
        </button>
        <button class="nxt-btn">
          <img class="arrow-image" src="img/arrow-velour.png" alt="next movies button">
        </button>
        <div class="product-container">
    `;

    movies.slice(0, numberToShow).forEach((movie) => {
      sectionHTML += `
        <div class="product-card">
          <a href="detailed-movie-review-page.html?id=${movie.id}">
            <div class="movie-image">
              <img class="movie-thumbnail" src="img/${movie.poster}" alt="${movie.alt}">
            </div>
          </a>
        </div>
      `;
    });

    sectionHTML += `</div></section>`;
    container.innerHTML += sectionHTML;
  }
});
