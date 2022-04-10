import explorerService from "services/explorerService";

export const TYPE_MAP_ERROR = "TYPE_MAP_ERROR";
export const TYPE_SET_MAP_LIST = "TYPE_SET_MAP_LIST";
export const TYPE_CREATE_MAP = "TYPE_CREATE_MAP";
export const TYPE_UPDATE_MAP = "TYPE_UPDATE_MAP";
export const TYPE_SET_CURRENT_MAP = "TYPE_SET_CURRENT_MAP";
export const TYPE_REMOVE_MAP = "TYPE_REMOVE_MAP";

export function actionCreateMap(data) {
    return (dispatch) =>
        explorerService.createMap(data)
            .then((map) => {
                return dispatch({
                    type: TYPE_CREATE_MAP,
                    map
                })
            })
            .catch(error => {
                return dispatch({
                    type: TYPE_MAP_ERROR,
                    error
                });
            })
}
export function actionUpdateMap(data) {
    return (dispatch) =>
        explorerService.updateMap(data)
            .then((map) => {
                return dispatch({
                    type: TYPE_UPDATE_MAP,
                    map
                })
            })
            .catch(error => {
                return dispatch({
                    type: TYPE_MAP_ERROR,
                    error
                });
            })
}
export function actionGetMap(folderId) {
    return (dispatch) =>
        explorerService.getMap(folderId)
            .then((mapList) => {
                return dispatch({
                    type: TYPE_SET_MAP_LIST,
                    mapList
                });
            })
            .catch(error => {
                return dispatch({
                    type: TYPE_MAP_ERROR,
                    error
                });
            });
}
export const actionSelectMap = (mapId) => ({
    type: TYPE_SET_CURRENT_MAP,
    mapId
})
export function actionDeleteMap(mapId) {
    return (dispatch) =>
        explorerService.deleteMap(mapId)
            .then(() => {
                return dispatch({
                    type: TYPE_REMOVE_MAP,
                    mapId
                });
            })
            .catch(error => {
                return dispatch({
                    type: TYPE_MAP_ERROR,
                    error
                });
            });
}
export function actionInsertItemsToFolder(mapTitle, folderTitle, currentFolderTitle, moveType) {
    return (dispatch) =>
        explorerService.updateMap(mapTitle, folderTitle, currentFolderTitle, moveType)
            .then((mapList) => {
                return dispatch({
                    type: TYPE_SET_MAP_LIST,
                    mapList
                });
            })
            .catch(error => {
                return dispatch({
                    type: TYPE_MAP_ERROR,
                    error
                });
            });
}
