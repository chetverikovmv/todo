import { useTypedSelector } from './useTypedSelector';
import axios, { AxiosError } from 'axios';
import { useState, useEffect } from "react";
import { IPoint } from "../interfaces/IPoint";
import { IList } from "../interfaces/ILists";
import { UseActions } from './useActions';

export function usePoints() {
    const FIRST_POINT = {
        id: 1,
        title: '',
        isChecked: false,
        isCheckbox: false
    }

    const [notif, setNotif] = useState('');

    const { points, currentListId, currentListTitle } = useTypedSelector(state => state.currentList);
    const { lists } = useTypedSelector(state => state.lists);
    const { setPoints, setCurrentListId, setCurrentListTitle } = UseActions();
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
            fetchDeleteListById(currentListId);

        } else {
            fetchGetList();
        }

        setCurrentListId('');
        setCurrentListTitle('');
        setPoints([FIRST_POINT]);
    }

    function setPointsByListId(listId: string) {     
        getListById(listId);
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
            fetchPatchList(points, currentListId, currentListTitle)
        }
    }

    function postList() {        
            fetchPostList(points, setCurrentListId);    
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
        notif
    }
}