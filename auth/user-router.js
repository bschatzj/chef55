const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('./user-model');

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
      userName: user.username,
      userId: user.id,
      name: user.name,
    }, process.env.JWT_SECRET);

		//set Cookie
		res.cookie('token', token);

		return res.status(200).json({
			message: `Welcome ${user.name}`,
			token: token,
		});
	} catch (err) {
		return next(err);
	}
});

router.post('/register', async (req, res, next) => {
	try {
		const hashAmount = parseInt(process.env.HASH_AMOUNT);
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
	} catch (err) {
		return next(err);
	}
});

router.get('/logout', (req, res) => {
  if (token) {
  res.clearCookie('token');
  return res.status(200).json({ message: 'Goodbye' });
  }
  return res.status(401).json({ message: 'Please login first.' });
})

module.exports = router;
