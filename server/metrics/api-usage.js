const postApiUsage = (req, res, next) => {
  console.log(req.decoded, req.headers);

  //todo post new record to the related user
  next();
};

module.exports = { postApiUsage };
