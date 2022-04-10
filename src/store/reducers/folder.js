import * as Actions from '../actions';
import _ from '@lodash';

const initState = {
    currentFolderId: null,
    folders: []
    // _.merge({}, {})
}

const folder = function (state = initState, action) {
    switch (action.type) {
        case Actions.TYPE_SET_FOLDERS:
            return { ...state, folders: action.folders }
        case Actions.TYPE_INSERT_FOLDER:
            return { ...state, folders: [...state.folders, action.folder] }
        case Actions.TYPE_SET_CURRENT_FOLDER_ID:
            return { ...state, currentFolderId: action.folderId }
        case Actions.TYPE_REMOVE_FOLDER:
            const newFolders = state.folders.filter(folder => {
                return folder.id != action.folderId
            })
            return { ...state, folders: newFolders }
        default:
            return state;
    }
}

export default folder;