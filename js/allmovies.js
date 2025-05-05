let allMovies = [];
let activeRating = null;
let activeDateSort = "all"; // Tracks selected date sort

document.addEventListener("DOMContentLoaded", () => {
  const starSpans = document.querySelectorAll("#star-filter span");
  const dateFilter = document.getElementById("date-filter"); // Date filter dropdown
  const allMoviesContainer = document.getElementById(
    "all-movie-sections-container"
  );
  //Stops the code if container isnt found
  if (!allMoviesContainer) return;
  //Loads JSON data
  fetch("data/all-movie.json")
    //converts data into a JS object
    .then((response) => response.json())
    .then((data) => {
      const categories = [
        "all-movies-section-1",
        "all-movies-section-2",
        "all-movies-section-3",
      ];

      //Combines all movies from different sections into 1 big list
      allMovies = categories.flatMap((category) => data[category] || []);

      //Shows all the movie sections when the page loads
      categories.forEach((category, index) => {
        const movies = data[category];
        //Skips empty sections
        if (!movies || movies.length === 0) return;
        //10 movies per section
        renderMovieSection(
          movies,
          allMoviesContainer,
          10,
          `Section ${index + 1}`
        );
      });

      //Scroll left and right
      setTimeout(() => {
        const sections = document.querySelectorAll(".product");
        sections.forEach((section) => {
          const container = section.querySelector(".product-container");
          const next = section.querySelector(".nxt-btn");
          const prev = section.querySelector(".pre-btn");
          const containerWidth = container.getBoundingClientRect().width;

          //Next button, scroll right
          next.addEventListener(
            "click",
            () => (container.scrollLeft += containerWidth)
          );

          //previous button, scroll left
          prev.addEventListener(
            "click",
            () => (container.scrollLeft -= containerWidth)
          );
        });
      }, 100);

      //Starfilter setup
      handleStars(applyFilters);

      //Date filter setup
      if (dateFilter) {
        dateFilter.addEventListener("change", () => {
          activeDateSort = dateFilter.value;
          applyFilters();
        });
      }
    });

  //Show movies based on the filters (rating + date)
  function applyFilters(selectedRating = activeRating) {
    //Clears the movies container before adding new movies
    allMoviesContainer.innerHTML = "";

    activeRating = selectedRating;

    let filtered = allMovies;

    //star rating filter
    if (activeRating !== null) {
      filtered = filtered.filter((movie) => movie.rating === activeRating);
    }

    //remove movies without filtered release date
    filtered = filtered.filter(
      (movie) => movie.releaseDate && !isNaN(Date.parse(movie.releaseDate))
    );

    //Sort by date
    if (activeDateSort === "newest") {
      filtered.sort(
        (a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)
      );
    } else if (activeDateSort === "oldest") {
      filtered.sort(
        (a, b) => new Date(a.releaseDate) - new Date(b.releaseDate)
      );
    }

    //10 movies per section
    const sectionSize = 10;
    for (let i = 0; i < filtered.length; i += sectionSize) {
      const chunk = filtered.slice(i, i + sectionSize);
      //renders each group of movies
      renderMovieSection(
        chunk,
        allMoviesContainer,
        sectionSize,
        `Section ${i / sectionSize + 1}`
      );
    }

    //scroll functionality comes back after filtering
    setTimeout(() => {
      const sections = document.querySelectorAll(".product");
      sections.forEach((section) => {
        const container = section.querySelector(".product-container");
        const next = section.querySelector(".nxt-btn");
        const prev = section.querySelector(".pre-btn");
        const containerWidth = container.getBoundingClientRect().width;

        next.addEventListener(
          "click",
          () => (container.scrollLeft += containerWidth)
        );
        prev.addEventListener(
          "click",
          () => (container.scrollLeft -= containerWidth)
        );
      });
    }, 100);
  }

  //click and hover effects for the star filter
  function handleStars(applyFilterFn) {
    starSpans.forEach((star) => {
      star.addEventListener("click", () => {
        const rating = parseInt(star.getAttribute("data-value"));
        const currentActive =
          starSpans[rating - 1].classList.contains("active");

        //remove the filter if same star is clicked again
        if (currentActive && rating === activeRating) {
          starSpans.forEach((s) => s.classList.remove("active"));
          applyFilterFn(null);
        } else {
          //if a star is click, mark it as active
          starSpans.forEach((s) => s.classList.remove("active"));
          for (let i = 0; i < rating; i++) {
            starSpans[i].classList.add("active");
          }
          applyFilterFn(rating);
        }
      });

      //hover effects
      star.addEventListener("mouseover", () => {
        const hoverVal = parseInt(star.getAttribute("data-value"));
        starSpans.forEach((s, i) => s.classList.toggle("hover", i < hoverVal));
      });

      //removes hover effect
      star.addEventListener("mouseout", () => {
        starSpans.forEach((s) => s.classList.remove("hover"));
      });
    });
  }

  //render section of movies
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

    //loop to add the list of movies to a section
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

    //new section to the page
    container.innerHTML += sectionHTML;
  }
});

/*Sources/Refrences
https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
https://developer.mozilla.org/en-US/docs/Web/API/HTMLButtonElement
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration
*/
