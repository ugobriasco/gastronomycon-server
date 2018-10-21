const query = (name, locale) => ({
  [`${locale}.name`]: new RegExp(name, 'i')
});

module.exports = query;
