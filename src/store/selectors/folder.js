export const selectFolder = state => {
    const rootFolder = state.folder.folders.filter(folder => {
        return state.auth.currentUser.id == folder.user_id && folder.parent_folder_id == state.folder.currentFolderId
    })
    return rootFolder;
};
export const selectCurrentFolderId = state => state.folder.currentFolderId;
export const selectCurrentFolderName = state => {
    const currentFolder = state.folder.folders.find(folder => folder.id === state.folder.currentFolderId);
    const title = currentFolder ? currentFolder.name : 'All';
    return title;
}