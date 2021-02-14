import React from 'react';
import css from './style.module.css'
import { connect } from "react-redux";
import * as actions from "../../redux/action/burgerActions";

const BuildControl = (props) => (
    <div className={css.BuildControl}>
        <div className={css.Label}> {props.orts}</div>
        <button disabled={props.disabledIngredients[props.type]} onClick={() => props.ortsHasah(props.type)} className={css.Less}>Хасах</button>
        <button onClick={() => props.ortsNemeh(props.type)} className={css.More}>Нэмэх</button>
    </div >
)

const mapDispatchToProps = (dispatch) => {
    return {
      ortsNemeh: (ortsNer) => dispatch(actions.addIngredient(ortsNer)),
      ortsHasah: (ortsNer) => dispatch(actions.removeIngredient(ortsNer)),
    };
  };

export default connect(null, mapDispatchToProps)(BuildControl);