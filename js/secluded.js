//Categories button
function categoriesFunction() {
  var categoryList = document.querySelector(".category-list");

  if (categoryList.classList.contains("show")) {
    categoryList.classList.remove("show");
  } else {
    categoryList.classList.add("show");
  }
}

//Carousel effect
//This following code/logic is adapted from the source:https://www.youtube.com/watch?v=OQZNAMjC6Vg used for the logic of the carousel effect
document.addEventListener("click", function (event) {
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

//Search bar
//The following code was adapted by this source : https://www.w3schools.com/howto/howto_js_filter_lists.asp
function filterSearchResults() {
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById("search-bar");
  filter = input.value.toUpperCase();
  ul = document.getElementsByClassName("search-result")[0];
  li = ul.getElementsByTagName("li");

  changed;
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    li[i].style.display = txtValue.toUpperCase().includes(filter) ? "" : "none";
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

function toggleReadMore() {
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

/*Toggle menu*/
function toggleMenu() {
  const navLinks = document.querySelector(".nav-links");
  navLinks.classList.toggle("show");
}
/*Toggle filter menu on mobile*/
function toggleFilters() {
  const filterContainer = document.getElementById("filter-container");
  filterContainer.classList.toggle("active");
}
