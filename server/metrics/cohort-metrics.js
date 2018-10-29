const { User } = require('../user');
const Grocery = require('../grocery/grocery-model');

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

module.exports = { countUsers, countGroceries };
