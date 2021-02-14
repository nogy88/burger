import React, { useState } from "react";
import css from "./style.module.css";
import Button from "../../components/General/Button";
import { connect } from "react-redux";
import * as actions from "../../redux/action/loginActions";
import Spinner from "../../components/General/Spinner";
import { Redirect } from "react-router-dom";

const Login = props => {
  const [form, setForm] = useState({email: "", password: ""});
  
  const login = () => {
    props.login(form.email, form.password);
  };

  const changeEmail = (e) => {
    const newEmail = e.target.value;
    setForm((formBefore) => ({email: newEmail, password: formBefore.password}));
  };

  const changePassword = (e) => {
    const newPass = e.target.value;
    setForm((formBefore) => ({email: formBefore.email, password: newPass}));
  };

  return (
      <div className={css.Login}>
        {props.userId && <Redirect to="/"/>}
        <input
          type="text"
          onChange={changeEmail}
          placeholder="Имэйл хаяг"
        />
        <input
          type="password"
          onChange={changePassword}
          placeholder="Нууц үг"
        />

        {props.loggingIn && <Spinner />}

        {props.firebaseError && (
          <div style={{ color: "red" }}>{props.firebaseError}</div>
        )}

        {props.userId && <Redirect to="/orders" />}

        <Button text="ЛОГИН" btnType="Success" clicked={login} />
      </div>
    );
  }

const mapStateToProps = (state) => {
  return {
    loggingIn: state.signupLoginReducer.loggingIn,
    firebaseError: state.signupLoginReducer.firebaseError,
    userId: state.signupLoginReducer.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => dispatch(actions.loginUser(email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
