import { IErrorMessageProps } from "../interfaces/props/IErrorMessageProps"

export function ErrorMessage({error}: IErrorMessageProps) {
    return (
        <p className="text-center text-red-600">{error}</p>
    )
}
