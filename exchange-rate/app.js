// helper quereSelector
const $ = (el) => document.querySelector(el);

// calculate, fetch exchange rates api and update UI
function calculate() {
  let currency_one = $("#currency-one").value;
  let currency_two = $("#currency-two").value;

  //console.log(currency_one, currency_two);

  fetch(`https://api.exchangeratesapi.io/latest?base=${currency_one}`)
    .then((res) => res.json())
    .then((data) => {
      //console.log(data.rates);
      const rate = data.rates[currency_two];
      $("#rate").innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

      // update input amount-two
      $("#amount-two").value = (+$("#amount-one").value * rate).toFixed(2);
    })
    .catch((err) => console.log(err));
}

// adde events
$("#currency-one").addEventListener("change", calculate);
$("#amount-one").addEventListener("input", calculate);
$("#currency-two").addEventListener("change", calculate);
$("#amount-two").addEventListener("input", calculate);

// swap button event
$("#swap").addEventListener("click", () => {
  const temp = $("#currency-one").value;
  $("#currency-one").value = $("#currency-two").value;
  $("#currency-two").value = temp;
  calculate();
});

calculate();
