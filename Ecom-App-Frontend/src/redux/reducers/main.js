import { getProducsReducers } from "./Productreducers";
import { combineReducers } from "redux"
 

const rootreducers = combineReducers({
    getproductsdata : getProducsReducers
})

export default rootreducers;