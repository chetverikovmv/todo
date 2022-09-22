import { ArrowDown } from "./icons/ArrowDown"
import { ArrowRight } from "./icons/ArrowRight"

interface CountProps {
    clickHandler: () => void
    showCheckedPoints: boolean
    length: number
}

export function CountOfCheckedPoints({ clickHandler, showCheckedPoints, length }: CountProps) {

    const stringOfCountOfCheckedPoints = (count: number) => {
        const STRING_OPTION1 = 'отмеченный пункт';
        const STRING_OPTION2 = 'отмеченных пункта';
        const STRING_OPTION3 = 'отмеченных пунктов';

        let string = '';
        if (count === 1) {
            string = `${count} ${STRING_OPTION1}`
        }

        if (count > 1 && count < 5) {
            string = `${count} ${STRING_OPTION2}`
        }

        if (count > 4) {
            string = `${count} ${STRING_OPTION3}`
        }

        return string
    }


    return (
        <div>
            <div onClick={clickHandler} className='mt-3 cursor-pointer'>
                <hr />

                <div className='flex py-2'>
                    {showCheckedPoints && <ArrowDown />}
                    {!showCheckedPoints && <ArrowRight />}
                    <span className='block text-slate-500'>{stringOfCountOfCheckedPoints(length)}</span>
                </div>

            </div>
        </div>
    )

}