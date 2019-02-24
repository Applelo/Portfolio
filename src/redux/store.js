import { createStore } from "redux"
import reducer from "./reducer"
import initialState from './initialState';

const store = () => createStore(
    reducer,
    initialState,
    typeof window !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : noop => noop
);

export default store