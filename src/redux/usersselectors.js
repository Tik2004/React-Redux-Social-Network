export const getUsersseleect = (state) => {
    return state.userspage.users
}
export const getPageSizeselect = (state) => {
    return state.userspage.pageSize
}
export const gettotalCountselect = (state) => {
    return state.userspage.totalCount
}
export const getCurrentPageselect = (state) => {
    return state.userspage.currentPage
}
export const getisFetchingselect = (state) => {
    return state.userspage.isFetching
}
export const getfollowingInProgressselect = (state) => {
    return state.userspage.followingInProgress
}
