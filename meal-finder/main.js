// helper querySelector
const $ = (el) => document.querySelector(el);

// helper fetch
async function fetchApi(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (res.status == "200") {
      return data;
    }
  } catch (error) {
    alert("Error! Please check your network. And Try Agai " + error);
  }
}
// Fetch meal by id
async function getMealById(id) {
  // fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
  //   .then((res) => res.json())
  //   .then((data) => {
  //     // console.log(data);
  //     const meal = data.meals[0];
  //     // add meal to DOM
  //     AddMealToDOM(meal);
  //   });
  const data = await fetchApi(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const meal = data.meals[0];
  // add meal to DOM
  AddMealToDOM(meal);
}

// add meal to DOM
function AddMealToDOM(meal) {
  let ingredients = [];
  // iterate to add both strIngred and measure in ingredients
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }

  $("#single-meal").innerHTML = `
  <div class='single-meal'>
    <h2>${meal.strMeal}</h2>
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
    <div class="single-meal-info">
    ${meal.strCategory ? `<h3>${meal.strCategory}</h3>` : ""} 
    ${meal.strArea ? `<h4>${meal.strArea}</h4>` : ""} 
    </div>

    <div class="main">
      <h2>Ingredients</h2>
      <ul>
      ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
      </ul>
      <h2>Instructions</h2>
      <p>${meal.strInstructions}</p>
    </div>
  </div>
  
  `;
}

//fetch random meal from api
async function getRandomMeal() {
  // clear all meals & headings
  $("#meals").innerHTML = "";
  $("#result-heading").innerHTML = "";

  const data = await fetchApi(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );
  const meal = data.meals[0];
  console.log(meal);
  AddMealToDOM(meal);
}

// searchMeal to fetch api
function searchMeal(e) {
  e.preventDefault();

  //clear single meal first
  $("#single-meal").innerHTML = "";

  // get search term
  const term = $("#search").value;
  console.log(term);

  // check for empty term
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        $(
          "#result-heading"
        ).innerHTML = `<h2>Search results for: '${term}'</2>`;
        // check if no search results
        if (data.meals === null) {
          $(
            "#result-heading"
          ).innerHTML = `<h2>No Search results, Try Again!</2>`;
        } else {
          $("#meals").innerHTML = data.meals
            .map(
              (meal) => `
          <div class='meal'>
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
          <div class="meal-info" data-mealID="${meal.idMeal}">
          <h3>${meal.strMeal}</h3>
          </div>
          </div>
          `
            )
            .join("");
        }
      })
      .catch((err) => console.log(err));
    // clear search text
    $("#search").value = "";
  } else {
    alert("Enter search term");
  }
}

//events for submit form to fetch api
$("#submit").addEventListener("submit", searchMeal);
// event for random meal generating
$("#random").addEventListener("click", getRandomMeal);

// get single meal by extract data-mealID, from meal-info class, so we can make request api with idMeal
$("#meals").addEventListener("click", (e) => {
  // check if classList contains meal-info
  const mealInfo = e.path.find((item) => {
    if (item.classList) {
      return item.classList.contains("meal-info");
    } else {
      return false;
    }
  });
  console.log(mealInfo);
  // get attribute data-mealid, then use it to get single maeal by id
  if (mealInfo) {
    const mealID = mealInfo.getAttribute("data-mealid");
    getMealById(mealID);
  }
});
