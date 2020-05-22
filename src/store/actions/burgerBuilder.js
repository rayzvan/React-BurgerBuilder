import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

//we apply the convention of having the action creator name just as the identifier (ADD_INGREDIENT)
export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}

//This is the action we want to dispatch once the async code in initIngredients is done
export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENT,
        ingredients: ingredients
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENT_FAILED
    }
}

export const initIngridients = () => {
    // this syntax is availabla with redux-thunk which allows me to use my action creators like this
    return dispatch => {//TODO Fix problem where spinner is showing when the error occures for not getting data
        axios.get('https://react-burger-6687a.firebaseio.com/ingredients.json')
            .then(response => {
                dispatch(setIngredients(response.data));
            })
            .catch(error => {
                dispatch(fetchIngredientsFailed());
            })
    }
}