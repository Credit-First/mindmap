import * as Actions from '../actions';

const initState = {
    sortType: 'grid',
    upgradeType: false
}

const layout = function (state = initState, action) {
    switch (action.type) {
        case Actions.TYPE_SET_SORT_TYPE:
            return { ...state, sortType: action.sortType }
        case Actions.TYPE_SET_UPGRADE_TYPE:
            return { ...state, upgradeType: action.upgradeType }
        default:
            return state;
    }
}

export default layout;