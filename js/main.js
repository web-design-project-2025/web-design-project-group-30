fetch("movie.json")
  .then((response) => response.json())
  .then((data) => {
    console.log(data); // Check if the data is loaded correctly

    const movieList = document.getElementById("movie-list");
    if (movieList) {
      console.log("movieList element found"); // Check if the element exists
      data.movies.forEach((movie) => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");

        movieCard.innerHTML = `
    <a href="detailed-movie-review-page.html?id=${movie.id}" class="movie-link">
            <img src="/img/${movie.poster}" alt="${movie.alt}">
          </a>
    `;

        movieList.appendChild(movieCard);
      });
    }
  })
  .catch((error) => console.error("Error loading movies:", error));


// // categories button
// function categoriesFunction() {
//   var categoryList = document.querySelector(".category-list");

//   if (categoryList.classList.contains("show")) {
//     categoryList.classList.remove("show");
//   } else {
//     categoryList.classList.add("show");
//   }
// }



// // search bar
// function filterSearchResults() {
//   var input, filter, ul, li, a, i, txtValue;
//   input = document.getElementById("search-bar");
//   filter = input.value.toUpperCase();
//   ul = document.getElementsByClassName("search-result")[0];
//   li = ul.getElementsByTagName("li");

//   // changed
//   for (i = 0; i < li.length; i++) {
//     a = li[i].getElementsByTagName("a")[0];
//     txtValue = a.textContent || a.innerText;
//     li[i].style.display = txtValue.toUpperCase().includes(filter) ? "" : "none";
//   }
// }

// const searchInput = document.getElementById("search-bar");
// const searchList = document.querySelector(".search-result");

// searchInput.addEventListener("focus", () => {
//   searchList.style.display = "block";
// });

// document.addEventListener("click", (event) => {
//   if (
//     !searchInput.contains(event.target) &&
//     !searchList.contains(event.target)
//   ) {
//     searchList.style.display = "none";
//   }
// });

// function toggleReadMore() {
//   var dots = document.getElementById("dots");
//   var moreText = document.getElementById("more");
//   var btnText = document.getElementById("readMoreButton");

//   if (dots.style.display === "none") {
//     dots.style.display = "inline";
//     btnText.innerHTML = "READ MORE";
//     moreText.style.display = "none";
//   } else {
//     dots.style.display = "none";
//     btnText.innerHTML = "READ LESS";
//     moreText.style.display = "inline";
//   }
// }

// /*toggle menu*/
// function toggleMenu() {
//   const navLinks = document.querySelector(".nav-links");
//   navLinks.classList.toggle("show");
// }

// /*Source/Refrences
// Read More Button:
// https://www.w3schools.com/howto/howto_js_read_more.asp*/
