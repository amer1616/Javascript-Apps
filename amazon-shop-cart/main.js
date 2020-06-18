// amazon shopping cart written in functional programming paradigm

const user = {
  name: "Kim",
  active: true,
  cart: [],
  purchases: [],
};

//compose all functions with functional composition, starting from right to left, where args are data passed
const compose = (f, g) => (...args) => f(g(...args));

// compose all functions, with unkown number, ...fns, into one with reduce
function purchaseItem(...fns) {
  return fns.reduce(compose);
}

// functions start from bottom to top
const purchased = purchaseItem(
  emptyCart,
  buyItem,
  addTaxToItem,
  addItemToCart
)(user, { name: "laptop", price: 200 });

function addItemToCart(user, item) {
  const updatedCart = user.cart.concat(item);
  // using Object.assign() to copy all updated cart to object user
  return Object.assign({}, user, { cart: updatedCart });
}

function addTaxToItem(user) {
  const txRate = 1.3;
  const updatedCart = user.cart.map((item) => {
    return {
      name: item.name,
      price: item.price * txRate,
    };
  });
  return Object.assign({}, user, { cart: updatedCart });
}

function buyItem(user) {
  return Object.assign({}, user, { purchases: user.cart });
}

function emptyCart(user) {
  return Object.assign({}, user, { cart: [] });
}

console.log(purchased);
