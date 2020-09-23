const express = require('express');
const Recipes = require('./recipes-model');
const restrict = require('../middleware/restrict');
const {isUserRecipe} = require('../middleware/recipes')

const router = express.Router();

router.get('/recipes', restrict(), async (req, res, next) => {
	try {
		const recipes = await Recipes.getRecipes();
		return res.status(200).json(recipes);
	} catch (err) {
		return next(err);
	}
});

router.get('/recipes/:id', restrict(), async (req, res, next) => {
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

router.post('/recipes', restrict(), async (req, res, next) => {
	try {
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
			user_id: req.id,
			categoryId: categoryId,
			title: title,
			source: source,
			imgUrl: imgUrl,
			instructions: instructions,
		};

		const recipe = await Recipes.addRecipe(payload);
		if (recipe) {
			for (let i = 0; i < ingredLength; i++) {
				const ingredientsPayload = {
					recipe_id: recipe.recipe_id,
					ingredient_id: ingredients[i].ingredient_id,
					measurement_id: ingredients[i].measurement_id,
					quantity: ingredients[i].quantity,
				};
				await recipeModel.addRecipeIngredient(ingredientsPayload);
			}
			const recipe_ingredient = await recipeModel.getRecipeIngredients(
				recipe.recipe_id
			);

			const fullRecipe = { ...recipe, ingredients: recipe_ingredient };
			return res.json(fullRecipe);
		}
	} catch (err) {
		return next(err);
	}
});

router.put('/recipes/:id', restrict(), isUserRecipe(), async (req, res, next) => {
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
			user_id: req.id,
			categoryId: categoryId,
			title: title,
			source: source,
			imgUrl: imgUrl,
			instructions: instructions,
		};

		const recipe = await recipeModel.update(payload, id);

		if (recipe) {
			await recipeModel.removeRecipeIngredients(recipe.recipe_id);
			for (let i = 0; i < ingredLength; i++) {
				const ingredientsPayload = {
					recipe_id: recipe.recipe_id,
					ingredient_id: ingredients[i].ingredient_id,
					measurement_id: ingredients[i].measurement_id,
					quantity: ingredients[i].quantity,
				};

				await recipeModel.addRecipeIngredient(ingredientsPayload);
			}
			const recipe_ingredient = await recipeModel.getRecipeIngredients(
				recipe.recipe_id
			);

			const fullRecipe = {
				...recipe,
				ingredients: recipe_ingredient,
			};
			return res.json(fullRecipe);
		}
	} catch (err) {
		return next(err);
	}
});

router.delete('/:id', restrict(), isUserRecipe(), async (req, res, next) => {
  try {
    const id = req.params.id
    await recipeModel.remove(id)
    await recipeModel.removeRecipeIngredients(id)
    return res.status(204).end()

  } catch (err) {
    next(err)
  }

})

module.exports = router;
