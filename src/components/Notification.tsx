import { INotificationProps } from "../interfaces/props/INotificationProps"

export function Notification ({title}: INotificationProps) {
    const ATTENTION_TEXT = 'Внимание! Такой пункт уже есть в списке: ';
    return (
        <div className='my-2 p-2 rounded text-center w-full bg-slate-500 text-white'> <p>{ATTENTION_TEXT}"{title}"</p></div>
    )
}
