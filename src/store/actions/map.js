import explorerService from "services/explorerService";

export const TYPE_MAP_ERROR = "TYPE_MAP_ERROR";
export const TYPE_SET_CURRENT_MAP = "TYPE_SET_CURRENT_MAP";

export function actionGetMap(folderTitle) {
    return (dispatch) =>
        explorerService.getMap(folderTitle)
            .then((mapList) => {
                return dispatch({
                    type: TYPE_SET_CURRENT_MAP,
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
export function actionInsertItemsToFolder(mapTitle, folderTitle, currentFolderTitle, moveType) {
    return (dispatch) =>
        explorerService.updateMap(mapTitle, folderTitle, currentFolderTitle, moveType)
            .then((mapList) => {
                return dispatch({
                    type: TYPE_SET_CURRENT_MAP,
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
