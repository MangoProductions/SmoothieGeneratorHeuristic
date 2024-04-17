import React from 'react';
import AnimatedText from './AnimatedText'; // Animaatio
import { adjectives, weightsForAdjectives } from './DescriptionWeights';


const RecipeDescription = ({ summedIngredients }) => {
  const isIngredientsUpdated = Object.values(summedIngredients).some(value => value !== 0);

  if (!isIngredientsUpdated) {
    return null;
  }
  const determineAdjectives = () => {

    let adjective1, adjective2, adjective3, extraSentence = '';
    const { calories, protein, bitter, pain, sugar, fat, fiber } = summedIngredients;
    // Tällä funktiolla saadaan satunnainen adjektiivi tietyllä variaation ja toiston yhdistelmällä
    const weightedRandom = (weights) => {
      const modifiedWeights = { ...weights };
      const totalWeight = Object.values(modifiedWeights).reduce((sum, weight) => sum + weight, 0);
      const randomNumber = Math.round(Math.random() * totalWeight);
    
      //console.log(randomNumber)
      let cumulativeWeight = 0;
      for (const [adjective, weight] of Object.entries(modifiedWeights)) {
        cumulativeWeight += weight;
       // console.log(cumulativeWeight)
        if (randomNumber < cumulativeWeight) {
        //  console.log(`Valittu adjektiivi: ${adjective}, Paino: ${weight}`);
          return adjective;
          
        } else {
          
        //  console.log(`Hylätty adjektiivi: ${adjective}, Paino: ${weight}`);
        modifiedWeights[adjective] += 1; 
        }
      }
  };
  
    
    

    
    if (protein > 4) {
      adjective1 = weightedRandom(weightsForAdjectives.highProtein);
      adjective2 = weightedRandom(weightsForAdjectives.highProtein);
      adjective3 = weightedRandom(weightsForAdjectives.general);
    } else if (bitter > 3) {
        adjective1 = weightedRandom(weightsForAdjectives.highPain);
        adjective2 = weightedRandom(weightsForAdjectives.highPain);
        adjective3 = weightedRandom(weightsForAdjectives.general);
      } else if (pain > 2) {
        adjective1 = weightedRandom(weightsForAdjectives.highPain);
        adjective2 = weightedRandom(weightsForAdjectives.highPain);
        adjective3 = weightedRandom(weightsForAdjectives.general);
      } else if (sugar > 40) {
        adjective1 = weightedRandom(weightsForAdjectives.highSugar);
        adjective2 = weightedRandom(weightsForAdjectives.highSugar);
        adjective3 = weightedRandom(weightsForAdjectives.general);
      } else if (calories > 200) {
        adjective1 = weightedRandom(weightsForAdjectives.highCalories);
        adjective2 = weightedRandom(weightsForAdjectives.highCalories);
        adjective3 = weightedRandom(weightsForAdjectives.general);
      } else if (calories < 100) {
        adjective1 = weightedRandom(weightsForAdjectives.lowCalories);
        adjective2 = weightedRandom(weightsForAdjectives.lowCalories);
        adjective3 = weightedRandom(weightsForAdjectives.general);
      } else {
      adjective1 = weightedRandom(weightsForAdjectives.general);
      adjective2 = weightedRandom(weightsForAdjectives.general);
      adjective3 = weightedRandom(weightsForAdjectives.general);
    }
      //Erotettu visuaalisuuden takia.
    if (calories > 200) {
        extraSentence = "This smoothie is quite filling, perfect for satisfying hunger!";
      } else if (calories < 100) {
        extraSentence = "This smoothie is a healthy choice with its low calorie content!";
      }

    // Vaihtoehtoiset kuvaukset
    const alternatives = [
      `This smoothie is quaranteed to be ${adjective1} and ${adjective2}. 
      It also possesses a potential ${adjective3} flavor that some might notice.`,
      `Enjoy a luxurious experience with this smoothie featuring ${adjective1} and ${adjective2} qualities. 
      It is sure to be ${adjective3}.`,
      `Enrichen your tastebuds with this smoothie's ${adjective1} and ${adjective2} attributes. 
      It's definitely ${adjective3}.`,
      `One could argue that this ${adjective1} recipe might be too ${adjective2} or ${adjective3}, but for this purpose it is perfect.`,
    ];

    // Yksi vaihtoehto valitaan tietokoneen rajoitetulla ja epätäydellisellä algoritmillä
    // Voisin vaihtaa uuteen myöhemmin
    const selectedText = alternatives[Math.floor(Math.random() * alternatives.length)];

    return { mainDescription: selectedText, extra: extraSentence };
  };

  const { mainDescription, extra } = determineAdjectives();

  return (
    <div className="recipe-description wide-div">
      <div className="description-content">
        <h2>Recipe Description:</h2>
        <p>
<AnimatedText text={mainDescription} />
        </p>
        {extra && (
          <p style={{ marginTop: '10px' }}> 
            <AnimatedText text={extra} /> 
          </p>
        )}
      </div>
    </div>
  );
};

export default RecipeDescription;