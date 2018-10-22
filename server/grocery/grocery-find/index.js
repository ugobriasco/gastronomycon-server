const Grocery = require('../grocery-model');
const { queryNameAndLocale } = require('./query-like-name');
const {
  queryCategory,
  queryCategoryAndNameAndLocale
} = require('./query-like-category');
const queryPrimaryName = require('./query-like-primary-name');
const queryID = require('./query-equal-id');

const { pivotToLanguage } = require('./map-language-to-lcid');

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
  const name = req.query.name;

  const locale = getLocale(req.query.lang);

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

// maps [it, IT, it_it, it_IT, IT_it, IT_IT, it-it, it-IT, IT-it, IT-IT] to "it_IT"
function getLocale(lang) {
  const dashRe = new RegExp('-', 'g');
  const re_re = new RegExp('[a-z]{2}_(?:[a-z]{2}){1,2}(?:_[a-z]{2})?$', 'i');
  const _RE = new RegExp('_[a-z]{2}', 'i');
  const re_ = new RegExp('[a-z]{2}_', 'i');

  lang = lang.replace(dashRe, '_');
  if (lang.match(re_re)) {
    return lang
      .replace(_RE, x => x.toUpperCase())
      .replace(re_, x => x.toLowerCase());
  } else {
    // case pivot language, like 'it' or IT
    return pivotToLanguage(lang.toLowerCase());
  }
}

module.exports = findGrocery;
