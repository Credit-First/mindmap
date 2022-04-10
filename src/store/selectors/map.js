export const selectMapList = state => {
    const maplist = state.map.list.filter(map => {
        return map.folder_id == state.folder.currentFolderId && map.user_id == state.auth.currentUser.id;
    })
    return maplist;
}
export const selectCurrentMap = state => state.map.current_map;