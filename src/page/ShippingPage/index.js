import React, { useState } from "react";
import { connect } from "react-redux";

import Burger from "../../components/Burger";
import Button from "../../components/General/Button";
import css from "./style.module.css";
import { Route } from "react-router-dom";
import ContactData from "../../components/ContactData";

const ShippingPage = (props) => { 

  const goBack = (props) => {
    props.history.goBack();
  };

  const goContactData = () => {
    props.history.replace("/ship/contact");
  };

    return (
      <div className={css.ShippingPage}>
        <h2>Таны захиалга амттай байх болно гэж найдаж байна...</h2>
        <h2>Дүн: {props.totalPrice}₮</h2>
        <Burger />

        <Button
          clicked={goBack}
          btnType="Danger"
          text="ЗАХИАЛГЫГ ЦУЦЛАХ"
        />
        <Button
          clicked={goContactData}
          btnType="Success"
          text="ХҮРГЭЛТИЙН МЭДЭЭЛЭЛ ОРУУЛАХ"
        />
        <Route path="/ship/contact">
          <ContactData />
        </Route>
      </div>
    );
  }


const mapStateToProps = (state) => {
  return {
    totalPrice: state.burgerReducer.totalPrice,
  };
};

export default connect(mapStateToProps)(ShippingPage);
