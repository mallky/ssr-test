import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import {createWrapper} from 'next-redux-wrapper';
import data from './data/data.json';


const startState = {
	cards: [],
};

// Actions
export const INITIAL_CARDS = 'INITIAL_CARDS';
export const ADD_ITEM = 'ADD_ITEM';

export const initialCards = () => {
	return {
		type: INITIAL_CARDS,
		cards: data
	}
}

export const addItem = (item) => {
	return {
		type: ADD_ITEM,
		item,
	}
}

// Reducers
export const reducer = (state = startState, action) => {
	switch (action.type) {
		case INITIAL_CARDS: {
			return {
				...state,
				cards: action.cards
			}
		}
		case ADD_ITEM: {
			return {
				cards: [...state.cards, action.item]
			}
		}
		default:
			return state;
	}
}

// Store
const initStore = (initialState = startState) => {
	return createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)));
}

export const wrapper = createWrapper(initStore);
