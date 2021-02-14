import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import Spinner from "../General/Spinner";
import css from "./style.module.css";
import Button from "../General/Button";
import { withRouter } from "react-router-dom";
import * as actions from "../../redux/action/orderAction";

const ContactData = props => {
  const [name, setName] = useState();
  const [city, setCity] = useState();
  const [street, setStreet] = useState();

  const dunRef = useRef();

  useEffect(()=> {
    if (props.newOrderStatus.finished && !props.newOrderStatus.error) {
      props.history.replace("/orders");
    }

    return () => {
      // Clear function : zahialgiig butsaagd hoosolno. Daraachiin zahialgad beltgene

      props.clearOrder();
    }
  }, [props.newOrderStatus.finished]);

  const changeName = (e) => {
    if(dunRef.current.style.color === "red") 
      dunRef.current.style.color = "green";
    else dunRef.current.style.color = "red"
    
    setName(e.target.value);
  };

  const changeCity = (e) => {
   setCity(e.target.value);
  };

  const changeStreet = (e) => {
    setStreet(e.target.value);
  };

  const sendOrder = () => {
    const newOrder = {
      userId: props.userId,
      orts: props.ingredients,
      dun: props.price,
      hayag: {
        name,
        city,
        street
      },
    };

    props.saveOrderAction(newOrder);
    // setState({ loading: true });
    //promise ashigladag

  };

    console.log(props);
    return (
      <div className={css.ContactData}>
        <div ref={dunRef}>
          <strong> Дүн: {props.price}₮ </strong>
        <div>
      </div>    
          {props.newOrderStatus.error &&
            `Захиалгыг хадгалах явцад алдаа гарлаа ${props.newOrderStatus.error}`}
        </div>
        {props.newOrderStatus.saving ? (
          <Spinner />
        ) : (
          <div>
            <input
              onChange={changeName}
              type="text"
              name="name"
              placeholder="Таны нэр"
            />
            <input
              onChange={changeCity}
              type="text"
              name="city"
              placeholder="Таны хот"
            />
            <input
              onChange={changeStreet}
              type="text"
              name="street"
              placeholder="Таны гэрийн хаяг"
            />
            <Button clicked={sendOrder} btnType="Success" text="ИЛГЭЭХ" />
          </div>
        )}
      </div>
    );
  }


const mapStateToProps = (state) => {
  return {
    price: state.burgerReducer.totalPrice,
    ingredients: state.burgerReducer.ingredients,
    newOrderStatus: state.orderReducer.newOrder,
    userId: state.signupLoginReducer.userId
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveOrderAction: (newOrder) => dispatch(actions.saveOrder(newOrder)),
    clearOrder: () => dispatch(actions.clearOrder())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ContactData));
