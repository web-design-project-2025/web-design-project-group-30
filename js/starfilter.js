let allMovies = [];

document.addEventListener("DOMContentLoaded", () => {
  const starSpans = document.querySelectorAll('#star-filter span');
  const movieList = document.getElementById('movie-sections-container');
  const showAllButton = document.getElementById('show-all-button');

  if (!movieList) return;

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
      allMovies = categories.flatMap((category) => data[category] || []);

      //filter function
      function applyStarFilter(rating) {
        const filteredMovies = allMovies.filter(movie => movie.rating === rating);
        movieList.innerHTML = "";
        renderMovieSection(filteredMovies, movieList, 50, `Movies with ${rating} Stars`);
      }

      //show all button
      function showAllMovies() {
        movieList.innerHTML = "";
        categories.forEach((category) => {
          const movies = data[category];
          if (!movies || movies.length === 0) return;
          const heading = movies[0]["trending-heading"]?.toUpperCase() || category.replace("trending-", "").replace("-movies", "").toUpperCase();
          renderMovieSection(movies, movieList, 10, heading);
        });

        starSpans.forEach(s => s.classList.remove('active'));
      }

      //star click
      starSpans.forEach(star => {
        star.addEventListener('click', () => {
          const selectedRating = parseInt(star.getAttribute('data-value'));
          starSpans.forEach(s => s.classList.remove('active'));
          for (let i = 0; i < selectedRating; i++) {
            starSpans[i].classList.add('active');
          }
          applyStarFilter(selectedRating);
        });

        star.addEventListener('mouseover', () => {
          const hoverVal = parseInt(star.getAttribute('data-value'));
          starSpans.forEach((s, i) => s.classList.toggle('hover', i < hoverVal));
        });

        star.addEventListener('mouseout', () => {
          starSpans.forEach(s => s.classList.remove('hover'));
        });
      });

      showAllButton?.addEventListener("click", showAllMovies);
    });
});
