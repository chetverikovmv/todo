import React, { useState } from "react"
import { IPpoint } from "../models"
import { Check } from "./icons/Checkbox"
import cn from "classnames"

interface PointProps {
    point: IPpoint
    onChange: (id: number, title: string, isCheckbox: boolean) => void
    onDelete: (id: number) => void
    onClick: (id: number) => void
}

export function Point({ point, onChange, onDelete, onClick }: PointProps) {

    const [checkbox, setCheckbox] = useState(point.isCheckbox)
    const [isChecked, setIsChecked] = useState(point.isChecked)

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!checkbox) {
            setCheckbox(true);

            onChange(point.id, event.target.value, false)

        } else {
            onChange(point.id, event.target.value, true)
        }
    }

    const clickHadler = () => {
        onClick(point.id);
        setIsChecked(prev => !prev)
    }

    return (
        <div className="text-center flex">
            {checkbox &&
                <div onClick={clickHadler} className="rounded border bg-zinc-100 px-3 py-3 w-6 h-6 cursor-pointer relative hover:bg-zinc-200 active:bg-zinc-300">
                    {isChecked && <Check />}
                </div>}

            {!checkbox && <div className="text-center text-slate-500 text-base align-middle">+</div>}

            <input value={point.title} onChange={changeHandler} 
            className={cn("mx-2 px-2 outline-zinc-200 w-[100%]",
            {
                "line-through": isChecked
            }
            )} 
            type="text" placeholder='Новый пункт' />
            {checkbox && <div onClick={() => onDelete(point.id)} className="text-center text-slate-500 text-xl cursor-pointer hover:text-slate-700 active:text-slate-900">X</div>}
        </div>
    )
}