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


function toggleHamburgerMenu() {
  const menu = document.getElementById("hamburgerContent");
  if (menu.style.display === "block") {
    menu.style.display = "none";
  } else {
    menu.style.display = "block";
  }
}