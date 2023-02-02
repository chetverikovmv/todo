import { useState } from "react"
import { IInputTitle } from "../interfaces/props/IInputTitle"


export function InputTitle({ title, onChange }: IInputTitle) {
    const ENTER_HEADER_TEXT = 'Введите заголовок';
    const INPUT_MAX_LENGTH_TEXT = 40;
    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
        setInputTitle(event.target.value);
    }

    const [inputTitle, setInputTitle] = useState(title);


    return (
        <input maxLength={INPUT_MAX_LENGTH_TEXT}
            value={inputTitle}
            onChange={changeHandler}
            className='my-2 outline-zinc-200 text-lg font-medium text-center w-full'
            type="text" placeholder={ENTER_HEADER_TEXT} />
    )
}

