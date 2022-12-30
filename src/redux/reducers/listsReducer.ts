import { IListsState, ListsAction, ListsActionTypes } from './../../interfaces/IListsState';
const initialState: IListsState = {
    lists: [],
    loading: false,
    error: null
};

export const listsReducer = (state = initialState, action: ListsAction): IListsState => {
    switch (action.type) {
        case ListsActionTypes.FETCH_LISTS:
            return { loading: true, error: null, lists: [] }
        case ListsActionTypes.FETCH_LISTS_SUCCESS:
            return { loading: false, error: null, lists: action.payload }
        case ListsActionTypes.FETCH_LISTS_ERROR:
            return { loading: false, error: action.payload, lists: [] }
        case ListsActionTypes.FETCH_LISTS_DELETE:
            return { loading: false, error: null, lists: [] }
        case ListsActionTypes.FETCH_LISTS_PATCH:
            return { loading: false, error: null, lists: [] }
        case ListsActionTypes.FETCH_LISTS_POST:
            return { loading: false, error: null, lists: [] }
        default:
            return state
    }
}

