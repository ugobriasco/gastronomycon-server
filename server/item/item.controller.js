const Item = require('./item.model');

//endpoint for api/items

const postItem = function(req, res) {
  var item = new Item();
  item.type = req.body.type;
  item.pic = req.body.pic;
  item.name = req.body.name;

  item.save(function(err) {
    if (err) res.status(500).send(err);
    res.json({ message: 'item added', data: item });
  });
};

//deprecated
// getAllItems = function(req, res){
// 	Item.find(function(err, items){
// 		if(err)throw err;
// 		res.json({data: items});

// 	});
// }

const queryItems = function(req, res) {
  if (req && req.query.id) {
    //new routes
    res.status(501).send('route under construction');
  } else {
    //backcompatibility
    Item.find(function(err, items) {
      if (err) res.status(500).send(err);
      res.json({ data: items });
    });
  }
};

const getItem = function(req, res) {
  Item.findById(req.params.objID, function(err, item) {
    if (err) res.status(500).send(err);
    res.json({ data: item });
  });
};

const deleteItem = function(req, res) {
  Item.findByIdAndRemove(req.params.objID, function(err) {
    if (err) res.status(500).send(err);
    res.json({ message: 'Item ' + req.params.objID + ' removed' });
  });
};

const updateItem = function(req, res) {
  Item.findById(req.params.objID, function(err, item) {
    if (err) res.status(500).send(err);

    item.type = req.body.type;
    item.pic = req.body.pic;
    item.name = req.body.name;

    item.save(function(err) {
      if (err) res.status(500).send(err);
      res.json(item);
    });
  });
};

module.exports = { postItem, queryItems, getItem, deleteItem, updateItem };
