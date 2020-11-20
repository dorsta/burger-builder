import * as actionTypes from './actionTypes';
import axios from '../../axios-orders'

export const add = (type) => {
    return {
        type: actionTypes.ADD,
        ingredientType: type,
    }
}

export const remove = (type) => {
    return {
        type: actionTypes.REMOVE,
        ingredientType: type,
    }
}

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const setIngredientsError = (error) => {
    return {
        type: actionTypes.SET_INGREDIENTS_ERROR,
        error: error,
    }
}

export const initIngredients = () => {
    return dispatch => {
    axios
      .get("https://burgur-bildur.firebaseio.com/ingredients.json")
      .then((response) => {
        dispatch(setIngredients(response.data));
      })
      .catch((error) => {
        dispatch(setIngredientsError(error))
      });
    }
}