import explorerService from "services/explorerService";

export const TYPE_FOLDER_ERROR = "TYPE_FOLDER_ERROR";
export const TYPE_INSERT_FOLDER = "TYPE_INSERT_FOLDER";
export const TYPE_SET_FOLDERS = "TYPE_SET_FOLDERS";
export const TYPE_SET_CURRENT_FOLDER_ID = "TYPE_SET_CURRENT_FOLDER_ID";
export const TYPE_REMOVE_FOLDER = "TYPE_REMOVE_FOLDER";

export function actionGetFolders() {
    return (dispatch) =>
        explorerService.getFolder()
            .then((folders) => {
                return dispatch({
                    type: TYPE_SET_FOLDERS,
                    folders
                });
            })
            .catch(error => {
                return dispatch({
                    type: TYPE_FOLDER_ERROR,
                    error
                });
            });
}
export const actionGetFoldersById = (folderId) => ({
    type: TYPE_SET_CURRENT_FOLDER_ID,
    folderId
})
export function actionInsertFolder(name, description, user_id, parent_folder_id) {
    return (dispatch) =>
        explorerService.createFolder(name, description, user_id, parent_folder_id)
            .then((folder) => {
                return dispatch({
                    type: TYPE_INSERT_FOLDER,
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
export function actionDeleteFolder(folderId) {
    return (dispatch) =>
        explorerService.deleteFolder(folderId)
            .then(() => {
                return dispatch({
                    type: TYPE_REMOVE_FOLDER,
                    folderId
                });
            })
            .catch(error => {
                return dispatch({
                    type: TYPE_FOLDER_ERROR,
                    error
                });
            });
}