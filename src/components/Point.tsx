import { useState } from "react"
import { Checkbox } from "./icons/Checkbox"
import { Delete } from "./icons/Delete"
import { Plus } from "./icons/Plus"
import { IPointProps } from "../interfaces/props/IPointProps"
import cn from "classnames"
import { DeleteButton } from "./DeleteButton"

export function Point({ point, onChange, onDelete, onClick }: IPointProps) {
    const NEW_POINT_TEXT = 'Новый пункт';
    const INPUT_MAX_LENGTH_TEXT = 40;

    const [checkbox, setCheckbox] = useState(point.isCheckbox);
    const [isChecked, setIsChecked] = useState(point.isChecked);
    const [isDeleteButtonHover, setIsDeleteButtonHover] = useState(<Delete />);


    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!checkbox) {
            setCheckbox(true);

            onChange(point.id, event.target.value, false)

        } else {
            onChange(point.id, event.target.value, true)
        }
    }

    const clickHandler = () => {
        onClick(point.id);
        setIsChecked(prev => !prev)
    }

    return (
        <div className="text-center flex mb-1">
            {checkbox ?
                <div onClick={clickHandler} className="rounded border bg-zinc-100 px-3 py-3 w-6 h-6 cursor-pointer relative hover:bg-zinc-200 active:bg-zinc-300">
                    {isChecked && <Checkbox />}
                </div>
                : <div className="flex items-center px-2"><Plus /></div>}

            <input maxLength={INPUT_MAX_LENGTH_TEXT} value={point.title} onChange={changeHandler}
                className={cn("mx-2 px-2 outline-zinc-200 w-[100%]",
                    {
                        "line-through": isChecked
                    }
                )}
                type="text" placeholder={NEW_POINT_TEXT} />

            {checkbox && <DeleteButton onClick={() =>  onDelete(point.id)}/>}
        </div>
    )
}