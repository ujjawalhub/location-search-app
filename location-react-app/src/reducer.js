export const initialState = {
    term: null
};

export const actionTypes = {
    SET_SEARCH_TERM: 'SET_SEARCH_TERM',
    SET_SELECTED_TERM: 'SET_SELECTED_TERM',
    SET_SELECTION_TERM: 'SET_SELECTION_TERM'
}

const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_SEARCH_TERM:
            return {
                ...state,
                term: action.term
            }
        case actionTypes.SET_SELECTED_TERM:
            return {
                ...state,
                selected: action.term
            }
        case actionTypes.SET_SELECTION_TERM:
            return {
                ...state,
                selection: action.term
            }

        default:
            return state;
    }
}

export default reducer;