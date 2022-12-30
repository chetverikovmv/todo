import { Point } from '../components/Point';
import { CountOfCheckedPoints } from "../components/CountOfCheckedPoints"
import { useState, useEffect } from "react";
import { usePoints } from "../hooks/usePoints";
import { IPoint } from '../interfaces/IPoint';
import { List } from '../components/List';
import { Loader } from '../components/Loader';
import { ErrorMessage } from '../components/ErrorMessage';
import { InputTitle } from '../components/InputTitle';
import { Notification } from '../components/Notification';
import { CSSTransition } from 'react-transition-group';
import '../index.css';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { UseActions } from '../hooks/useActions';


export function MainPage() {
    const { points,
        addPoint,
        clearPointsAndUpdateLists,
        setPointsByListId,
        toggleCheckbox,
        changePointTitle,
        deletePoint,
        postList, 
        changeListTitle,
        currentListTitle,
        notif } = usePoints();

    const { lists, loading, error } = useTypedSelector(state => state.lists);
    const { fetchGetList, fetchDeleteListById } = UseActions();
    useEffect(() => {
        fetchGetList()
      }, [])

    const [showCheckedPoints, setShowCheckedPoints] = useState(true);
    const [isListMode, setIsListMode] = useState(false);

    const [notifVisible, setNotifVisible] = useState(false);
    const [notifTitle, setNotifTitle] = useState(notif);
    useEffect(() => {
        if (notif === '') {
            setNotifVisible(false);
            const timer = setTimeout(() => { setNotifTitle(notif) }, 300);
            return () => clearTimeout(timer);
        }
        else {
            setNotifTitle(notif)
            setNotifVisible(true)
        }
        
    }, [notif])

    const changeHandler = (id: number, title: string, isCheckbox: boolean) => {

        changePointTitle(id, title);

        let maxPointId = points.reduce((acc, curr) => acc.id > curr.id ? acc : curr).id;
        addPoint({
            id: maxPointId + 1,
            title: '',
            isChecked: false,
            isCheckbox: false
        },
            isCheckbox, id);
    }

    const deleteHandler = (id: number) => deletePoint(id);

    const checkHandler = (id: number) => toggleCheckbox(id);

    const unCheckedPoints = points.filter(point => !point.isChecked);

    const сheckedPoints = points.filter(point => point.isChecked);

    const clickHandler = () => {
        setShowCheckedPoints(prev => !prev)
    }

    const clickHandlerList = (listId: string) => {
        setPointsByListId(listId)
        setIsListMode(prev => !prev);
    }

    const deleteHandlerList = (listId: string) => {
        fetchDeleteListById(listId);
    }

    const clickHandlerButton = () => {
        isListMode ?
            clearPointsAndUpdateLists()
            : postList();

        setIsListMode(prev => !prev);
    }

    const changeHandlerTitle = (title: string) => {
        changeListTitle(title)
    }

    return (
        <div className="container mx-auto max-w-md pt-5">

            <button className='px-4 py-2 mb-4 block mx-auto text-cyan-100 bg-cyan-700 rounded hover:bg-cyan-600'
                onClick={clickHandlerButton}>
                {isListMode ? 'Закрыть и вернуться к спискам' : 'Создать новый список'}
            </button>

            {loading && <Loader />}
            {error && <ErrorMessage error={error} />}

            {isListMode && <>

                {!loading && <InputTitle title={currentListTitle} onChange={changeHandlerTitle} />}

                {unCheckedPoints.map(point => <Point point={point} onChange={changeHandler} onDelete={deleteHandler} onClick={checkHandler} key={point.id} />)}

                {сheckedPoints.length > 0 && <CountOfCheckedPoints clickHandler={clickHandler} showCheckedPoints={showCheckedPoints} length={сheckedPoints.length} />}

                {showCheckedPoints && сheckedPoints.map(point => <Point point={point} onChange={changeHandler} onDelete={deleteHandler} onClick={checkHandler} key={point.id} />)}

                <CSSTransition
                    in={notifVisible}
                    timeout={500}
                    classNames="notif"
                    unmountOnExit
                >
                    <Notification title={notifTitle} />
                </CSSTransition>

            </>}

            {!isListMode && !loading && lists.map(list => <List list={list} onDelete={deleteHandlerList} onClick={clickHandlerList} key={list.listId} />)}

        </div>
    )
}
