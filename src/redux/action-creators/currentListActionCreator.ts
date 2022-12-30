import { CurrentListAction, CurrentListActionTypes } from './../../interfaces/ICurrentListState';
import { Dispatch } from 'redux';
import { IPoint } from '../../interfaces/IPoint';

export const setPoints = (points: IPoint[]) => {
    return (dispatch: Dispatch<CurrentListAction>) => {
        dispatch({ type: CurrentListActionTypes.SET_POINTS, payload: points })
    }
}

export const setCurrentListId = (ListId: string) => {
    return (dispatch: Dispatch<CurrentListAction>) => {
        dispatch({ type: CurrentListActionTypes.SET_CURRENT_LIST_ID, payload: ListId })
    }
}

export const setCurrentListTitle = (ListTitle: string) => {
    return (dispatch: Dispatch<CurrentListAction>) => {
        dispatch({ type: CurrentListActionTypes.SET_CURRENT_LIST_TITLE, payload: ListTitle })
    }
}