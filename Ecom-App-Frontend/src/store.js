import { applyMiddleware, legacy_createStore as createStore } from "redux";
import rootreducers from "./redux/reducers/main";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension'


const middleware = [thunk]

const store = createStore(
    rootreducers,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;