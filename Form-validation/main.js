// console.log("working");

// helper function for querySelector
const $ = (el) => document.querySelector(el);

// errors list
const errorList = [
  "Enter Username!",
  "Enter valid email!",
  "Password must be at least 6 characters!",
  "Password is not matching!",
];

const inputs = [username, email, password, password2];

// showError(input, msg)
function showError(input, msg) {
  const formControl = input.parentElement;
  // console.log(formControl);

  input.className = "b pa2 input-reset bg-transparent ba b--dark-red bw1 grow";
  const small = formControl.querySelector("small");
  // console.log(small);
  small.className = "f6 red db mb2 error-on";
  small.innerText = msg;
}
// show success function
function showSuccess(input) {
  const formControl = input.parentElement;
  input.className = "b pa2 input-reset bg-transparent ba b--green bw1 grow";
  const small = formControl.querySelector("small");
  small.className = "error-off";
}

// check email Validation w/ regex
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //return re.test(String(email).toLowerCase());
  if (re.test(String(input.value.trim()).toLowerCase())) {
    showSuccess(input);
  } else {
    showError(input, `${getFieldName(input)} is not valid!`);
  }
}

// check Required fields function, accepting array of inputs as params
function checkRequired(inputArr) {
  inputArr.forEach((input) => {
    //console.log(input.value);

    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required!`);
    } else {
      showSuccess(input);
    }
  });
}
// check field input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

// check 2 passwords
function checkPasswords(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Passwords do not match!");
  }
}
// get field name of input.id with first letter in upper case
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// addeventListerner for form submit
$("form").addEventListener("submit", function (e) {
  e.preventDefault();
  //console.log("sumitted");

  // checkRequired function, accepting array of inputs as params
  checkRequired(inputs);
  checkLength(username, 6, 12);
  checkLength(password, 6, 20);
  checkEmail(email);
  checkPasswords(password, password2);
});
