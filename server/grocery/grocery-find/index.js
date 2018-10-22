const Grocery = require('../grocery-model');
const { queryNameAndLocale } = require('./query-like-name');
const {
  queryCategory,
  queryCategoryAndNameAndLocale
} = require('./query-like-category');
const queryPrimaryName = require('./query-like-primary-name');
const queryID = require('./query-equal-id');

// SPECS
// /grocery?lang=it&name=cipolla
// /grocery?lang=it_IT&name=cipolla
// /grocery?primaryName=onion
// /grocery?category=vegetable
// /grocery?id=5bcc73beff6bf516e991c507

const findGrocery = req => {
  const _id = req.query.id;
  const category = req.query.category;
  const primaryName = req.query.primaryName;
  const locale = req.query.lang;
  const name = req.query.name;

  const query = buildQuery({
    _id,
    category,
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
function buildQuery({ category, primaryName, locale, name, _id }) {
  if (_id) return queryID(_id);
  if (primaryName) return queryPrimaryName(primaryName);
  if (name && locale) return queryNameAndLocale(name, locale);
  if (category) return queryCategory(category);
  if (category && name && locale)
    return queryCategoryAndNameAndLocale(category, name, locale);

  return {};
}

module.exports = findGrocery;
