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
        {
          key: "all-movies-section-1",
          title: "Critics Favorites",
          showTitle: false,
        },
        {
          key: "all-movies-section-2",
          title: "Modern Epics",
          showTitle: false,
        },
        {
          key: "all-movies-section-3",
          title: "Emotional Journeys",
          showTitle: false,
        },
      ];

      categories.forEach(({ key, title, showTitle }) => {
        const movies = data[key] || [];
        categorizedMovies[title] = movies.map((movie) => ({
          ...movie,
          sectionTitle: title,
          showTitle,
        }));
      });

      allMovies = Object.values(categorizedMovies).flat();

      Object.entries(categorizedMovies).forEach(([title, movies]) => {
        if (movies.length > 0) {
          renderMovieSection(
            movies,
            allMoviesContainer,
            10,
            title,
            movies[0]?.showTitle !== false
          );
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
    let prioritized = [...allMovies];

    //Movies with selected rating come first
    if (activeRating !== null) {
      prioritized.sort((a, b) => {
        if (a.rating === activeRating && b.rating !== activeRating) return -1;
        if (b.rating === activeRating && a.rating !== activeRating) return 1;
        return 0;
      });
    }

    //Newest or oldest dates
    if (activeDateSort === "newest") {
      prioritized.sort(
        (a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)
      );
    } else if (activeDateSort === "oldest") {
      prioritized.sort(
        (a, b) => new Date(a.releaseDate) - new Date(b.releaseDate)
      );
    }

    //Group filtered movies by titles
    const groupedMovies = {};
    prioritized.forEach((movie) => {
      if (!groupedMovies[movie.sectionTitle]) {
        groupedMovies[movie.sectionTitle] = [];
      }
      groupedMovies[movie.sectionTitle].push(movie);
    });
    allMoviesContainer.innerHTML = "";
    for (let title in groupedMovies) {
      const movies = groupedMovies[title];
      renderMovieSection(
        movies,
        allMoviesContainer,
        10,
        title,
        movies[0]?.showTitle !== false
      );
    }

    setTimeout(setupScrollButtons, 100);
  }
  //Clicking and hovering on star rating filter
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
    heading = "",
    showTitle = true
  ) {
    let sectionHTML = `<section class="product">`;

    if (showTitle && heading) {
      sectionHTML += `<h2>${heading}</h2>`;
    }

    sectionHTML += `
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

/*Sources/Refrences used when coding
Sorting Array: https://www.freecodecamp.org/news/how-to-sort-javascript-array-accurately
Flat: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat
Object Entries:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
Strict Inequality: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_inequality
forEach:https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach
*/
