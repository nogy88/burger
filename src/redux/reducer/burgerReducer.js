const initialState = {
  ingredients: {
    bacon: 0,
    cheese: 0,
    meat: 0,
    salad: 0,
  },
  totalPrice: 1000,
  purchasing: false,
  ingredientNames: {
    bacon: "Гахайн мах",
    cheese: "Бяслаг",
    meat: "Үхрийн мах",
    salad: "Салад",
  },
};

const INGREDIENTS_PRICES = { bacon: 800, cheese: 500, meat: 1500, salad: 300 };

const burgerReducer = (state = initialState, action) => {
  if (action.type === "ADD_INGREDIENT") {
    console.log(action.ortsNer);
    return {
      ...state,
      ingredients: {
        ...state.ingredients,
        [action.ortsNer]: state.ingredients[action.ortsNer] + 1,
      },
      totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ortsNer],
      purchasing: true,
    };
  } else if (action.type === "REMOVE_INGREDIENT") {
    const newPrice = state.totalPrice - INGREDIENTS_PRICES[action.ortsNer];
    return {
      ...state,
      ingredients: {
        ...state.ingredients,
        [action.ortsNer]: state.ingredients[action.ortsNer] - 1,
      },
      totalPrice: newPrice,
      purchasing: newPrice > 1000,
    };
  } else if (action.type === "CLEAR_ORDER"){
    return initialState;
  }
  return state;
};

export default burgerReducer;
