import { useState } from "react";
import { Delete } from "./icons/Delete"
import { DeleteHover } from "./icons/DeleteHover"
import { IDeleteButtonProps } from "../interfaces/props/IDeleteButtonProps"

export function DeleteButton({onClick, text = ''}: IDeleteButtonProps ) {
    const [isDeleteButtonHover, setIsDeleteButtonHover] = useState(<Delete />);    

    return (
        <div className='flex items-center justify-end mt-1 pr-1'
            onMouseEnter={() => setIsDeleteButtonHover(<DeleteHover />)}
            onMouseLeave={() => setIsDeleteButtonHover(<Delete />)}
            onClick={onClick}>
            <button>
                {isDeleteButtonHover}
            </button>
            {text && <p className='ml-1 text-sm'>{text}</p>}
        </div>
    )
}



