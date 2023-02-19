import { Point } from '../components/Point';
import { CountOfCheckedPoints } from "../components/CountOfCheckedPoints"
import { useState, useEffect } from "react";
import { usePoints } from "../hooks/usePoints";
import { List } from '../components/List';
import { Loader } from '../components/Loader';
import { ErrorMessage } from '../components/ErrorMessage';
import { InputTitle } from '../components/InputTitle';
import { Notification } from '../components/Notification';
import { CSSTransition } from 'react-transition-group';
import '../index.css';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { UseActions } from '../hooks/useActions';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import ru from 'date-fns/locale/ru';
import { IList } from '../interfaces/ILists';
registerLocale('ru', ru);


export function MainPage() {
    const CLOSE_AND_BACK_TO_LISTS_TEXT = 'Закрыть и вернуться к спискам';
    const CREATE_NEW_LIST_TEXT = 'Создать новый список';
    const SHOW_LISTS_BY_RANGE_TEXT = 'Показать списки за период';
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
        currentListId,
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

    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());
    const [fileredLists, setFileredLists] = useState<IList[]>(lists);

    const [rangeChecked, setRangeChecked] = useState(false);
   
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

    const filterLists = (startDate: Date, endDate: Date) => {
        setFileredLists(lists.filter(list => {
            return list.listDate && (Date.parse(`${list.listDate}`) >= startDate.setHours(0, 0, 0, 0) && Date.parse(`${list.listDate}`) <= endDate.setHours(23, 59, 59, 59))
        }))
    }

    useEffect(() => {
        filterLists(startDate, endDate)
    }, [startDate, endDate, lists])



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
        <div className="container mx-auto max-w-lg px-4 pt-5">

            <button className='px-4 py-2 mb-4 block mx-auto text-cyan-100 bg-cyan-700 rounded hover:bg-cyan-600 disabled:opacity-75'
                onClick={clickHandlerButton}
                disabled={!currentListId && isListMode}>
                {isListMode ? CLOSE_AND_BACK_TO_LISTS_TEXT : CREATE_NEW_LIST_TEXT}
            </button>


            {isListMode && <>

                {!loading && <InputTitle title={currentListTitle} onChange={changeHandlerTitle} />}

                {unCheckedPoints.map(point => <Point point={point} onChange={changeHandler} onDelete={deleteHandler} onClick={checkHandler} key={point.id} />)}

                {сheckedPoints.length > 0 && <CountOfCheckedPoints clickHandler={clickHandler} showCheckedPoints={showCheckedPoints} length={сheckedPoints.length} />}

                {showCheckedPoints && сheckedPoints.map(point => <Point point={point} onChange={changeHandler} onDelete={deleteHandler} onClick={checkHandler} key={point.id} />)}

                <CSSTransition
                    in={notifVisible}
                    timeout={500}
                    classNames="fade"
                    unmountOnExit
                >
                    <Notification title={notifTitle} />
                </CSSTransition>

            </>}

            {!isListMode &&
                <>
                    {/* <p>Показать списки за период</p> */}
                    <input
                        id='show-lists-by-range'
                        type="checkbox"
                        checked={rangeChecked}
                        onChange={() => setRangeChecked(!rangeChecked)} /> <label htmlFor="show-lists-by-range"> {SHOW_LISTS_BY_RANGE_TEXT} </label>

                    {/* <CSSTransition
                        in={rangeChecked}
                        timeout={500}
                        classNames="notif"
                        unmountOnExit
                    > */}
                    {/* {rangeChecked && */}

                        <CSSTransition
                            in={rangeChecked}
                            timeout={500}
                            classNames="fade"
                            unmountOnExit
                        >
                            <div>
                                <div className="flex">
                                    <p className="mt-3 mr-2 w-10">C: </p>
                                    <DatePicker
                                        locale="ru"
                                        selected={startDate}
                                        dateFormat="dd.MM.yyyy"
                                        placeholderText="Дата"
                                        onChange={(date: Date) => setStartDate(date)}
                                        selectsStart
                                        startDate={startDate}
                                        endDate={endDate}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="flex">
                                    <p className="mt-3 mr-2 w-10">По: </p>
                                    <DatePicker
                                        locale="ru"
                                        selected={endDate}
                                        dateFormat="dd.MM.yyyy"
                                        placeholderText="Дата"
                                        onChange={(date: Date) => setEndDate(date)}
                                        selectsEnd
                                        startDate={startDate}
                                        endDate={endDate}
                                        minDate={startDate}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                        </CSSTransition>
                    {/* } */}
                    {/* </CSSTransition> */}

                </>

            }

            {loading && <Loader />}
            {error && <ErrorMessage error={error} />}

            {!isListMode && !loading && !rangeChecked && lists.map(list => <List list={list} onDelete={deleteHandlerList} onClick={clickHandlerList} key={list.listId} />)}
            {!isListMode && !loading && rangeChecked && fileredLists.map(list => <List list={list} onDelete={deleteHandlerList} onClick={clickHandlerList} key={list.listId} />)}

        </div>
    )
}
