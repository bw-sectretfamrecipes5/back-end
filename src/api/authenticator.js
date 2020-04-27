const jwt = require('jsonwebtoken');

const secrets = require('./secrets');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  const secret = secrets.jwtSecret;
  if (token) {
    jwt.verify(token, secret, (error, decodedToken) => {
      if (error) {
        // All the truth in the world is held in stories. @TODO:
        res.status(401).json({ stories: 'All the truth in the world.' }); 
      } else {
        // req.decodedToken = decodedToken; @TODO: remove
        next();
      }
    });
  } else {
    res.status(400).json({ message: 'Please provide credentials' });
  }
};
