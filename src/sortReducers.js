import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";

//Action Constants
const SET_SPEED = "SET_SPEED";
const SET_CUSTOM_ARRAY = "SET_CUSTOM_ARRAY";
const SET_DEFAULT_ARAY = "SET_DEFAULT_ARRAY";
const SET_SORT_STYLE = "SET_SORT_STYLE";
const RESET_ALL = "RESET_ALL";

//Action Creator
export const setSpeedCreator = speed => {
	return {
		type: SET_SPEED,
		speed
	};
};

export const setArrayCreator = array => {
	return {
		type: SET_CUSTOM_ARRAY,
		array
	};
};

export const setDefaultArrayCreator = array => {
	return {
		type: SET_DEFAULT_ARAY,
		array
	};
};

export const sortStyleCreator = style => {
	return {
		type: SET_SORT_STYLE,
		style
	};
};

export const resetCreator = () => {
	return {
		type: RESET_ALL
	};
};

//Thunk Creator

export const setSpeed = speed => {
	return dispatch => {
		dispatch(setSpeedCreator(speed));
	};
};

export const setCustomArray = array => {
	return dispatch => {
		dispatch(setArrayCreator(array));
	};
};

export const setDefaultArray = array => {
	return dispatch => {
		dispatch(setDefaultArrayCreator(array));
	};
};

export const setSortStyle = style => {
	return dispatch => {
		dispatch(sortStyleCreator(style));
	};
};

export const resetAll = () => {
	return dispatch => {
		dispatch(resetCreator());
	};
};

//Reducer
const initialState = {
	numArr: [],
	sortStyle: "",
	arrayBars: [],
	animSpeed: 1
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case RESET_ALL:
			return initialState;
		case SET_SPEED:
			return { ...state, animSpeed: action.speed };
		case SET_CUSTOM_ARRAY:
			return { ...state, arrayBars: [...state, action.array] };
		case SET_DEFAULT_ARAY:
			return { ...state, numArr: action.array };
		case SET_SORT_STYLE:
			return { ...state, sortStyle: action.style };
		default:
			return state;
	}
};

let middleware = [thunkMiddleware, createLogger({ collapsed: true })];

export default createStore(reducer, applyMiddleware(...middleware));
