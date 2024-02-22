import React, { useState, useEffect } from 'react';
import IngredientsData from './smoothieData'; // Importing the Ingredients data
import RecipeDescription from './RecipeDescription';
import AnimatedText from './AnimatedText'; // Adjust the path as per your project structure

class HeuristicCalculator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIngredients: [],
      ingredientCount: 4, // Alkuperäinen koko
      originalIngredients: [], // Säilytä alkuperäisten ainesten tiedot
      selectedButton: null, // Tarkkaile, mikä nappula on painettu.
      buttonSelected: false,
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
    this.setState({ selectedButton: buttonType, buttonSelected: true }, () => {
      this.generateIngredients();
      
    });
  };
  

  resetTastiness = () => {
    const { originalIngredients } = this.state;
    const resetIngredients = JSON.parse(JSON.stringify(originalIngredients)); // Kopio alkuperäisistä aineksista.
    this.setState({ originalIngredients: resetIngredients });
  };

  selectByButton = (ingredients) => {
    const { selectedButton } = this.state;
  
    if (selectedButton === 'Sweet') {
      return ingredients.reduce((currentIngredient, nextIngredient) =>
        nextIngredient.sugar > currentIngredient.sugar ? nextIngredient : currentIngredient
      );
    } else if (selectedButton === 'Bitter') {
      return ingredients.reduce((currentIngredient, nextIngredient) =>
        nextIngredient.bitter > currentIngredient.bitter || nextIngredient.pain > currentIngredient.pain
          ? nextIngredient
          : currentIngredient
      );
    } else if (selectedButton === 'LowCalory') {
      return ingredients.reduce((currentIngredient, nextIngredient) =>
        nextIngredient.calories < currentIngredient.calories ? nextIngredient : currentIngredient
      );
    }
  
    return ingredients[0]; // Defaultti
  };
  
  generateIngredients = () => {
    const { ingredientCount, originalIngredients, selectedButton } = this.state;
    let tempIngredients = JSON.parse(JSON.stringify(originalIngredients)); // Kopio (Tärkeä)
  
    const selectedIngredients = [];
  
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
          selectedIngredient = currentIngredient.bitter > selectedIngredient.bitter || currentIngredient.pain > selectedIngredient.pain
            ? currentIngredient
            : selectedIngredient;
        } else if (selectedButton === 'LowCalory') {
          selectedIngredient = currentIngredient.calories < selectedIngredient.calories ? currentIngredient : selectedIngredient;
        }
      }
  
      selectedIngredients.push(selectedIngredient);  // Valitse heurestisesti oikea ainesosa.
  
     

      if (selectedIngredient.name === 'lime (unpeeled)' ||
          selectedIngredient.name === 'lime (peeled)' ||
          selectedIngredient.name === 'lemon (peeled)') {
        tempIngredients = tempIngredients.map((ingredient) => {
          if (ingredient.name === 'chili') {
            ingredient.tastiness *= 2;   
            // rekursio
          }
          return ingredient;
        });
      }

      if (selectedButton === 'Bitter' || selectedButton === 'LowCalory') {
        if (selectedIngredient.bitter > 3 || selectedIngredient.pain > 3) {
          tempIngredients.sort((a, b) => b.tastiness - a.tastiness);
        }
      }

      tempIngredients.splice(tempIngredients.indexOf(selectedIngredient), 1);
    }

    const totalPainOrBitterness = selectedIngredients.reduce(
      (acc, curr) => acc + curr.pain + curr.bitter,
      0
    );

    if (totalPainOrBitterness > 5) {
      const lastIngredientIndex = selectedIngredients.length - 1;
      selectedIngredients[lastIngredientIndex] = originalIngredients.find(
        (ingredient) => ingredient.name === 'Orange(peeled)'
      );
    }

    this.setState({ selectedIngredients }, () => {
      this.resetTastiness(); // Maukkuus nollataan
      this.props.onFinalListUpdate(selectedIngredients.map(ingredient => ingredient.name));
    });
  };

  render() {
    const { selectedIngredients, ingredientCount, selectedButton } = this.state;

    return (
      <div className="heuristic-calculator wide-div">
        <div className="calculator-content">
        <div className="inputs-container">
  <label className="label" htmlFor="ingredientCount">Select Ingredient Count:</label>
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
                {this.state.buttonSelected && (
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
