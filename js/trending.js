// function that can be used to create the differnt sections
function renderMovieSection(movies, container, numberToShow = 10, heading = "") {
  let sectionHTML = `
    <p class="trending-heading">${heading}</p>
    <section class="product">
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
            <div class="trending-number">${movie["trending-number"]}</div>
          </div>
        </a>
      </div>
    `;
  });

  sectionHTML += `
      </div>
    </section>
  `;

  container.innerHTML += sectionHTML;
}


// fetch movies data and make different categories needed
fetch("data/trending.json")
  .then((response) => response.json())
  .then((data) => {
    const movieSectionsContainer = document.getElementById("movie-sections-container");
    if (!movieSectionsContainer) return;

    const categories = [
      "trending-romance-movies",
      "trending-action-movies",
      "trending-comedy-movies",
      "trending-horror-movies",
      "trending-documentary-movies",
      "trending-science-fiction-movies"
    ];

    categories.forEach((category) => {
      const movies = data[category];
      if (!movies || movies.length === 0) return;

      const heading = movies[0]["trending-heading"]?.toUpperCase() || category.replace("trending-", "").replace("-movies", "").toUpperCase();
      renderMovieSection(movies, movieSectionsContainer, 10, heading);
    });

    //carousel for the movies 
    //this following code/logic is adapted from the source:https://www.youtube.com/watch?v=OQZNAMjC6Vg used for the logic of the carousel effect
    setTimeout(() => {
      const sections = document.querySelectorAll(".product");
      sections.forEach((section) => {
        const container = section.querySelector(".product-container");
        const next = section.querySelector(".nxt-btn");
        const prev = section.querySelector(".pre-btn");
        const containerWidth = container.getBoundingClientRect().width;
        next.addEventListener("click", () => container.scrollLeft += containerWidth);
        prev.addEventListener("click", () => container.scrollLeft -= containerWidth);
      });
    }, 100);
  });
