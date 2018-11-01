const Grocery = require('../grocery-model');
const { queryNameAndLocale } = require('./query-like-name');
const {
  queryCategory,
  queryCategoryAndNameAndLocale
} = require('./query-like-category');
const queryPrimaryName = require('./query-like-primary-name');
const queryID = require('./query-equal-id');

const { pivotToLanguage } = require('./lib/map-language-to-lcid');
const mapLocale = require('./lib/map-locale');

// SPECS
// /grocery?lang=it&name=cipolla
// /grocery?lang=it_IT&name=cipolla
// /grocery?primaryName=onion
// /grocery?category=vegetable
// /grocery?id=5bcc73beff6bf516e991c507
// /grocery?lang=it_IT&name=cipolla&translate[]=de_DE&translate=es

const findGrocery = req => {
  const _id = req.query.id;
  const category = req.query.category;
  const primaryName = req.query.primaryName;
  const name = req.query.name;

  const locale = req.query.lang ? mapLocale(req.query.lang) : 'en_GB';
  const translate = getTranslationQueryString(req.query.translate);

  const query = buildQuery({
    _id,
    category,
    primaryName,
    locale,
    name
  });

  return Grocery.find(query)
    .select(`-_id category primaryName ${translate}`)
    .then(groceries =>
      groceries.map(grocery => {
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

function getTranslationQueryString(translateParam) {
  if (typeof translateParam === 'string') {
    return mapLocale(translateParam);
  }
  if (typeof translateParam === 'object') {
    const arrayOfLocale = translateParam.map(obj => mapLocale(obj));
    return arrayOfLocale.join(' ');
  } else {
    return 'it_IT de_DE en_GB es_ES fr_FR';
  }
}

module.exports = findGrocery;
