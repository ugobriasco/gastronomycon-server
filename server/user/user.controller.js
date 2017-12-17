const User = require("./user.model");

const postUser = (req, res) => {
  res.status(401).json({ meassge: "This route is deprecated" });
};

const getAllUsers = (req, res) => {
  User.find((err, users) => {
    if (err) res.status(500).send(err);
    res.json({ data: users });
  });
};

const getUser = (req, res) => {
  User.findById(req.params.userID, (err, user) => {
    if (err) res.status(500).send(err);
    if (!user) res.status(404).send({ message: "No user found" });
    res.json({ data: user });
  });
};

const updateUser = (req, res) => {
  User.findById(req.params.userID, (err, user) => {
    if (err) res.status(500).send(err);
    if (!user) res.status(404).send({ message: "No user found" });
    Object.assign(user, req.body).save((err, user) => {
      if (err) res.status(500).send(err);
      res.json({ message: "User updated!", user });
    });
  });
};

const deleteUser = (req, res) => {
  const userID = req.params.userID;
  User.findByIdAndRemove(userID, (err, user) => {
    if (err) res.status(500).send(err);
    if (!user) res.status(404).send({ message: "No user found" });
    res.json("user: " + userID + " removed");
  });
};

module.exports = { postUser, getUser, updateUser, deleteUser };
