import { FETCH_FIND_FAIL, FETCH_FIND_REQUEST, FETCH_FIND_SUCCESS } from '../constants';

const findReducer = (state = {}, action) => {

    switch (action.type) {
        case FETCH_FIND_REQUEST:
            return { loading: true }
        case FETCH_FIND_SUCCESS:
            return { loading: false, data: action.payload, error: false }
        case FETCH_FIND_FAIL:
            console.log(`FETCH_FIND_FAIL: ${action.payload}`);
            return { loading: false, data: action.payload.data, error: action.payload.error }
        default:
            return state
    }
}

export { findReducer }