//SET_TEXT_FILTER

export const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
})

export const setError = (error = '') => ({
    type: 'SET_ERROR',
    error
})