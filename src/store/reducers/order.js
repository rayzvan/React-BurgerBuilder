import * as actionTypes from '../actions/actionTypes'

const initialState = {
    orders: [],
    loading: false,
    purchased: false// THIS CHANGES AS SOON AS WE DID SUCCESFULLY PURCHASED, BUT IS ALWAYS RESET WHEN WE VISIT THE CHECKOUT CONTAINER
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return{
                ...state,
                purchased: false
            }
        case actionTypes.PURCHASE_BURGER_START:
            return{
                ...state,
                loading: true
            }
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            }
            return {
                ...state,
                loading: false,
                purchased: true,
                orders: state.orders.concat(newOrder)
            };
        case actionTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
}

export default reducer;