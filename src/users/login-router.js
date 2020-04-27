const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('./users-model');
const secrets = require('../api/secrets');

router.post('/', async (req, res) => {
  let { username, password } = req.body;

  try {
    const user = await Users.findBy({ username });
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);
      res.status(200).json({ message: 'Logged in', token });
    } else {
      res.status(401).json({ message: 'Banned from the Archives!' });
    }
  } catch(error) {
    res.status(500).json({ error: error.message });
  }
});

function generateToken(user) {
  const payload = {
    userId: user.id,
    username: user.username,
  };
  const secret = secrets.jwtSecret;
  const options = {
    expiresIn: '1d',
  };
  return jwt.sign(payload, secret, options);
}

module.exports = router;
