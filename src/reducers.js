import {combineReducers} from 'redux';

// initial state for when state isn't present to have a fallback solution
const initialState = {
    list: [],
};

const moviesReducer = (state = initialState, action) => {
    // reducer - always return NEW state, no functionality can be done here
    switch (action.type) {
        case 'SET_MOVIES':
            return {...state, list: action.movies};

        default:
            return state;
    }
};

const genresReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return {...state, list: action.genres};

        default:
            return state;
    }
};

const likesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_LIKES':
            return {...state, list: action.likes};

        default:
            return state;
    }
};

const logsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_LOGS':
            return { ...state, list: action.logs };

        default:
            return state;
    }
};
// rootReducer - connect multiple reducers here
export default combineReducers({
    movies: moviesReducer,
    genres: genresReducer,
    likes: likesReducer,
    logs: logsReducer,
});
