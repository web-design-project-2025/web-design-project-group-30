let allMovies = [];
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
        { key: "all-movies-section-1", title: "Critically Acclaimed" },
        { key: "all-movies-section-2", title: "Modern Epics" },
        { key: "all-movies-section-3", title: "Emotional Journeys" }
      ];


      allMovies = categories.flatMap((category) => data[category.key] || []);

      categories.forEach(({ key, title }) => {
        const movies = data[key];
        if (!movies || movies.length === 0) return;

        renderMovieSection(movies, allMoviesContainer, 10, title);
      });
      setTimeout(setupScrollButtons, 100);

      //star rating + hover
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

    //filter the movies by selected star rating
    let filtered = allMovies.filter((movie) => {
      const hasValidDate =
        movie.releaseDate && !isNaN(Date.parse(movie.releaseDate));

      //show all movies if no rating is picked otherwise match the rating
      const matchesRating =
        activeRating === null || movie.rating === activeRating;

      return hasValidDate && matchesRating;
    });

    //sort movies by date if a date if filter selected
    if (activeDateSort === "newest") {
      filtered.sort(
        (a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)
      );
    } else if (activeDateSort === "oldest") {
      filtered.sort(
        (a, b) => new Date(a.releaseDate) - new Date(b.releaseDate)
      );
    }

    //clear current movie display
    allMoviesContainer.innerHTML = "";

    //filtered movies in sections of 10
    const sectionSize = 10;
    for (let i = 0; i < filtered.length; i += sectionSize) {
      const chunk = filtered.slice(i, i + sectionSize);
      renderMovieSection(
        chunk,
        allMoviesContainer,
        sectionSize,
        `Section ${i / sectionSize + 1}`
      );
    }

    setTimeout(setupScrollButtons, 100);
  }

  function handleStars(applyFilterFn) {
    starSpans.forEach((star) => {
      //get rating value from star eleemt
      const rating = parseInt(star.getAttribute("data-value"));

      star.addEventListener("click", () => {
        //check if the clicked star is already selected
        const isActive = activeRating === rating;

        //if same rating, unselect
        activeRating = isActive ? null : rating;

        //highlight stars when selected
        starSpans.forEach((s, i) => {
          s.classList.toggle("active", !isActive && i < rating);
        });

        //apply filter w updated rating
        applyFilterFn(activeRating);
      });

      //hover effect
      star.addEventListener("mouseover", () => {
        starSpans.forEach((s, i) => s.classList.toggle("hover", i < rating));
      });

      //remove hover effect
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
