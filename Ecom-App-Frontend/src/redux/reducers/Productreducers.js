

const products = [];

export const getProducsReducers = (state = {products}, action) => {
    switch(action.types){
        case "SUCCESS_GET_PRODUCTS":
            return {products:action.payload}
        case "FAIL_GET_PRODUCTS":
            return {error:action.payload}
        default : return state
    }
}