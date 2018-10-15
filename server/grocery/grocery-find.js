const Grocery = require('./grocery-model');

const findGrocery = req => {
  // TODO: Map query parameters, in special the localization
  const defaultLocale = 'it_IT';
  const primaryName = req.query.primaryName;
  const querylanguage = req.query.lang || defaultLocale;
  const name = req.query.name;

  // TODO: Find all the groceries fulfilling the given conditions

  return Grocery.find({ primaryName }).then(groceries =>
    groceries.map(grocery => {
      // TODO: Filter results by available locale
      return grocery;
    })
  );
  // TODO: Filter results by selected locale. If none, skip
};

module.exports = findGrocery;
