import { IList } from './../ILists';

export interface IListProps {
    list: IList
    onDelete: (id: string) => void
    onClick: (id: string) => void
}