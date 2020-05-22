import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
}

const INGREDIENT_PRICES = {
    salad: 0.4,
    cheese: 0.9,
    bacon: 1.4,
    meat: 2.1
}

const addIngredient = (state, action) => {
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };//this not not creted an array , it will be the name of the property name you want ES6
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    return updateObject(state, updatedState);
}

const removeIngredient = (state, action) => {
    const updatedIngr = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 };//this not not creted an array , it will be the name of the property name you want ES6
    const updatedIngrs = updateObject(state.ingredients, updatedIngr);
    const updatedSt = {
        ingredients: updatedIngrs,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    return updateObject(state, updatedSt);
}

const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: {
            //This so when we save the data to our store and when we add the ingredients in our burger (on the UI), it has the ingredients in the exact order
            //The downside with this is that we only support these exact four ingredients
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        totalPrice: 4,
        error: false,
        building: false
    })
}

const fetchIngredientsFailed = (state, action) => {
    return updateObject(state, { error: true });
}

const ingredients = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return addIngredient(state, action);
        //***THIS IS WHAT WE HAD BEFORE USING THE UTILITY FUNCTION updateObject
        // return {
        //     ...state,
        //     ingredients: {
        //         ...state.ingredients,
        //         [action.ingredientName]: state.ingredients[action.ingredientName] + 1//this not not creted an array , it will be the name of the property name you want ES6
        //     },
        //     totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
        // }
        // ******* THE CODE ABOVE DOESWHAT THE CODE BELLOW DOES ******
        // const oldCount = state.ingredients[action.ingredientType];
        // const updatedCount = oldCount + 1;
        // const updatedIngredients = {
        //     ...state.ingredients
        // }
        // updatedIngredients[action.ingredientType] = updatedCount;
        // const oldPrice = state.totalPrice;
        // const updatedPrice = oldPrice + INGREDIENT_PRICES[action.ingredientType];
        // return {
        //     ...state,
        //     ingredients: updatedIngredients,
        //     totalPrice: updatedPrice
        // }
        case actionTypes.REMOVE_INGREDIENT:
            return removeIngredient(state, action);
        //***THIS IS WHAT WE HAVE BEFORE USING UTILITY FUNCTION LIKE ABOVE
        // return {
        //     ...state,
        //     ingredients: {
        //         ...state.ingredients,
        //         [action.ingredientName]: state.ingredients[action.ingredientName] - 1//this not not creted an array , it will be the name of the property name you want ES6
        //     },
        //     totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
        // }
        case actionTypes.SET_INGREDIENT:
            return setIngredients(state, action);
        case actionTypes.FETCH_INGREDIENT_FAILED:
            return fetchIngredientsFailed(state, action);
        default:
            return state;
    }
}

export default ingredients;