import { IPoint } from "./IPoint"

export interface IList {
    listId: string
    list: IPoint[]
    listTitle: string
    listDate: Date | null
}
