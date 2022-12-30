import { IList } from "./ILists" 

export interface IListsState {
    lists: IList[]
    loading: boolean
    error: null | string
}

export enum ListsActionTypes {
    FETCH_LISTS = "FETCH_LISTS",
    FETCH_LISTS_SUCCESS = "FETCH_LISTS_SUCCESS",
    FETCH_LISTS_ERROR = "FETCH_LISTS_ERROR",
    FETCH_LISTS_DELETE = "FETCH_LISTS_DELETE",
    FETCH_LISTS_PATCH = "FETCH_LISTS_PATCH",
    FETCH_LISTS_POST = "FETCH_LISTS_POST"
}

interface IFetchListsAction {
    type: ListsActionTypes.FETCH_LISTS
}
interface IFetchListsSuccessAction {
    type: ListsActionTypes.FETCH_LISTS_SUCCESS
    payload: IList[]
}
interface IFetchListsErrorAction {
    type: ListsActionTypes.FETCH_LISTS_ERROR
    payload: string
}
interface IFetchListsDeleteAction {
    type: ListsActionTypes.FETCH_LISTS_DELETE
}
interface IFetchListsPatchAction {
    type: ListsActionTypes.FETCH_LISTS_PATCH
}
interface IFetchListsPostAction {
    type: ListsActionTypes.FETCH_LISTS_POST
}

export type ListsAction = IFetchListsAction | IFetchListsSuccessAction | IFetchListsErrorAction | IFetchListsDeleteAction | IFetchListsPatchAction | IFetchListsPostAction