import explorerService from "services/explorerService";

export const TYPE_FOLDER_ERROR = "TYPE_FOLDER_ERROR";
export const TYPE_INSERT_FOLDER = "TYPE_INSERT_FOLDER";
export const TYPE_SET_CURRENT_FOLDER = "TYPE_SET_CURRENT_FOLDER";

export function actionGetFolder(title, type = '') {
    return (dispatch) =>
        explorerService.getFolder(title, type)
            .then((folder) => {
                return dispatch({
                    type: TYPE_SET_CURRENT_FOLDER,
                    folder
                });
            })
            .catch(error => {
                return dispatch({
                    type: TYPE_FOLDER_ERROR,
                    error
                });
            });
}
export function actionInsertFolder(createTitle, currentFolderTitle) {
    return (dispatch) =>
        explorerService.createFolder(createTitle, currentFolderTitle)
            .then((folder) => {
                return dispatch({
                    type: TYPE_SET_CURRENT_FOLDER,
                    folder
                });
            })
            .catch(error => {
                return dispatch({
                    type: TYPE_FOLDER_ERROR,
                    error
                });
            });
}