import * as Actions from '../actions';
import _ from '@lodash';

const initState = {
    title: null,
    dir: [
    ]
    // _.merge({}, {})
}

const folder = function (state = initState, action) {
    switch (action.type) {
        case Actions.TYPE_SET_CURRENT_FOLDER:
            return {...state, title: action.folder.title, dir: [...action.folder.dir]}
        default:
            return state;
    }
}

export default folder;