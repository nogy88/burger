import React from "react";
import { connect } from "react-redux";

import BuildControl from "../BuildControl";
import css from "./style.module.css";
import * as actions from "../../redux/action/burgerActions";

const BuildControls = (props) => {
  const disabledIngredients = { ...props.ingredients };
  for (let key in disabledIngredients) {
    disabledIngredients[key] = disabledIngredients[key] <= 0;
  }

  return (
    <div className={css.BuildControls}>
      <p>
        Бургерийн үнэ: <strong>{props.price}</strong>
      </p>

      {Object.keys(props.ingredientNames).map((el) => (
        <BuildControl
          key={el}
          disabledIngredients={disabledIngredients}
          type={el}
          orts={props.ingredientNames[el]}
        />
      ))}

      <button
        onClick={props.showConfirmModal}
        disabled={!props.purchasing}
        className={css.OrderButton}
      >
        ЗАХИАЛАХ
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerReducer.ingredients,
    ingredientNames: state.burgerReducer.ingredientNames,
    price: state.burgerReducer.totalPrice,
    purchasing: state.burgerReducer.purchasing,
  };
};



export default connect(mapStateToProps)(BuildControls);
