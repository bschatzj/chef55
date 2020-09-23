const recipes = require('../recipes/recipes-model.js');

module.exports = {
	isUserRecipe: () => {
		return async (req, res, next) => {
			try {
				const user_id = req.id;
				const recipe_id = req.params.id;
				const recipe = await recipes.isUserRecipe(recipe_id, user_id);
				if (!recipe) {
					res
						.status(404)
						.json({ message: 'Sorry, this recipe does not belong to you.' });
				} else {
					req.recipe = recipe;
					next();
				}
			} catch (err) {
				next(err);
			}
		};
	},
};
