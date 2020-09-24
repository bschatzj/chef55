const express = require('express');
const Meas = require('./measurements-model');
const restrict = require('../middleware/restrict');

const router = express.Router();

router.get('/measurements', async (req, res, next) => {
	try {
		const measurements = await Meas.getMeasurments();
		return res.status(200).json(measurements);
	} catch (err) {
		return next(err);
	}
});

module.exports = router;