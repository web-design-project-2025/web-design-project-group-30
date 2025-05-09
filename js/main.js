fetch("data/movie.json")
  .then((response) => response.json())
  .then((data) => {
    console.log(data); 

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

//sign in
function closeModal() {
  alert("You must sign in first.");
}

function signin() {
  const name = document.getElementById("name").value.trim();
  const password = document.getElementById("password").value.trim();

  if (name && password) {
    localStorage.setItem("isSignedIn", "true");
    localStorage.setItem("username", name);

    const modal = document.getElementById("modal");
    if (modal) modal.remove(); 

    alert("Successfully signed in");
  } else {
    alert("Please fill in both fields");
  }
}

function checkSignin() {
  const isSignedIn = localStorage.getItem("isSignedIn");
  const modal = document.getElementById("modal");

  if (isSignedIn === "true" && modal) {
    modal.remove(); 
  }
}

window.addEventListener("DOMContentLoaded", function () {
  checkSignin();
});


/*Source/Refrences
Read More Button:
https://www.w3schools.com/howto/howto_js_read_more.asp*/

  


