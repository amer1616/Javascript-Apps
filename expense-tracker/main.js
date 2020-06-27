// helper
const $ = (el) => document.querySelector(el);

// let data = [
//   { id: 1, text: "Flower", amount: -20 },
//   { id: 2, text: "Salary", amount: +2000 },
//   { id: 3, text: "Greocery", amount: -100 },
//   { id: 4, text: "Book", amount: -20 },
// ];

const localStorageTaransactions = localStorage.getItem("transactions");

let transactions =
  localStorage.getItem("transactions") !== null
    ? localStorageTaransactions
    : [];

// update localStorage
const updateLocalStorage = localStorage.setItem(
  "transactions",
  JSON.stringify(transactions)
);

// console.log(transactions);

// add transaction income item to DOM list
function addTransactionDOM(e) {
  e.preventDefault();
  let title;
  let amount;
  let sign, signClass;

  if (this.classList.contains("inc-btn")) {
    title = $("#inc-title").value;
    amount = $("#inc-amount").value;
    signClass = "plus";
    sign = "+";
  } else {
    title = $("#exp-title").value;
    amount = $("#exp-amount").value;
    signClass = "minus";
    sign = "-";
  }

  //console.log(title, amount);

  const item = document.createElement("li");
  item.classList.add(signClass);
  item.innerHTML = `
  ${title} <span class="history-amount">${sign}${Math.abs(amount)}</span>
  <button class="remove-btn" id="remove-btn">X</button>
  `;
  $(".list").appendChild(item);
  // adding
  let newId = transactions.length + 1;
  // console.log(newId);
  let updAmount = `${sign}${Math.abs(amount)}`;
  // console.log(updAmount);

  transactions.push({ id: newId, title, amount: Number(updAmount) });

  document.querySelectorAll("input").forEach((input) => {
    // console.log(input);
    input.value = "";
  });
  updateValues();
}

// update values of balance, income, expense
function updateValues() {
  if (transactions.length) {
    const amounts = transactions.map((trans) => trans.amount);
    console.log(amounts);
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
}

// remove transaction by id
function removeTransaction() {}
function initTransactionsDOM() {
  // first init
  // $(".list").innerHTML = "";
  // transactions.forEach(addTransactionDOM);
  // updateValues();
}

$("#inc-btn").addEventListener("click", addTransactionDOM);
$("#exp-btn").addEventListener("click", addTransactionDOM);

updateValues();
