const adjectives = [
    'refreshing',
    'delicious',
    'healthy',
    'nutritious',
    'tasty',
    'tangy', //Kaikki adjektiivit
    'bitter', //Lisää adjektiiveja myöhemmin
    'juicy',
    'thirstquenching',
    'spicy'
  ];
const weightsForAdjectives = {
    general: {
        refreshing: 1,
        delicious: 2,
        healthy: 1,
        nutritious: 7,
        tasty: 3,
        tangy: 1,
        juicy: 1,
        thirstquenching: 8,
    },
    lowCalories: {
      refreshing: 3,
      healthy: 2,
      nutritious: 1,
      tasty: 3,
      
    },
    highProtein: {
      delicious: 3,
      nutritious: 2,
      tasty: 1,
      refreshing: 2,
      
    },
    highCalories: {
      delicious: 3,
      nutritious: 2,
      tasty: 1,
      refreshing: 2,
    },
    highBitter: {
      bitter: 3,
      tangy: 2,
      spicy: 1,
      refreshing: 2,
    },
    highPain: {
      spicy: 3,
      bitter: 2,
      tangy: 1,
      refreshing: 2,
    },
    highSugar: {
        delicious: 3,
        juicy: 2,
        thirstquenching: 1,
        refreshing: 2,
    }
  };
  

export {adjectives, weightsForAdjectives};
