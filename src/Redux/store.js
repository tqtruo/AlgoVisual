import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { sortReducer } from "./sortReducers";

let middleware = [thunkMiddleware, createLogger({ collapsed: true })];

const RESET_ALL = "RESET_ALL";

export const resetCreator = () => {
	return {
		type: RESET_ALL
	};
};

export const resetAll = () => {
	return dispatch => {
		dispatch(resetCreator());
	};
};

const rootReducer = (state, action) => {
	if (action.type === RESET_ALL) {
		state = undefined;
		return sortReducer(state, action);
	}
	return sortReducer(state, action);
};

export default createStore(rootReducer, applyMiddleware(...middleware));
