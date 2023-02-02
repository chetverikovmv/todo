import { Checkbox } from "./icons/Checkbox"
import { IPointProps } from "../interfaces/props/IPointProps"
import cn from "classnames"

export function PointReadOnly({ point}: IPointProps) {

    return (
        <div className="text-center flex mb-1">
            {point.isCheckbox &&
                <>
                    <div className="rounded border bg-zinc-50 px-3 py-3 w-6 h-6 cursor-pointer relative">
                        {point.isChecked && <Checkbox />}
                    </div>


                    <input value={point.title}
                        className={cn("mx-2 px-2 outline-zinc-200 w-[100%] bg-inherit cursor-pointer focus:outline-none",
                            {
                                "line-through": point.isChecked
                            }
                        )}
                        type="text" readOnly/>
                </>}

        </div>
    )
}