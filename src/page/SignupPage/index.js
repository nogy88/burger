import React, { useEffect, useState } from "react";
import css from "./style.module.css";
import Button from "../../components/General/Button";
import * as actions from "../../redux/action/signupActions";
import { connect } from "react-redux";
import Spinner from "../../components/General/Spinner";
import { Redirect } from "react-router-dom";

const Signup = props => {
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  
  const signup = () => {
    if (password1 === password2) {
      props.signupUser(email, password1);
    } else {
      setError("нууц үг хоорондоо таарахгүй байна!");
    }
  };

    return (
      <div className={css.Signup}>
        {props.userId && <Redirect to="/orders"/>}
        <h1>Бүртгэл үүсгэх</h1>
        <div>Мэдээллээ оруулна уу</div>
        <input
          type="text"
          onChange={(e)=> setEmail(e.target.value)}
          placeholder="Имэйл хаяг"
        />
        <input
          type="password"
          onChange={(e)=> setPassword1(e.target.value)}
          placeholder="Нууц үгээ оруулна уу"
        />
        <input
          type="password"
          onChange={(e) => setPassword2(e.target.value)}
          placeholder="Нууц үгээ давтан оруулна уу"
        />
        
        {error &&  <div style={{color: "red"}}>{error}</div>}
        
        {props.firebaseError && <div style={{color: "red"}}>{props.firebaseError}</div>}

        {props.saving && <Spinner />}

        <Button text="БҮРТГҮҮЛЭХ" btnType="Success" clicked={signup} />
      </div>
    );
 
}

const mapStateToProps = state => {
  return {
    saving: state.signupLoginReducer.saving,
    firebaseError: state.signupLoginReducer.firebaseError,
    userId: state.signupLoginReducer.userId 
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signupUser: (email, password) =>
      dispatch(actions.signupUser(email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
