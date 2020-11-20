import * as actionTypes from "../actions/actionTypes";

const initialState = {
  ingredients: null,
  totalPrice: 4,
  purchasable: false,
  error: null,
  isBuilding: false,
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.8,
  bacon: 1,
  meat: 1.5,
};

const updatePurchaseState = (ingredients) => {
  const sum = Object.keys(ingredients)
    .map((key) => ingredients[key])
    .reduce((accumulator, currentValue) => accumulator + currentValue);

  return sum > 0;
};

const addIngredient = (state, action) => {
  const updatedCount = state.ingredients[action.ingredientType] + 1;
  const updatedIngredients = { ...state.ingredients };
  updatedIngredients[action.ingredientType] = updatedCount;
  const newPrice =
    state.totalPrice + INGREDIENT_PRICES[action.ingredientType];
  return {
    ...state,
    ingredients: updatedIngredients,
    totalPrice: newPrice,
    purchasable: updatePurchaseState(updatedIngredients),
  };
}

const removeIngredient = (state, action) => {
  if (state.ingredients[action.ingredientType] !== 0) {
    const updatedCount = state.ingredients[action.ingredientType] - 1;
    const updatedIngredients = { ...state.ingredients };
    updatedIngredients[action.ingredientType] = updatedCount;
    const newPrice =
      state.totalPrice - INGREDIENT_PRICES[action.ingredientType];
    return {
      ...state,
      ingredients: updatedIngredients,
      totalPrice: newPrice,
      purchasable: updatePurchaseState(updatedIngredients),
    };
  } else {
    return state;
  }
}

const setIngredients = (state, action) => {
  return {
    ...state,
    ingredients: {
      bacon: action.ingredients.bacon,
      salad: action.ingredients.salad,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat,
    },
    purchasable: updatePurchaseState(action.ingredients),
    totalPrice: 4,
    isBuilding: true,
  };
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD: return addIngredient(state,action)
    case actionTypes.REMOVE: return removeIngredient(state, action)
    case actionTypes.SET_INGREDIENTS: return setIngredients(state, action)
    case actionTypes.SET_INGREDIENTS_ERROR: return {...state, error: action.error,};
    default:return state;
  }
};

export default reducer;
