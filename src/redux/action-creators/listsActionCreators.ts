import { ListsActionTypes } from './../../interfaces/IListsState';
import { Dispatch } from "redux"
import { ListsAction } from "../../interfaces/IListsState"
import axios, { AxiosError } from 'axios';
import { IList } from '../../interfaces/ILists';
import { IPoint } from '../../interfaces/IPoint';



const prepareGetData = (response: any) => {
    const preparedData: IList[] = [];
    for (let key in response.data) {
        preparedData.push({
            listId: key,
            list: response.data[key].points,
            listTitle: response.data[key].listTitle
        })
    }
    return preparedData
}

export const fetchGetList = () => {
    return async (dispatch: Dispatch<ListsAction>) => {
        try {
            dispatch({ type: ListsActionTypes.FETCH_LISTS })
            const response = await axios.get('https://todo-f4967-default-rtdb.firebaseio.com/data.json')

            dispatch({ type: ListsActionTypes.FETCH_LISTS_SUCCESS, payload: prepareGetData(response) })
        }
        catch (e: unknown) {
            const error = e as AxiosError
            dispatch({ type: ListsActionTypes.FETCH_LISTS_ERROR, payload: error.message })
        }
    }
}

export const fetchDeleteListById = (listId: string) => {
    return async (dispatch: Dispatch<ListsAction>) => {
        try {
            dispatch({ type: ListsActionTypes.FETCH_LISTS })

            const url = `https://todo-f4967-default-rtdb.firebaseio.com/data/${listId}.json`
            await axios.delete(url);

            dispatch({ type: ListsActionTypes.FETCH_LISTS_DELETE });


            dispatch({ type: ListsActionTypes.FETCH_LISTS });
            const response = await axios.get('https://todo-f4967-default-rtdb.firebaseio.com/data.json')

            dispatch({ type: ListsActionTypes.FETCH_LISTS_SUCCESS, payload: prepareGetData(response) })
        }
        catch (e: unknown) {
            const error = e as AxiosError
            dispatch({ type: ListsActionTypes.FETCH_LISTS_ERROR, payload: error.message })
        }
    }
}

export const fetchPatchList = (points: IPoint[], listId: string, listTitle: string) => {
    return async (dispatch: Dispatch<ListsAction>) => {
        try {
            dispatch({ type: ListsActionTypes.FETCH_LISTS_PATCH });

            await axios.patch<IPoint[]>('https://todo-f4967-default-rtdb.firebaseio.com/data.json',
                JSON.stringify({
                    [listId]: {
                        points,
                        "listTitle": listTitle
                    }
                }));
        }
        catch (e: unknown) {
            const error = e as AxiosError
            dispatch({ type: ListsActionTypes.FETCH_LISTS_ERROR, payload: error.message })
        }
    }
}

export const fetchPostList = (points: IPoint[], callback: (listID: string) => void) => {
    return async (dispatch: Dispatch<ListsAction>) => {
        try {
            dispatch({ type: ListsActionTypes.FETCH_LISTS_POST });

            const response = await axios.post('https://todo-f4967-default-rtdb.firebaseio.com/data.json',
                JSON.stringify({
                    points,
                    "listTitle": ""
                }))

            callback(response.data.name);
        }
        catch (e: unknown) {
            const error = e as AxiosError
            dispatch({ type: ListsActionTypes.FETCH_LISTS_ERROR, payload: error.message })
        }
    }
}