
exports.seed = async function(knex) {
  await knex('recipes').insert([
    { id: 1, userId: 1, categoryId: 2, title: "Fried Chicken", source: "Grandma", instructions: "Preheated Oven 350F. Put the chicken in the oven."},
    { id: 2, userId: 1, categoryId: 3, title: "Mom's Best Chicken", source: "Momma", instructions:"Coat the chicken in bbq sauce. Once coated, sprinkle with salt and pepper. Place the chicken in the oven at 350F and cook for 45 minutes."},
    { id: 3, userId: 1, categoryId: 3, title: "Italian Sausage Meat Balls", source: "Grandma", instructions:"Combine all ingredients in a large bowl. Pinch off about 1oz of the mixture and roll it into a ball. Place the ball on a sheet pan coated in baking spray. Complete this until the mixture is completely on the sheet. Place in the oven for 45 minutes at 425F."},
    { id: 4, userId: 2, categoryId: 3, title: "Pasta", instructions: "Place in boiling water for 7 minutes or until firm. Strain and serve with butter or sauce."},
    { id: 5, userId: 1, categoryId: 1, title: 'Steak and Eggs', source:'Grandpa', imgUrl:"https://food.fnr.sndimg.com/content/dam/images/food/fullset/2019/9/10/0/FNK_Steak-And-Eggs_H_s4x3.jpg.rend.hgtvcom.826.620.suffix/1568394998790.jpeg", instructions: "Cook the eggs overeasy on a skillet. Cook the steak on the same skillet. While cooking, add the pinch of salt and pepper. Serve on a plate."  },
  ]);
};
