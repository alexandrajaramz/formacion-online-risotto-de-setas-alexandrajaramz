'use strict';

const form = document.querySelector('.main-form');
const dish = document.querySelector('.header-title');
const shipping = document.querySelector('.shipping-quantity');

function loadIngredients () {
  const ENDPOINT = 'https://raw.githubusercontent.com/Adalab/recipes-data/master/rissoto-setas.json';
  fetch(ENDPOINT)
    .then(response => response.json())
    .then(data => {
      let products = '';
      let recipeName = data.recipe.name;
      let shippingCost = data.recipe['shipping-cost'];
      console.log(shippingCost);
      let currency = data.recipe.currency;
      for (const item of data.recipe.ingredients) {
        let product = item.product;
        let brand = '';
        if (item.brand === undefined) {
          brand = '';
        } else {
          brand = item.brand;
        }
        let items = item.items;
        let quantity = item.quantity;
        let price = item.price;

        products += `<fieldset>
                      <div>
                        <input
                          type="checkbox"
                          value=${product}
                          name="ingredients"
                        />
                      </div>
                      <div>
                        <input type="number" value="1"/>
                      </div>
                      <ul>
                        <li>${product}</li>
                        <li>${brand}</li>
                        <li>${quantity}</li>
                      </ul>
                      <p>${price} ${currency}</p>
                    </fieldset>`;
      }
      form.innerHTML = products;
      dish.innerHTML = recipeName;
      shipping.innerHTML = `${shippingCost} ${currency}`;
    });
}

loadIngredients ();
