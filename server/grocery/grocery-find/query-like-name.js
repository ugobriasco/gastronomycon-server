const queryNameAndLocale = (name, locale) => ({
  [`${locale}.name`]: new RegExp(name, 'i')
});

module.exports = { queryNameAndLocale };
