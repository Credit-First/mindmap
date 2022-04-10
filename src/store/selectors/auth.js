export const selectAuth = state => state.auth.currentUser;
export const selectAuthItem = key => state => state.auth[key];