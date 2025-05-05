// categories button
function categoriesFunction() {
  var categoryList = document.querySelector(".category-list");

  if (categoryList.classList.contains("show")) {
    categoryList.classList.remove("show");
  } else {
    categoryList.classList.add("show");
  }
}

// carousel effect
document.addEventListener("click", function(event) {
  const button = document.querySelector(".categories-row button");
  const list = document.querySelector(".category-list");

  if (!button.contains(event.target) && !list.contains(event.target)) {
    list.classList.remove("show");
  }
});

const productContainers = [...document.querySelectorAll(".product-container")];
const nxtBtn = [...document.querySelectorAll(".nxt-btn")];
const preBtn = [...document.querySelectorAll(".pre-btn")];

productContainers.forEach((item, i) => {
  let containerDimensions = item.getBoundingClientRect();
  let containerWidth = containerDimensions.width;

  nxtBtn[i].addEventListener("click", () => {
    item.scrollLeft += containerWidth;
  });
  preBtn[i].addEventListener("click", () => {
    item.scrollLeft -= containerWidth;
  });
});

// search bar
function myFunction() {
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById("search-bar");
  filter = input.value.toUpperCase();
  ul = document.getElementsByClassName("search-result")[0];
  li = ul.getElementsByTagName("li");

  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

const searchInput = document.getElementById("search-bar");
const searchList = document.querySelector(".search-result");

searchInput.addEventListener("focus", () => {
  searchList.style.display = "block";
});

document.addEventListener("click", (event) => {
  if (
    !searchInput.contains(event.target) &&
    !searchList.contains(event.target)
  ) {
    searchList.style.display = "none";
  }
});

function myFunction() {
  var dots = document.getElementById("dots");
  var moreText = document.getElementById("more");
  var btnText = document.getElementById("readMoreButton");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "READ MORE";
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "READ LESS";
    moreText.style.display = "inline";
  }
}

/*toggle menu*/
function toggleMenu() {
  const navLinks = document.querySelector(".nav-links");
  navLinks.classList.toggle("show");
}

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
    if (modal) modal.remove(); // Completely remove modal from the DOM

    alert("Successfully signed in");
  } else {
    alert("Please fill in both fields");
  }
}

function checkSignin() {
  const isSignedIn = localStorage.getItem("isSignedIn");
  const modal = document.getElementById("modal");

  if (isSignedIn === "true" && modal) {
    modal.remove(); // Remove it on load if already signed in
  }
}

window.addEventListener("DOMContentLoaded", function () {
  checkSignin();
});

/*Source/Refrences
Read More Button:
https://www.w3schools.com/howto/howto_js_read_more.asp*/