const Grocery = require('../grocery-model');
const queryName = require('./query-like-name-locale');
const queryPrimaryName = require('./query-like-primary-name');

// SPECS
// TODO: /grocery?lang=it&name=cipolla
// /grocery?lang=it_IT&name=cipolla
// /grocery?primaryName=onion

const findGrocery = req => {
  const primaryName = req.query.primaryName;
  const locale = req.query.lang;
  const name = req.query.name;

  const query = buildQuery({
    primaryName,
    locale,
    name
  });

  return Grocery.find(query).then(groceries =>
    groceries.map(grocery => {
      // TODO: Filter results by available locale
      return grocery;
    })
  );
  // TODO: Filter results by selected locale. If none, skip
};

// Factory pattern for building query depending to query params
function buildQuery({ primaryName, locale, name }) {
  if (primaryName) return queryPrimaryName(primaryName);
  if (name && locale) return queryName(name, locale);
  return {};
}

module.exports = findGrocery;
