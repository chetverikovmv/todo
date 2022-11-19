import { useState } from "react"
import { IInputTitle } from "../interfaces/props/IInputTitle"


export function InputTitle({ title, onChange }: IInputTitle) {
    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
        setInputTitle(event.target.value);
    }

    const [inputTitle, setInputTitle] = useState(title);

 
    return (
         <input value={inputTitle}
            onChange={changeHandler} 
            className='my-2 outline-zinc-200 text-lg font-medium text-center w-full'
            type="text" placeholder='Введите заголовок' />
    )
}

