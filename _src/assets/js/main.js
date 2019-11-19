'use strict';

const form = document.querySelector('.main-form');
const recipeTitle = document.querySelector('.header-title');
const shipping = document.querySelector('.shipping-quantity');


let currentRecipe = {};

function loadRecipe() {
  const loader = new RecipeLoader();
  loader.findById('rissoto-setas')

    .then(recipe => {
      currentRecipe = recipe;
      renderRecipe(recipe);
    });
}

loadRecipe();

function renderRecipe(recipe) {
  let recipeName = recipe.name;
  let shippingCost = recipe['shipping-cost'];
  let currency = recipe.currency;
  const products = recipe.ingredients.reduce((acc, item) => {return acc + renderSingleProduct(item, currency);}, '');

  form.innerHTML = products;
  recipeTitle.innerHTML = recipeName;
  shipping.innerHTML = `${shippingCost} ${currency}`;

  //problem: listener not working, says its null
  const formCheckbox = document.querySelector('.form-checkbox');
  formCheckbox.addEventListener('click', onIngredientSelected);
}

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

function onIngredientSelected(e) {
  const ingredient = e.target.value;
  currentRecipe.ingredients = [];
  renderRecipe(currentRecipe);
  console.log(ingredient);
}
