import React, { useState } from "react";
import { PointReadOnly } from '../components/PointReadOnly';
import { IListProps } from "../interfaces/props/IListProps"
import { Delete } from "./icons/Delete"
import { DeleteHover } from "./icons/DeleteHover"

export function List({ list, onDelete, onClick }: IListProps) {

    const [isDeleteButtonHover, setIsDeleteButtonHover] = useState(<Delete />);

    const clickHadler = () => {
        onClick(list.listId);       
    }
 
    const deleteHandler = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        onDelete(list.listId)
    }

    const sortList = list.list.slice(0, 3)

    return (
        <div onClick={clickHadler} className="bg-slate-100 cursor-pointer my-2 p-2 rounded border">

            <h2 className='text-center font-medium'>{list.listTitle}</h2>
           
            {sortList.map((point) => <PointReadOnly point={point} onChange={() => { }} onDelete={() => { }} onClick={() => { }} key={point.id} />)}
            
            {list.list.length > 4 && <p className='mb-1 ml-10'>...</p>}
            
            <hr className='mt-3'/>
            
            <div className='flex items-center mt-1 ml-72'
                onMouseEnter={() => setIsDeleteButtonHover(<DeleteHover />)}
                onMouseLeave={() => setIsDeleteButtonHover(<Delete />)}
                onClick={deleteHandler}>
                <button>
                    {isDeleteButtonHover}
                </button>
                <p className='ml-1 text-sm'>Удалить список</p>
            </div>

        </div>
    )
}