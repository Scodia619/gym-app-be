import { useState } from "react";
import { SetsContainer } from "./SetsContainer";

export const ChosenExerciseContainer = ({
  exercise,
  chosenExercises,
  setChosenExercises,
  index,
}) => {
  const [sets, setSets] = useState([{weight: 0, reps: 0}]);

  function handleRemove(e) {
    const index = chosenExercises.indexOf(exercise);
    if (index !== -1) {
      const amendedChosenExercises =
        index === 0
          ? [...chosenExercises.slice(1)]
          : [
              ...chosenExercises.slice(0, index),
              ...chosenExercises.slice(index + 1),
            ];

      setChosenExercises(amendedChosenExercises);
    }
  }

  return(<>
    <p className="font-bold">
      {index}. {exercise.name}
    </p>
    <p className=" text-sm pl-2 pb-2">
      {exercise.difficulty} | {exercise.equipment}
    </p>
    <p className="pl-2 pb-2">{exercise.instructions}</p>

    <div className="flex items-center">
      <SetsContainer sets={sets} setSets={setSets}/>
      <button
        className="p-1 rounded border mr-2 ml-auto mt-auto"
        onClick={handleRemove}
      >
        Remove
      </button>
    </div>
  </>)
};