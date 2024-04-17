import React, { useState } from 'react';
import Ingredients from './components/smoothieData'; //Import Ainesosien tiedot
import HeuristicCalculator from './components/HeuristicCalculator'; //Import Reseptin luonti
import RecipeDescription from './components/RecipeDescription'; // Import kuvaus

function App() {
  const [water, setWater] = useState(0); // Vesilitra
  const [summedIngredients, setSummedIngredients] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    sugar: 0,
    fiber: 0,
    fat: 0,
  });
  const [selectedIngredients, setSelectedIngredients] = useState([]); // Valittujen ainesten tila


  const updateSummedIngredients = (finalList) => {
    const updatedSummedIngredients = finalList.reduce(
      (sum, ingredientName) => {
        const matchingIngredient = Ingredients.find(
          (ingredient) => ingredient.name === ingredientName
        );

        if (matchingIngredient) {
          sum.calories += matchingIngredient.calories;
          sum.protein += matchingIngredient.protein;
          sum.carbs += matchingIngredient.carbs;
          sum.sugar += matchingIngredient.sugar;
          sum.fiber += matchingIngredient.fiber;
          sum.fat += matchingIngredient.fat;
          if (matchingIngredient.name === 'Watermelon') {
            setWater(0); // Muuta nollaksi jos vesimeloni
          }
        }

        return sum;
      },
      {
        calories: 0,
        protein: 0,
        carbs: 0,
        sugar: 0,
        fiber: 0,
        fat: 0,
      }
    );

    // Pyöristä 2:n decimaaliin
    const roundedSummedIngredients = {
      calories: Number(updatedSummedIngredients.calories.toFixed(2)),
      protein: Number(updatedSummedIngredients.protein.toFixed(2)),
      carbs: Number(updatedSummedIngredients.carbs.toFixed(2)),
      sugar: Number(updatedSummedIngredients.sugar.toFixed(2)),
      fiber: Number(updatedSummedIngredients.fiber.toFixed(2)),
      fat: Number(updatedSummedIngredients.fat.toFixed(2)),
    };

    setSummedIngredients(roundedSummedIngredients);
  };

  const handleFinalListUpdate = (finalList) => {
    setWater(1);
    updateSummedIngredients(finalList);
    setSelectedIngredients(finalList); // Päivitä tila
  };

  return (
    <div className="App">
      <h1>Smoothie Recipe Generator</h1>
      <HeuristicCalculator onFinalListUpdate={handleFinalListUpdate} />
      <div className="original-app wide-div">
      <h2>Summed Ingredients:</h2>
      <ul>
        {Object.entries(summedIngredients).map(([key, value]) => (
          <li key={key}>
            {key}: {value}
          </li>
        ))}
      </ul>
      <p>This Smoothie requires {water} decilitre{water !== 1 ? 's' : ''} of water.</p>
      <p>Each ingredient used is 100 grams with exception of Chili.</p>
      <p>Chili is 5 grams.</p>
      </div>

      <RecipeDescription summedIngredients={summedIngredients} />
    </div>
  );
}

export default App;
