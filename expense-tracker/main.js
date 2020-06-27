// helper
const $ = (el) => document.querySelector(el);

let incTitle = $("#inc-title");
let incAmount = $("#inc-amount");
let expTitle = $("#exp-title");
let expAmount = $("#exp-amount");
// let data = [
//   { id: 1, title: "Flower", amount: -20 },
//   { id: 2, title: "Salary", amount: +2000 },
//   { id: 3, title: "Greocery", amount: -100 },
//   { id: 4, title: "Book", amount: -20 },
// ];

const localStorageTaransactions = JSON.parse(
  localStorage.getItem("transactions")
);

let transactions =
  localStorage.getItem("transactions") !== null
    ? localStorageTaransactions
    : [];

// console.log(transactions);

// add transaction income item to DOM list
function addTransactionDOM({ title, amount }) {
  let sign, signClass;

  //console.log(title, amount);
  signClass = amount > 0 ? "plus" : "minus";
  sign = amount > 0 ? "+" : "-";

  const item = document.createElement("li");
  item.classList.add(signClass);
  item.innerHTML = `
  ${title} <span class="history-amount">${sign}${Math.abs(amount)}</span>
  <button class="remove-btn" id="remove-btn">X</button>
  `;
  $(".list").appendChild(item);

  document.querySelectorAll("input").forEach((input) => {
    // console.log(input);
    input.value = "";
  });
}

// update values of balance, income, expense
function updateValues() {
  const amounts = transactions.map((trans) => trans.amount);
  // console.log(amounts);
  const total = amounts
    .reduce((acc, amount) => (acc += Number(amount)), 0)
    .toFixed(2);
  // console.log(total);

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  // console.log(income);

  const expense = amounts
    .filter((item) => item < 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  // console.log(expense);
  $("#balance").innerHTML = `$${total}`;
  $("#inc-money").innerHTML = `$+${income}`;
  $("#exp-money").innerHTML = `$${expense}`;
}
// add Transaction
function addTransaction(e) {
  e.preventDefault();
  let title, amount, transaction;
  const generateId = () => Math.floor(Math.random() * 100000);

  if (this.classList.contains("inc-btn")) {
    if (incTitle.value.trim() !== "" || incAmount.value.trim() !== "") {
      title = incTitle.value;
      amount = incAmount.value;
      transaction = { id: generateId(), title, amount: Number(amount) };
      transactions.push(transaction);
      addTransactionDOM(transaction);
    } else {
      alert("Please Enter Values");
    }
  } else {
    if (expTitle.value.trim() !== "" || expAmount.value.trim() !== "") {
      title = expTitle.value;
      amount = -expAmount.value;
      transaction = { id: generateId(), title, amount: Number(amount) };
      transactions.push(transaction);
      addTransactionDOM(transaction);
    } else {
      alert("Please Enter Values");
    }
  }

  updateLocalStorage();
  updateValues();
}

// remove transaction by id
function removeTransaction(id, e) {
  e.preventDefault();

  transactions = transactions.filter((trans) => trans.id !== id);
  updateLocalStorage();
  initDOM();
}

// update localStorage
const updateLocalStorage = () =>
  localStorage.setItem("transactions", JSON.stringify(transactions));

// adding transactions data into DOM
function initDOM() {
  // first empty list
  $(".list").innerHTML = "";

  transactions.forEach(addTransactionDOM);
  updateValues();
}

initDOM();

$("#inc-btn").addEventListener("click", addTransaction);
$("#exp-btn").addEventListener("click", addTransaction);
$("#remove-btn").addEventListener("click", removeTransaction);
