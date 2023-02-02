import { useState } from "react";
import { PointReadOnly } from '../components/PointReadOnly';
import { IListProps } from "../interfaces/props/IListProps"
import { DeleteButton } from "./DeleteButton";
import { Delete } from "./icons/Delete"

export function List({ list, onDelete, onClick }: IListProps) {

    const DELETE_LIST_TEXT = 'Удалить список';
    const [isDeleteButtonHover, setIsDeleteButtonHover] = useState(<Delete />);    

    const clickHandler = () => {
        onClick(list.listId);       
    }
 
    const deleteHandler = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        onDelete(list.listId)
    }

    const sortList = list.list.slice(0, 3)

    return (
        <div onClick={clickHandler} className="bg-slate-100 cursor-pointer my-2 p-2 rounded border">

            <h2 className='text-center font-medium overflow-hidden'>{list.listTitle}</h2>
           
            {sortList.map((point) => <PointReadOnly point={point} onChange={() => { }} onDelete={() => { }} onClick={() => { }} key={point.id} />)}
            
            {list.list.length > 4 && <p className='mb-1 ml-10'>...</p>}
            
            <hr className='mt-3'/>
            
            <DeleteButton onClick={deleteHandler} text={DELETE_LIST_TEXT} />

        </div>
    )
}