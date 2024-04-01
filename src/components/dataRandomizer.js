import Ingredients from './smoothieData'; // Ainesosat importoidaan varmuuden vuoksi.
import setWater from '../App'
import React, { useState, useEffect } from 'react';

const DataRandomizer = ({ onFinalListUpdate }) => {
  const [loopLength, setLoopLength] = useState(1);
  const [finalList, setFinalList] = useState([]);

  useEffect(() => {
    onFinalListUpdate(finalList);
  }, [finalList, onFinalListUpdate]);

  const handleLoopLengthChange = (event) => {
    setLoopLength(parseInt(event.target.value, 10));
  };

  const generateRandomList = () => {
    const tempList = [];
    for (let i = 0; i < loopLength; i++) {
      const randomIndex = Math.floor(Math.random() * ingredientNames.length);
      tempList.push(ingredientNames[randomIndex]);
    }
    setFinalList(tempList);
  };

  const formattedIngredientNames =
    finalList.length > 0
      ? finalList.map((ingredient, index) => {
          if (index === finalList.length - 1) {
            return ingredient; // Viimeinen ainesosa on mitä on; Viimeinen ainesosa on mitä sen pitää olla
          } else if (index === finalList.length - 2) {
            return ingredient + ' and'; // Lisää 'ja'
          } else {
            return ingredient + ',';
          }
        }).join(' ')
      : '';

  return (
    <div>
      <select value={loopLength} onChange={handleLoopLengthChange}>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
      </select>
      <button onClick={generateRandomList}>Select Number of Ingredients</button>
      <p>Selected Ingredients: {formattedIngredientNames}</p>
    </div>
  );
};

export default DataRandomizer;
