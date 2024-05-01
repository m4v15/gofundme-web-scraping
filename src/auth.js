require('dotenv/config')

const authenticateKey = (req, res, next) => {
    let api_key = req.header("x-api-key"); //Add API key to headers
    if (api_key === process.env.API_KEY) {
        next();
    } else {
      //Reject request if API key doesn't match
      res.status(403).send({ error: { code: 403, message: "You not allowed." } });
    }
  };
  module.exports = { authenticateKey };