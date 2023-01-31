// const taxRate = 0.18;
// const shipping = 15;
// const shippingFreePrice = 300;

window.addEventListener("load", () => {
  // localStorage.setItem("taxRate", taxRate);
  // localStorage.setItem("shipping", shipping);
  // localStorage.setItem("shippingFreePrice", shippingFreePrice);
  calculateCartTotal();
});

const productsDiv = document.querySelector(".products");

productsDiv.addEventListener("click", (e) => {
  if (
    e.target.className ===
    "fa-solid fa-minus border border-dark rounded col-1 h-25 mt-2 pe-4 btn"
  ) {
    if (e.target.nextElementSibling.innerText > 1) {
      e.target.nextElementSibling.innerText--;
      calculateProductTotal(e.target);
    } else {
      if (
        confirm(
          `${
            e.target.closest(".product-info").querySelector("h4").innerText
          } will be remove!`
        )
      ) {
        e.target.closest(".product").remove();
      }
    }
    calculateCartTotal();
  } else if (e.target.getAttribute("id") === "arti") {
    e.target.previousElementSibling.innerText++;
    calculateProductTotal(e.target);
    calculateCartTotal();
  } else if (e.target.classList.contains("remove-btn")) {
    if (
      confirm(
        `${
          e.target.closest(".product-info").querySelector("h4").innerText
        } will be remove!!`
      )
    ) {
      e.target.closest(".product").remove();
    }

    calculateCartTotal();
  }
});

const calculateProductTotal = (target) => {
  const productInfoDiv = target.closest(".product-info");

  const quantity = productInfoDiv.querySelector(".quantity").innerText;

  const price = productInfoDiv.querySelector(".product-price-strong").innerText;

  productInfoDiv.querySelector(".product-total-price").innerText = (
    quantity * price
  ).toFixed(2);
};

const calculateCartTotal = () => {
  let subtotal = 0;

  const productTotalPrice = document.querySelectorAll(".product-total-price");

  productTotalPrice.forEach((div) => {
    subtotal += parseFloat(div.innerText);
  });

  const taxRate = localStorage.getItem("taxRate") * subtotal;
  const shippingPrice = parseFloat(
    subtotal > 0 && subtotal < localStorage.getItem("shippingFreePrice")
      ? localStorage.getItem("shipping")
      : 0
  );
  const total = subtotal + taxRate + shippingPrice;

  document.getElementById("cart-subtotal").children[1].innerText =
    "$" + subtotal.toFixed(2);

  document.getElementById("cart-tax").lastElementChild.innerText =
    "$" + taxRate.toFixed(2);

  document.getElementById(
    "cart-shipping"
  ).firstElementChild.nextElementSibling.innerText =
    "$" + shippingPrice.toFixed(2);

  document.getElementById("cart-total").children[1].innerText =
    "$" + total.toFixed(2);
};
