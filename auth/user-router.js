const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('./user-model');
const restrict = require('../middleware/restrict');

const router = express.Router();

router.post('/login', async (req, res, next) => {
  try {
		const { username, password } = req.body;
    const user = await Users.findBy({ username }).first();

		if (!user) {
			return res.status(401).json({
				message: 'Invalid Credentials',
			});
    }

    const passwordValid = await bcrypt.compare(password, user.password);

		if (!passwordValid) {
			return res.status(401).json({
				message: 'Invalid Credentials',
			});
    }
    const token = jwt.sign({
      userID: user.id,
      userName: user.name,
    }, process.env.JWT_SECRET)

    res.cookie("token", token)
    res.json({
      message: `Welcome ${user.name}!`,
    });
  } catch (err) {
    return next(err)
  }
});

router.post('/register', async (req, res, next) => {
  try {
    const hashAmount = parseInt(process.env.HASH_AMOUNT)
		const { username, password, name } = req.body;
		const user = await Users.findBy({ username }).first();

		if (user) {
			return res.status(409).json({
				message: 'Username is already taken',
			});
		}

		const newUser = await Users.add({
			username,
      password: await bcrypt.hash(password, hashAmount),
      name,
    });

    return res.status(201).json(newUser);
   } catch(err) {
    return next(err);
  }
});

module.exports = router;