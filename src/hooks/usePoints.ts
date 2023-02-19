import { useTypedSelector } from './useTypedSelector';
import { useState, useEffect } from "react";
import { IPoint } from "../interfaces/IPoint";
import { UseActions } from './useActions';

export function usePoints() {
    const FIRST_POINT = {
        id: 1,
        title: '',
        isChecked: false,
        isCheckbox: false
    }

    const [notif, setNotif] = useState('');

    const { points, currentListId, currentListTitle, currentListDate } = useTypedSelector(state => state.currentList);
    const { lists } = useTypedSelector(state => state.lists);
    const { setPoints, setCurrentListId, setCurrentListTitle, setCurrentListDate } = UseActions();
    const { fetchGetList, fetchDeleteListById, fetchPatchList, fetchPostList } = UseActions();

    function addPoint(point: IPoint, isCheckbox: boolean, id: number) {
        if (!isCheckbox) {
            const pointsCopy = [...points];
            const current = pointsCopy.find(point => point.id === id);
            if (current) {
                current.isCheckbox = !current.isCheckbox
            }
            setPoints([...pointsCopy, point])
        }
    }


    const checkEmptyPoint = (item: { title: string; }) => item.title !== ''
    function _isEmptyList() {
        return !currentListTitle && !points.some(checkEmptyPoint)
    }

    function clearPointsAndUpdateLists() {
        if (_isEmptyList()) {
            fetchDeleteListById(currentListId);

        } else {
            fetchGetList();
        }

        setCurrentListId('');
        setCurrentListTitle('');
        setCurrentListDate(null);
        setPoints([FIRST_POINT]);
    }

    function setPointsByListId(listId: string) {
        getListById(listId);
        setCurrentListId(listId);

        const currentList = lists.find(list => list.listId === listId);
        currentList ? setCurrentListTitle(currentList.listTitle) : setCurrentListTitle('');
        currentList ? setCurrentListDate(currentList.listDate) : setCurrentListDate(null);
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
        const duplicate = points.find(point => point.title.toLowerCase() === title.toLowerCase());
        if (duplicate && duplicate.title !== '') {
            setNotif(duplicate.title)
            setTimeout(() => {
                setNotif('')
            }, 3000);
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

    function changeListTitle(title: string) {
        setCurrentListTitle(title);
    }

    function setCurrentPointsAndTitle(listId: string) {
        const current = lists.find(list => list.listId === listId);
        if (current) {
            setPoints(current.list);
            setCurrentListTitle(current.listTitle);
        }
    }

    function getListById(listId: string) {
        setCurrentListId('');
        setPoints([]);

        setCurrentPointsAndTitle(listId)
    }

    function patchList() {
        if (currentListId && points.length !== 0) {
            fetchPatchList(points, currentListId, currentListTitle, currentListDate)
        }        
    }

    function postList() {
        fetchPostList(points, setCurrentListId, setCurrentListDate);
    }

    useEffect(() => {
        patchList()
    }, [points])

    useEffect(() => {
        patchList()
    }, [currentListTitle])

    return {
        points,
        addPoint,
        clearPointsAndUpdateLists,
        setPointsByListId,
        lists,
        toggleCheckbox,
        changePointTitle,
        deletePoint,
        postList,
        changeListTitle,
        currentListTitle,
        currentListId,
        notif
    }
}