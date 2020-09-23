const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('./user-model');
const Recipes = require('../recipes/recipes-model');
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

		const payload = {
      username: user.username,
      id: user.id,
      name: user.name,
    }
		const token = jwt.sign(payload, process.env.JWT_SECRET);

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

router.get("/users/:id/recipes", restrict(), async (req, res, next) => {

	try {
				const recipesRes = await Recipes.findRecipeBy({userId:req.params.id});
				return res.json(recipesRes)
	} catch(err) {
		 next(err)
	}

})

module.exports = router;
