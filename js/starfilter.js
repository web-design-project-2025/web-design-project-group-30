let allMovies = [];

document.addEventListener("DOMContentLoaded", () => {
  const starSpans = document.querySelectorAll('#star-filter span');
  const allMoviesContainer = document.getElementById('all-movie-sections-container');

  if (!allMoviesContainer) return;

  //Fetch from JSON
  fetch("data/all-movie.json")
    .then((response) => response.json())
    .then((data) => {
      const categories = [
        "all-movies-section-1",
        "all-movies-section-2",
        "all-movies-section-3"
      ];

      //Merge movies into 1 array
      allMovies = categories.flatMap((category) => data[category] || []);

      //Star filter
      handleStars(applyStarFilter);
    });

  //Filter movies by star rating
  function applyStarFilter(rating) {
    const filtered = allMovies.filter(movie => movie.rating === rating);
    allMoviesContainer.innerHTML = "";
    renderMovieSection(filtered, allMoviesContainer, 30, `Movies with ${rating} Stars`);
  }

  //Click and hover stars
  function handleStars(applyFilterFn) {
    starSpans.forEach((star) => {
      star.addEventListener("click", () => {
        const rating = parseInt(star.getAttribute("data-value"));
        starSpans.forEach(s => s.classList.remove("active"));
        for (let i = 0; i < rating; i++) {
          starSpans[i].classList.add("active");
        }
        applyFilterFn(rating);
      });

      star.addEventListener("mouseover", () => {
        const hoverVal = parseInt(star.getAttribute("data-value"));
        starSpans.forEach((s, i) => s.classList.toggle("hover", i < hoverVal));
      });

      star.addEventListener("mouseout", () => {
        starSpans.forEach(s => s.classList.remove("hover"));
      });
    });
  }
});
