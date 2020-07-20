const initialState = {
    text: '',
    error: ''
}

export default (state = initialState, { type, text, error }) => {
    switch (type) {

        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: text
            }

        case 'SET_ERROR':
            return {
                ...state,
                error: error
            }


        default:
            return state
    }
}
