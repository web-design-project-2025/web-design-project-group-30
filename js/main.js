function categoriesFunction(){
    var categoryList = document.querySelector(".category-list");
    
    if(categoryList.classList.contains("show")){
        categoryList.classList.remove("show");
    } else{
        categoryList.classList.add("show");
    }
}
document.addEventListener("click", function(event){
    const button = document.querySelector(".categories-row button");
    const list = document.querySelector(".category-list");

    if(!button.contains(event.target)&& !list.contains(event.target)){
        list.classList.remove("show");
    }
});