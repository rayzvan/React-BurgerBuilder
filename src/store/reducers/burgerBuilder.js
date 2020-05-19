import * as actionTypes from '../actions/actionTypes'

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
}

const INGREDIENT_PRICES = {
    salad: 0.4,
    cheese: 0.9,
    bacon: 1.4,
    meat: 2.1
}

const ingredients = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1//this not not creted an array , it will be the name of the property name you want ES6
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            }
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
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1//this not not creted an array , it will be the name of the property name you want ES6
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            }
        case actionTypes.SET_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    //This so when we save the data to our store and when we add the ingredients in our burger (on the UI), it has the ingredients in the exact order
                    //The downside with this is that we only support these exact four ingredients
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat
                },
                totalPrice: 4,
                error: false
            }
        case actionTypes.FETCH_INGREDIENT_FAILED:
            return {
                ...state,
                error: true
            }
        default:
            return state;
    }
}

export default ingredients;