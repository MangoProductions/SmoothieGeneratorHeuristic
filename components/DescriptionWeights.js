const adjectives = [
    'refreshing',
    'delicious',
    'healthy',
    'nutritious',
    'tasty',
    'tangy', //Kaikki adjektiivit
    'bitter', //Lisää myöhemmin
    'juicy',
    'thirstquenching',
    'spicy'
  ];
const weightsForAdjectives = {
    general: {
        refreshing: 1,
        delicious: 1,
        healthy: 1,
        nutritious: 1,
        tasty: 1,
        tangy: 1,
        juicy: 1,
        thirstquenching: 1,
    },
    lowCalories: {
      refreshing: 3,
      healthy: 2,
      nutritious: 1,
      
    },
    highProtein: {
      delicious: 3,
      nutritious: 2,
      tasty: 1,
      
    },
    highCalories: {
      delicious: 3,
      nutritious: 2,
      tasty: 1,
      
    },
    highBitter: {
      bitter: 3,
      tangy: 2,
      spicy: 1,
      
    },
    highPain: {
      spicy: 3,
      bitter: 2,
      tangy: 1,
      
    },
    highSugar: {
        delicious: 3,
        juicy: 2,
        thirstquenching: 1,
    }
  };
  

export {adjectives, weightsForAdjectives};
