import { Point } from './components/Point';
import { CountOfCheckedPoints } from "./components/CountOfCheckedPoints"
import React, { useState } from "react";
import { usePoints } from "./points";


function App() {
  const { points, addPoint, toggleCheckbox, changePointTitle, deletePoint } = usePoints();
  const [showCheckedPoints, setShowCheckedPoints] = useState(true);

  const changeHandler = (id: number, title: string, isCheckbox: boolean) => {

    changePointTitle(id, title);

    let maxPointId = points.reduce((acc, curr) => acc.id > curr.id ? acc : curr).id;
    addPoint({
      id: maxPointId + 1,
      title: '',
      isChecked: false,
      isCheckbox: false
    },
      isCheckbox, id);

    console.log('~ points', points)
  }

  const deleteHandler = (id: number) => deletePoint(id);

  const checkHandler = (id: number) => toggleCheckbox(id);

  const unCheckedPoints = points.filter(point => !point.isChecked);

  const сheckedPoints = points.filter(point => point.isChecked);

  const clickHandler = () => {
    setShowCheckedPoints(prev => !prev)
  }

  return (
    <div className="container mx-auto max-w-md pt-5">

      <p className="text-center mb-2">ToDo list by M. Chetverikov</p>

      {unCheckedPoints.map(point => <Point point={point} onChange={changeHandler} onDelete={deleteHandler} onClick={checkHandler} key={point.id} />)}

      {сheckedPoints.length > 0 && <CountOfCheckedPoints clickHandler={clickHandler} showCheckedPoints={showCheckedPoints} length={сheckedPoints.length} />}

      {showCheckedPoints && сheckedPoints.map(point => <Point point={point} onChange={changeHandler} onDelete={deleteHandler} onClick={checkHandler} key={point.id} />)}


    </div>

  );
}

export default App;
