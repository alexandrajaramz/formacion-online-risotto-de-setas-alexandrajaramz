'use strict';

const form = document.querySelector('.main-form');
const dish = document.querySelector('.header-title');
const shipping = document.querySelector('.shipping-quantity');

let currentRecipe = {};

function renderSingleProduct(product, currency) {
  const name = product.product;
  const brand = product.brand || '';
  return `<fieldset class="form__fieldset">
            <div class="checkbox-wrapper">
              <input
                type="checkbox"
                value=${name}
                name="ingredients"
                class="form-checkbox"
                checked=${product.selected}
              />
            </div>
            <div class="input-wrapper">
              <input
                type="number"
                value="${product.items}"
                class="form-input"
              />
            </div>
            <ul class="product-info">
              <li class="product-name">${name}</li>
              <li class="product-brand">${brand}</li>
              <li class="product-quantity">${product.quantity}</li>
            </ul>
            <p class="price">${product.price} ${currency}</p>
          </fieldset>`;
}

function renderRecipe(recipe) {
  let recipeName = recipe.name;
  let shippingCost = recipe['shipping-cost'];
  let currency = recipe.currency;
  const products = recipe.ingredients.reduce((acc, item) => {return acc + renderSingleProduct(item, currency);}, '');

  form.innerHTML = products;
  dish.innerHTML = recipeName;
  shipping.innerHTML = `${shippingCost} ${currency}`;

  const formCheckbox = document.querySelector('.form-checkbox');
  formCheckbox.addEventListener('click', onIngredientSelected);
}

function loadIngredients() {
  const loader = new IngredientLoader();
  loader.findById('rissoto-setas')

    .then(recipe => {
      currentRecipe = recipe;
      renderRecipe(recipe);
    });
}

loadIngredients();

function onIngredientSelected(e) {
  const ingredient = e.target.value;
  currentRecipe.ingredients = [];
  renderRecipe(currentRecipe);
  console.log(currentRecipe);
}
