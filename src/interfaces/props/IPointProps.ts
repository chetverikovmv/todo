import { IPoint } from "../IPoint"

export interface IPointProps {
    point: IPoint
    onChange: (id: number, title: string, isCheckbox: boolean) => void
    onDelete: (id: number) => void
    onClick: (id: number) => void
}