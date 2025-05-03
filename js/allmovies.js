function renderMovieSection(movies, container, numberToShow = 10, heading = "") {
    let sectionHTML = `
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
  
  fetch("data/all-movie.json")
    .then((response) => response.json())
    .then((data) => {
      const allMovieSectionsContainer = document.getElementById("all-movie-sections-container");
      if (!allMovieSectionsContainer) return;
  
      const categories = [
        "all-movies-section-1",
        "all-movies-section-2",
        "all-movies-section-3"
      ];
  
      categories.forEach((category, index) => {
        const movies = data[category];
        if (!movies || movies.length === 0) return;
        renderMovieSection(movies, allMovieSectionsContainer, 10, `Section ${index + 1}`);
      });
  
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
  