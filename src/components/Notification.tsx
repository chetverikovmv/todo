import { INotificationProps } from "../interfaces/props/INotificationProps"

export function Notification ({title}: INotificationProps) {
    return (
        <div className='my-2 p-2 rounded text-center w-full bg-slate-500 text-white'> <p>Внимание! Такой пункт уже есть в списке: "{title}"</p></div>
    )
}
