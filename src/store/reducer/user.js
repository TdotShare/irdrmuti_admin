const initialState = {
    data: {},
    authenticate: false,
    date: null
}

const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case 'addUser':
            return {
                ...state,
                data: action.payload
            }
        case 'deleteUser':
            return {
                ...state,
                data: {}
            }
        case 'loginAuth':
            return {
                ...state,
                authenticate: true
            }
        case 'logoutAuth':
            return {
                ...state,
                authenticate: false
            }
        case 'addDateLogin':
            return {
                ...state,
                date: action.payload
            }
        case 'clearDateLogin':
            return {
                ...state,
                date: null
            }
        default:
            return state
    }
}

export default reducer;