const jwt = require('jsonwebtoken');

const restrict = () => {
	return async (req, res, next) => {
		const authError = {
			message: 'Unauthorized',
		};

		try {
			const token = req.cookies.token;
			if (!token) {
				return res.json(401).json(authError);
			}

			jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
				if (err) {
					return res.json(401).json(authError);
				}
				req.token = decoded;

				next();
			});
		} catch (err) {
			return next(err);
		}
	};
};

module.exports = restrict;
