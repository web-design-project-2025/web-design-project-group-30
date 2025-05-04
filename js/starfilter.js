let trendingMovies = [];
let allMovies = [];

document.addEventListener("DOMContentLoaded", () => {
  const starSpans = document.querySelectorAll('#star-filter span');
  const trendingContainer = document.getElementById('movie-sections-container');
  const allMoviesContainer = document.getElementById('all-movie-sections-container');
  const showAllButton = document.getElementById('show-all-button');

  //trending movies
  if (trendingContainer) {
    fetch("trending.json")
      .then((response) => response.json())
      .then((data) => {
        const categories = [
          "trending-romance-movies",
          "trending-action-movies",
          "trending-comedy-movies",
          "trending-horror-movies",
          "trending-documentary-movies",
          "trending-science-fiction-movies"
        ];
        trendingMovies = categories.flatMap((category) => data[category] || []);

        function applyStarFilter(rating) {
          const filtered = trendingMovies.filter(movie => movie.rating === rating);
          trendingContainer.innerHTML = "";
          renderMovieSection(filtered, trendingContainer, 50, `Movies with ${rating} Stars`);
        }

        function showAllTrending() {
          trendingContainer.innerHTML = "";
          categories.forEach((category) => {
            const movies = data[category];
            if (!movies || movies.length === 0) return;
            const heading = movies[0]["trending-heading"]?.toUpperCase() || category.replace("trending-", "").replace("-movies", "").toUpperCase();
            renderMovieSection(movies, trendingContainer, 10, heading);
          });
          starSpans.forEach(s => s.classList.remove('active'));
        }

        handleStars(applyStarFilter, showAllTrending);
      });
  }

  //all Movies
  if (allMoviesContainer) {
    fetch("data/all-movie.json")
      .then((response) => response.json())
      .then((data) => {
        const categories = [
          "all-movies-section-1",
          "all-movies-section-2",
          "all-movies-section-3"
        ];
        allMovies = categories.flatMap((category) => data[category] || []);

        function applyStarFilter(rating) {
          const filtered = allMovies.filter(movie => movie.rating === rating);
          allMoviesContainer.innerHTML = "";
          renderMovieSection(filtered, allMoviesContainer, 30, `Movies with ${rating} Stars`);
        }

        function showAllAllMovies() {
          allMoviesContainer.innerHTML = "";
          renderMovieSection(allMovies, allMoviesContainer, 30, "All Movies");
          starSpans.forEach(s => s.classList.remove('active'));
        }

        handleStars(applyStarFilter, showAllAllMovies);
      });
  }

  //reused for both trending and all movies sections
  function handleStars(applyFilterFn, showAllFn) {
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

    showAllButton?.addEventListener("click", showAllFn);
  }
});
