export const TYPE_SET_SORT_TYPE = "TYPE_SET_SORT_TYPE";
export const TYPE_SET_UPGRADE_TYPE = "TYPE_SET_UPGRADE_TYPE";

export function actionSetSortType(sortType) {
    return (dispatch) => {
        dispatch({
            type: TYPE_SET_SORT_TYPE,
            sortType
        });
    }
}
export function actionSetUpgradeType(upgradeType) {
    return (dispatch) => {
        dispatch({
            type: TYPE_SET_UPGRADE_TYPE,
            upgradeType
        });
    }
}