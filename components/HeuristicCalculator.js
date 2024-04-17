import React, { useState, useEffect } from 'react';
import IngredientsData from './smoothieData'; // Data tulee täältä
import RecipeDescription from './RecipeDescription';
import AnimatedText from './AnimatedText';

class HeuristicCalculator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIngredients: [],
      ingredientCount: 4, // Alkuperäinen koko
      originalIngredients: [], // Säilytä alkuperäisten ainesten tiedot
      selectedButton: null, // Tarkkaile, mikä nappula on painettu.
    };
  }

  componentDidMount() {
    const ingredientsCopy = JSON.parse(JSON.stringify(IngredientsData)); // Kopioi ainekset
    this.setState({ originalIngredients: ingredientsCopy }, () => {
      this.generateIngredients();
    });
  }

  handleCountChange = (event) => {
    this.setState({ ingredientCount: parseInt(event.target.value, 10) });
  };

  handleButtonSelect = (buttonType) => {
    this.setState({ selectedButton: buttonType}, () => {
      this.generateIngredients();
      
    });
  };
  

  resetIngredients = () => {
    const { originalIngredients } = this.state;
    const resetIngredients = JSON.parse(JSON.stringify(originalIngredients)); // Kopio alkuperäisistä aineksista.
    this.setState({ originalIngredients: resetIngredients });
  };

  
  generateIngredients = () => {
    const { ingredientCount, originalIngredients, selectedButton } = this.state;
    if (!selectedButton) {
      return; 
    }
    let tempIngredients = JSON.parse(JSON.stringify(originalIngredients)); // Kopio (Tärkeä)
  
    const selectedIngredients = [];
    let totalPainOrBitterness = 0;
    while (selectedIngredients.length < ingredientCount) {
      const randomIndexes = Array.from({ length: ingredientCount }, () => 
        Math.floor(Math.random() * tempIngredients.length) 
      );
  
      const selectedSet = randomIndexes.map(index => tempIngredients[index]); //Tässä kopio otetaan käyttöön.
  
      let selectedIngredient = selectedSet[0];
  
      for (let i = 1; i < selectedSet.length; i++) {
        const currentIngredient = selectedSet[i];
        if (selectedButton === 'Sweet') {
          selectedIngredient = currentIngredient.sugar > selectedIngredient.sugar ? currentIngredient : selectedIngredient;
        } else if (selectedButton === 'Bitter') {
            if (totalPainOrBitterness > 4) {
              selectedIngredient = currentIngredient.tastiness > selectedIngredient.tastiness ? currentIngredient : selectedIngredient;
            }
            else {
              selectedIngredient = currentIngredient.bitter > selectedIngredient.bitter || currentIngredient.pain > selectedIngredient.pain
               ? currentIngredient : selectedIngredient;
            }
        } else if (selectedButton === 'LowCalory') {
          selectedIngredient = currentIngredient.calories < selectedIngredient.calories ? currentIngredient : selectedIngredient;
        }
        totalPainOrBitterness += currentIngredient.pain + currentIngredient.bitter;
      }
      
      selectedIngredients.push(selectedIngredient);  // Valitse heurestisesti oikea ainesosa.

      if (selectedIngredient.name === 'lime (unpeeled)' ||
          selectedIngredient.name === 'lime (peeled)' ||
          selectedIngredient.name === 'lemon (peeled)') {
        tempIngredients = tempIngredients.map((ingredient) => {
          if (ingredient.name === 'chili') {
            ingredient.tastiness *= 2;   
            ingredient.pain *= 2;   
            ingredient.bitter *= 2;   
            // rekursio
          }
          return ingredient;
        });
      }
      
      tempIngredients.splice(tempIngredients.indexOf(selectedIngredient), 1);
    }

  

    if (totalPainOrBitterness > 8) {
        const lastIngredientIndex = selectedIngredients.length - 1;
        selectedIngredients[lastIngredientIndex] = originalIngredients.find(
            (ingredient) => ingredient.name === 'Orange(peeled)'
        );
    }


    this.setState({ selectedIngredients }, () => {
      this.resetIngredients(); // Ainekset palautetaan
      this.props.onFinalListUpdate(selectedIngredients.map(ingredient => ingredient.name));
    });
  };
  render() {
    const { selectedIngredients, ingredientCount, selectedButton } = this.state;
    return (
      <div className="heuristic-calculator wide-div">
        <div className="calculator-content">
        <div className="inputs-container">
  <label className="label" >Select Ingredient Count:</label>
  <select
    className="select"
    id="ingredientCount"
    value={ingredientCount}
    onChange={this.handleCountChange}
  >
    <option value={2}>2</option>
    <option value={3}>3</option>
    <option value={4}>4</option>
  </select>
</div>
          <div className="buttons-container">
  <button className="button" onClick={() => this.handleButtonSelect('Sweet')}>Sweet</button>
  <button className="button" onClick={() => this.handleButtonSelect('Bitter')}>Bitter</button>     {/* Valitse nappula */}
  <button className="button" onClick={() => this.handleButtonSelect('LowCalory')}>Low Calory</button>
</div>        
<h2>Generated Ingredients:</h2>
          <ul>
            {selectedIngredients.map((ingredient, index) => (
              <li key={index}>
                {(
                <AnimatedText text={`${ingredient.name}`} />
              )}

              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
export default HeuristicCalculator;
