import * as Actions from '../actions';

const initState = {
    list: [],
    current_map: null
}

const map = function (state = initState, action) {
    switch (action.type) {
        case Actions.TYPE_SET_MAP_LIST:
            return { ...state, list: [...action.mapList] }
        case Actions.TYPE_CREATE_MAP:
            return { ...state, current_map: action.map, list: [...state.list, action.map] }
        case Actions.TYPE_UPDATE_MAP:
            const newMapList = state.list.filter(map => map.id != action.map.id);
            return { ...state, current_map: action.map, list: [...newMapList, action.map] }
        case Actions.TYPE_SET_CURRENT_MAP:
            const curMap = state.list.find(map => map.id == action.mapId);
            return { ...state, current_map: curMap }
        case Actions.TYPE_REMOVE_MAP:
            const newMaps = state.list.filter(map => {
                return map.id != action.mapId
            })
            return { ...state, list: newMaps }
        default:
            return state;
    }
}

export default map;