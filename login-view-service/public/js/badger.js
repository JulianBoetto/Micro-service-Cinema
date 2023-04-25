const form = document.querySelector("form");
const title = document.getElementById("title");
const synopsis = document.getElementById("synopsis");
const duration = document.getElementById("duration");
const releaseDate = document.getElementById("releaseDate");
const image = document.getElementById("image");
const actionCtg = document.getElementById("action-ctg");
const adventureCtg = document.getElementById("adventure-ctg");
const categories = document.getElementById("categories-array");
const checkboxes = document.querySelectorAll('input[type="checkbox"]');

let checked = false;
let categoriesArray = [];

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    if (checkbox.checked && !categoriesArray.includes(checkbox.value)) {
      checked = true;
      categoriesArray.push(checkbox.value);
      if (categoriesArray.length > 2) {
        categoriesArray.shift();
      }
    } else if (!checkbox.checked && categoriesArray.includes(checkbox.value)) {
      checked = false;
      categoriesArray.splice(categoriesArray.indexOf(checkbox.value), 1);
    }
    console.log(categoriesArray)
    categories.value = categoriesArray
  });
});

async function validateForm() {
  categories.style.display = "none";
//   title.classList.remove("is-invalid");
//   releaseDate.classList.remove("is-invalid");
  image.classList.remove("is-invalid");

  
//   if (title.value === "") {
//     title.classList.add("is-invalid");
//     return;
//   }
  
//   if (releaseDate.value === "") {
//     releaseDate.classList.add("is-invalid");
//     return;
//   }
  
  if (image.files.length === 0 || !image.files[0].type.startsWith("image/")) {
    image.classList.add("is-invalid");
    return;
  }

  if (!checked) {
    categories.style.display = "block";
    return;
  }
}

const createButton = document.getElementById("btn-create");
createButton.addEventListener("click", validateForm);
