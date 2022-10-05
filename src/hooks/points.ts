import { useState } from "react";
import { IPoint } from "../interfaces/IPoint";

export function usePoints() {
    const FIRST_POINT = {
            id: 1,
            title: '',
            isChecked: false,
            isCheckbox: false
        }

    const [points, setPoints] = useState<IPoint[]>([FIRST_POINT]);

    function addPoint(point: IPoint, isCheckbox: boolean, id: number) {        
        if (!isCheckbox) {
            const pointsCopy = [...points];
            const current = pointsCopy.find(point => point.id === id);
            if (current) {
                current.isCheckbox = !current.isCheckbox
            }
            setPoints(prev => [...pointsCopy, point])
        }    
    }

    function toggleCheckbox(id: number) {
        const pointsCopy = [...points];
        const current = pointsCopy.find(point => point.id === id);
        if (current) {
            current.isChecked = !current.isChecked
        }
        setPoints(pointsCopy);
    }

    function changePointTitle(id: number, title: string) {
        const pointsCopy = [...points];
        const current = pointsCopy.find(point => point.id === id);
        if (current) {
            current.title = title
        }
        setPoints(pointsCopy);
    }

    function deletePoint(id: number) {
        setPoints([...points].filter(point => point.id !== id))
    }

    return { points, addPoint, toggleCheckbox, changePointTitle, deletePoint }
}