const { User } = require('../../user');
const Grocery = require('../../grocery/grocery-model');
const Countries = require('./countries');

const countUsers = (req, res) => {
  User.countDocuments().then(count => res.send({ count }));
};

const countGroceries = (req, res) => {
  const allGroceries = Grocery.countDocuments();
  const mainGroceries = Grocery.countDocuments({ type: 'main' });

  Promise.all([allGroceries, mainGroceries]).then(values =>
    res.send({ all_groceries: values[0], main_groceries: values[1] })
  );
};

const countLanguages = (req, res) => {
  const supportedCountries = Countries.filter(
    country => country.isSupported === true
  );

  res.send({
    languages: supportedCountries.map(country => country.lcid),
    count: supportedCountries.length
  });
};

module.exports = { countUsers, countGroceries, countLanguages };
