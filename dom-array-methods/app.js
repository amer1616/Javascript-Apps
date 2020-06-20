// helper querSelector
const $ = (el) => document.querySelector(el);

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

async function getRandomUser() {
  try {
    const res = await fetch("https://randomuser.me/api");
    const data = await res.json();
    //console.log(data);
    const user = data.results[0];
    const newUser = {
      name: `${user.name.first} ${user.name.last}`,
      money: Math.floor(Math.random() * 1000000),
    };

    addData(newUser);
  } catch (error) {
    console.log(error);
  }
}

// add new obj to data array
function addData(obj) {
  data.push(obj);
  updateDOM();
}

// double money for each user using arr.map()
function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
}

// sort users by richest
function sortByRichest() {
  data = data.sort((a, b) => b.money - a.money);
  updateDOM();
}

// show milionairs only
function showMilionairs() {
  data = data.filter((user) => user.money > 999999);
  updateDOM();
}

// calculate total wealth
function calculateWealth() {
  const wealth = data.reduce((acc, user) => acc + user.money, 0);
  // console.log(wealth);

  const wealthEl = document.createElement("div");
  wealthEl.innerHTML = `
  <div>
  <h3> Total Wealth: <strong>${formatter.format(wealth)}</strong></h3>
  </div>
  `;
  $("main").appendChild(wealthEl);
}
// update dom when you add user
function updateDOM(providedData = data) {
  //clear main div
  $("main").innerHTML = `<h2><strong>Person</strong>Wealth</h2>`;
  providedData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<h2><strong>${item.name}</strong>${formatter.format(
      item.money
    )}</h2>`;
    $("main").appendChild(element);
  });
}

// formating money with built-in formatter in js
let formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

// add events addUser
$("#add-user").addEventListener("click", getRandomUser);
$("#double").addEventListener("click", doubleMoney);
$("#sort").addEventListener("click", sortByRichest);
$("#show-millionairs").addEventListener("click", showMilionairs);
$("#calculate-wealth").addEventListener("click", calculateWealth);
