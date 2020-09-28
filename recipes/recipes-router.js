const express = require('express');
const Recipes = require('./recipes-model');
const restrict = require('../middleware/restrict');
const { isUserRecipe } = require('../middleware/recipes')

const router = express.Router();

router.get('/', async (req, res, next) => {
	try {
		const recipes = await Recipes.getRecipes();
		// const ingredients = await Recipes.getRecipeIngredients(recipes.id);
		recipes.forEach(recipe => {
			//console.log(recipe)
			let ingredients = Recipes.getRecipeIngredients(recipe.recipe_id)
			//console.log(ingredients)
		})
		return res.status(200).json(recipes);
	} catch (err) {
		return next(err);
	}
});

router.get('/:id', async (req, res, next) => {
	try {
		const id = req.params.id;
		const recipe = await Recipes.findRecipeById(id);
		const ingredients = await Recipes.getRecipeIngredients(id);
		const fullRecipe = { ...recipe, ingredients: ingredients };
		return res.status(200).json(fullRecipe);
	} catch (err) {
		return next(err);
	}
});

router.post('/', async (req, res, next) => {
	console.log(req.id)
	try {
		const {
			categoryId,
			title,
			source,
			imgUrl,
			ingredients,
			instructions,
		} = req.body;
		const payload = {
			userId: 1,
			categoryId: 1,
			title: title,
			source: source,
			imgUrl: imgUrl,
			instructions: instructions,
		};

		const recipe = await Recipes.addRecipe(payload);
		return res.json("Brendan is awesome!!!");
	} catch (err) {
		return next(err);
	}
});

router.put('/:id', async (req, res, next) => {
	try {
		const id = req.params.id;
		const {
			categoryId,
			title,
			source,
			imgUrl,
			ingredients,
			instructions,
		} = req.body;
		const ingredLength = ingredients.length;
		const payload = {
			userId: req.id,
			categoryId: categoryId,
			title: title,
			source: source,
			imgUrl: imgUrl,
			instructions: instructions,
		};

		const recipe = await Recipes.updateRecipe(payload, id);
		console.log(ingredients)
		// if (recipe) {
		// 	await Recipes.removeRecipeIngredients(recipe.recipe_id);
		// 	for (let i = 0; i < ingredLength; i++) {
		// 		const ingredientsPayload = {
		// 			recipe_id: recipe.recipe_id,
		// 			quantity: ingredients[i].quantity,
		// 		};

		// 		await Recipes.addRecipeIngredient(ingredientsPayload);
		// 	}
		// 	const recipe_ingredient = await Recipes.getRecipeIngredients(
		// 		recipe.recipe_id
		// 	);

		const fullRecipe = {
			...recipe,
		};
		return res.json(fullRecipe);
	} catch (err) {
		return next(err);
	}
});

router.delete('/:id', async (req, res, next) => {
	try {
		const id = req.params.id
		await Recipes.remove(id)
		await Recipes.removeRecipeIngredients(id)
		return res.status(204).end()

	} catch (err) {
		res.status(200).json("JUST LET IT HAPPEN")
	}

})

module.exports = router;
