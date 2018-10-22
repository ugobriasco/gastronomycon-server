const Grocery = require('./grocery-model');
const findGrocery = require('./grocery-find');

// Add a new grocery
const postGrocery = (req, res) => {
  const newGrocery = new Grocery(mapPayload(req));
  newGrocery.save(err => {
    if (err) res.status(500).send({ err });
    res.status(201).send({
      message: `new grocery added`,
      data: newGrocery
    });
  });
};

// Update an existing grocery
const updateGrocery = (req, res) =>
  Grocery.findById(req.params.GID)
    .then(grocery => {
      const _grocery = mapPayload(req);
      grocery = fetchPayload(grocery, _grocery);

      grocery.save(err => {
        if (err) res.status(500).send({ err });
        res.status(201).send({
          message: `grocery updated`,
          data: grocery
        });
      });
    })
    .catch(err => res.status(500).send({ err }));

// Delete an existing grocery
const deleteGrocery = (req, res) =>
  Grocery.findByIdAndRemove(req.params.GID)
    .then(() => res.send({ message: `Grocery ${req.params.GID} removed` }))
    .catch(err => res.status(500).send({ err }));

// Get all groceries from database -- deprecated
// TODO: server side pagination
const getAllGroceries = (req, res) =>
  Grocery.find()
    .then(groceries => res.send({ data: groceries }))
    .catch(err => res.status(500).send({ err }));

// get grocery given
const getGroceryId = (req, res) =>
  Grocery.findById(req.params.GID)
    .then(grocery => res.send({ data: grocery }))
    .catch(err => res.status(500).send({ err }));

// Query groceries given the following query parameters:
// lang, name, class, category
// Require response restriction control
const queryGroceries = (req, res) => {
  findGrocery(req)
    .then(groceries => res.send({ data: groceries }))
    .catch(err => res.status(500).send({ err }));
};

// Maps request body to model complyant payload
function mapPayload(req) {
  // TODO: handle multiple locale from same root, e.g. de_CH
  return {
    category: req.body.category,
    primaryName: req.body.primaryName,
    package: req.body.package,
    type: req.body.type,
    pic: req.body.pic,
    fr_FR: req.body.fr || req.body.fr_FR,
    en_GB: req.body.en || req.body.en_GB,
    de_DE: req.body.de || req.body.de_DE,
    it_IT: req.body.it || req.body.it_IT,
    es_ES: req.body.es || req.body.es_ES
  };
}

// Fetch data from old grocery to new grocery; Meeeh dont like it
function fetchPayload(oldGrocery, newGrocery) {
  // Fetch Grocery.category (Str)
  oldGrocery.category = newGrocery.category
    ? newGrocery.category
    : oldGrocery.category;

  // Fetch Grocery.type (Str)
  oldGrocery.type = newGrocery.type ? newGrocery.type : oldGrocery.type;
  oldGrocery.primaryName = newGrocery.primaryName
    ? newGrocery.primaryName
    : oldGrocery.primaryName;

  // Fetch Grocery.pachage (Arr)
  oldGrocery.package = newGrocery.package
    ? newGrocery.package
    : oldGrocery.package;

  // Fetch Grocery.pic (Str)
  oldGrocery.pic = newGrocery.pic ? newGrocery.pic : oldGrocery.pic;

  // Fetch Grocery.[locale]
  // TODO: Iteratively fetch localized name anf genre
  oldGrocery.fr_FR = newGrocery.fr_FR ? newGrocery.fr_FR : oldGrocery.fr_FR;
  oldGrocery.en_GB = newGrocery.en_GB ? newGrocery.en_GB : oldGrocery.en_GB;
  oldGrocery.de_DE = newGrocery.de_DE ? newGrocery.de_DE : oldGrocery.de_DE;
  oldGrocery.it_IT = newGrocery.it_IT ? newGrocery.it_IT : oldGrocery.it_IT;
  oldGrocery.es_ES = newGrocery.es_ES ? newGrocery.es_ES : oldGrocery.es_ES;

  return oldGrocery;
}

module.exports = {
  postGrocery,
  updateGrocery,
  deleteGrocery,
  getAllGroceries,
  getGroceryId,
  queryGroceries
};
