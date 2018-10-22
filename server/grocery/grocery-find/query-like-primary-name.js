const query = (name, locale) => ({
  primaryName: new RegExp(name, 'i')
});

module.exports = query;
