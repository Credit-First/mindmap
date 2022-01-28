import * as Actions from '../actions';

const initState = {
    list: []
}

const map = function (state = initState, action) {
    switch (action.type) {
        case Actions.TYPE_SET_CURRENT_MAP:
            return { ...state, list: [...action.mapList] }
        default:
            return state;
    }
}

export default map;