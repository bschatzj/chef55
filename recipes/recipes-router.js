const express = require('express');
const restrict = require('../middleware/restrict');

const router = express.Router();

router.get('/recipes', restrict(), async (req, res, next) => {
  try {

  } catch (err) {
    return next(err);
  }
})

router.get('/recipes/:id', restrict(), async (req, res, next) => {
  try {

  } catch (err) {
    return next(err);
  }
})

router.post('/recipes', restrict(), async (req, res, next) => {
  try {

  } catch (err) {
    return next(err);
  }
})

router.put('/recipes/:id', restrict(), async (req, res, next) => {
  try {

  } catch (err) {
    return next(err);
  }
})

router.delete('/recipes/:id', restrict(), async (req, res, next) => {
  try {

  } catch (err) {
    return next(err);
  }
})

router.get('/measurements',  async (req, res, next) => {
  try {

  } catch (err) {
    return next(err);
  }
})

// router.delete('/recipes/:id', async (req, res, next) => {
//   try {

//   } catch (err) {
//     return next(err);
//   }
// })


module.exports = router;