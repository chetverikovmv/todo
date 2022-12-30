import { IPoint } from "./IPoint"

export interface ICurrentListState {
    points: IPoint[]
    currentListId: string
    currentListTitle: string
}

export enum CurrentListActionTypes {
    SET_POINTS = "SET_POINTS",
    SET_CURRENT_LIST_ID = "SET_CURRENT_LIST_ID",
    SET_CURRENT_LIST_TITLE = "SET_CURRENT_LIST_TITLE",   
}

interface ISetPointsAction {
    type: CurrentListActionTypes.SET_POINTS
    payload: IPoint[]
}
interface ISetCurrentListIdAction {
    type: CurrentListActionTypes.SET_CURRENT_LIST_ID
    payload: string
}
interface ISetCurrentListTitleAction {
    type: CurrentListActionTypes.SET_CURRENT_LIST_TITLE
    payload: string
}

export type CurrentListAction = ISetPointsAction | ISetCurrentListIdAction | ISetCurrentListTitleAction