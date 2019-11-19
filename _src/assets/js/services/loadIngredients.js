'use strict';

function RecipeLoader() {
  const ENDPOINT = 'https://raw.githubusercontent.com/Adalab/recipes-data/master/';

  const findById = (id) => {
    return fetch(ENDPOINT+id+'.json')
      .then(response => response.json())
      .then(data => data.recipe);
  };

  return {
    findById: findById
  };
}
