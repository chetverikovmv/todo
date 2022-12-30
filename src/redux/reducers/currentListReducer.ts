import { ICurrentListState, CurrentListAction, CurrentListActionTypes } from './../../interfaces/ICurrentListState';
import { IPoint } from '../../interfaces/IPoint';
const initialPoint: IPoint = {
    id: 1,
    title: '',
    isChecked: false,
    isCheckbox: false
}

const initialState: ICurrentListState = {
    points: [initialPoint],
    currentListId: '',
    currentListTitle: ''
};

export const currentListReducer = (state = initialState, action: CurrentListAction): ICurrentListState => {
    switch (action.type) {
        case CurrentListActionTypes.SET_POINTS:
            return { ...state,  points: action.payload}
        case CurrentListActionTypes.SET_CURRENT_LIST_ID:
            return { ...state,  currentListId: action.payload}
        case CurrentListActionTypes.SET_CURRENT_LIST_TITLE:
            return { ...state,  currentListTitle: action.payload}
       
        default:
            return state
    }
}
