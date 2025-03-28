import { createStore } from "redux";

import ProductReducer from "./reducers";

const store = createStore(ProductReducer);

export default store;
