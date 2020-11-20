import * as actionTypes from "../actions/actionTypes";

const initialState = {
    orders: [],
    error: null,
    loading: false,
    purchased: false,
}

const purchaseSuccess = (state, action) => {
    const newOrder = {
        ...action.orderData,
        id: action.orderId,
    }
    return {
        ...state,
        orders: state.orders.concat(newOrder),
        loading: false,
        purchased: true,
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.START_LOADING:return {...state,loading: true,}
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseSuccess(state,action)
        case actionTypes.PURCHASE_BURGER_FAIL: return {...state,loading: false}
        case actionTypes.PURCHASE_INIT:return {...state, purchased: false}
        case actionTypes.FETCH_ORDERS_SUCCESS:return {...state,orders: action.orders,loading: false,}
        case actionTypes.FETCH_ORDERS_FAIL:return { ...state,loading: false,}
        default: return state
    }
}

export default reducer;