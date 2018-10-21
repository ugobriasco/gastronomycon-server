const queryCategory = category => ({
  category: new RegExp(category, 'i')
});

const queryCategoryAndNameAndLocale = (category, name, locale) => ({
  [`${locale}.name`]: new RegExp(name, 'i'),
  category: new RegExp(category, 'i')
});

module.exports = { queryCategory, queryCategoryAndNameAndLocale };
