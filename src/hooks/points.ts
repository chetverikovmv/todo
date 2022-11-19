import axios, { AxiosError } from 'axios';
import { useState, useEffect } from "react";
import { IPoint } from "../interfaces/IPoint";
import { IList } from "../interfaces/ILists";

export function usePoints() {
    const FIRST_POINT = {
        id: 1,
        title: '',
        isChecked: false,
        isCheckbox: false
    }

    const [points, setPoints] = useState<IPoint[]>([FIRST_POINT]);
    const [currentListId, setCurrentListId] = useState('');
    const [currentListTitle, setCurrentListTitle] = useState('');
    const [lists, setLists] = useState<IList[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [notif, setNotif] = useState('');

    function addPoint(point: IPoint, isCheckbox: boolean, id: number) {
        if (!isCheckbox) {
            const pointsCopy = [...points];
            const current = pointsCopy.find(point => point.id === id);
            if (current) {
                current.isCheckbox = !current.isCheckbox
            }
            setPoints(prev => [...pointsCopy, point])
        }
    }

    function _isEmptyList() {
        if (currentListTitle !== '') {
            return false
        }
        for (let point of points) {
            if (point.title !== '') {
                return false
            }
        }
        return true
    }

    function clearPointsAndUpdateLists() {
        if (_isEmptyList()) {
            setLoading(true);
            deleteList(currentListId);

        } else {
            fetchGetLists();
        }

        setCurrentListId('');
        setCurrentListTitle('');
        setPoints([FIRST_POINT]);
    }

    function setPointsByListId(listId: string) {
        fetchGetListById(listId);
        setCurrentListId(listId);

        const currentList = lists.find(list => list.listId === listId);
        let title: string = ''
        if (currentList) {
            title = currentList.listTitle
        }
        setCurrentListTitle(title)
    }

    function toggleCheckbox(id: number) {
        const pointsCopy = [...points];
        const current = pointsCopy.find(point => point.id === id);
        if (current) {
            current.isChecked = !current.isChecked
        }
        setPoints(pointsCopy);
    }

    function repeatTitleValidation(title: string) {
        const duplicate = points.find(point => point.title === title);
        if (duplicate && duplicate.title !== '') {
            setNotif(duplicate.title)
            setTimeout(() => {
                setNotif('')
            }, 5000);
        }
    }

    function changePointTitle(id: number, title: string) {
        repeatTitleValidation(title);

        const pointsCopy = [...points];
        const current = pointsCopy.find(point => point.id === id);
        if (current) {
            current.title = title
        }
        setPoints(pointsCopy);
    }

    function deletePoint(id: number) {
        setPoints([...points].filter(point => point.id !== id))
    }

    function deleteList(listId: string) {
        fetchDeleteListById(listId)
            .then(() => fetchGetLists())
    }

    function changeListTitle(title: string) {
        setCurrentListTitle(title);
    }

    async function fetchPostList() {
        try {
            setError('');
            const response = await axios.post('https://todo-f4967-default-rtdb.firebaseio.com/data.json',
                JSON.stringify({
                    points,
                    "listTitle": ""
                }));
            setCurrentListId(response.data.name);
        }
        catch (e: unknown) {
            const error = e as AxiosError
            setError(error.message)
        }
    }

    async function fetchPatchList() {
        try {
            setError('');
            let key: string = currentListId;

            if (currentListId && points.length !== 0) {
                await axios.patch<IPoint[]>('https://todo-f4967-default-rtdb.firebaseio.com/data.json',
                    JSON.stringify({
                        [key]: {
                            points,
                            "listTitle": currentListTitle
                        }
                    }));
            }
        }
        catch (e: unknown) {
            const error = e as AxiosError
            setError(error.message)
        }

    }

    async function fetchGetLists() {
        try {
            setError('');
            setLoading(true);

            const response = await axios.get('https://todo-f4967-default-rtdb.firebaseio.com/data.json')
            const preparedData: IList[] = [];
            for (let key in response.data) {
                preparedData.push({
                    listId: key,
                    list: response.data[key].points,
                    listTitle: response.data[key].listTitle
                })

            }
            setLists(preparedData);

            setLoading(false)
        }
        catch (e: unknown) {
            setLoading(false);
            const error = e as AxiosError
            setError(error.message)
        }
    }

    async function fetchGetListById(listId: string) {
        try {
            setError('')
            setLoading(true)

            setCurrentListId('');
            setPoints([]);
            const response = await axios.get('https://todo-f4967-default-rtdb.firebaseio.com/data.json')
            setPoints(response.data[listId].points)


            setCurrentListTitle(response.data[listId].listTitle)

            setLoading(false)
        }
        catch (e: unknown) {
            setLoading(false);
            const error = e as AxiosError
            setError(error.message)
        }
    }

    async function fetchDeleteListById(listId: string) {
        try {
            setError('')
            const url = `https://todo-f4967-default-rtdb.firebaseio.com/data/${listId}.json`

            await axios.delete(url)
        }
        catch (e: unknown) {
            const error = e as AxiosError
            setError(error.message)
        }
    }

    useEffect(() => {
        fetchPatchList()
    }, [points])

    useEffect(() => {
        fetchPatchList()
    }, [currentListTitle])

    useEffect(() => {
        fetchGetLists()
    }, [])

    return {
        points,
        addPoint,
        clearPointsAndUpdateLists,
        setPointsByListId,
        lists,
        toggleCheckbox,
        changePointTitle,
        deletePoint,
        fetchPostList,
        deleteList,
        changeListTitle,
        currentListTitle,
        loading,
        error,
        notif
    }
}