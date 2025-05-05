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
  
  fetch("data/horror.json")
    .then((response) => response.json())
    .then((data) => {
      const horrorSectionsContainer = document.getElementById("horror-sections-container");
      if (!horrorSectionsContainer) return;
  
      const categories = [
        "horror-section-1",
        "horror-section-2",
        "horror-section-3"
      ];
  
      categories.forEach((category, index) => {
        const movies = data[category];
        if (!movies || movies.length === 0) return;
        renderMovieSection(movies, horrorSectionsContainer, 10, `Section ${index + 1}`);
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
  