import { ArrowDown } from "./icons/ArrowDown"
import { ArrowRight } from "./icons/ArrowRight"
import { ICountProps } from "../interfaces/props/ICountProps";

export function CountOfCheckedPoints({ clickHandler, showCheckedPoints, length }: ICountProps) {

    const stringOfCountOfCheckedPoints = (count: number) => {
        const STRING_OPTION1 = 'отмеченный пункт';
        const STRING_OPTION2 = 'отмеченных пункта';
        const STRING_OPTION3 = 'отмеченных пунктов';

        let string = '';

        if (count === 1) {
            return string = `${count} ${STRING_OPTION1}`;
        }

        if (count % 10 === 1 && count >= 21) {
            return string = `${count} ${STRING_OPTION1}`;
        }

        if (count % 100 >= 11 && count % 100 <= 20) {
            return string = `${count} ${STRING_OPTION3}`;
        }

        if (count % 10 >= 2 && count % 10 <= 4) {
            return string = `${count} ${STRING_OPTION2}`;
        }

        if ((count % 10 >= 5 && count % 10 <= 9) || count % 10 === 0) {
            return string = `${count} ${STRING_OPTION3}`;
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