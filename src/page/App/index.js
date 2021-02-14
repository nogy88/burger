import React, { useState, useEffect, Suspense } from "react";
import style from "./style.module.css";
import Toolbar from "../../components/Toolbar";
import SideBar from "../../components/SideBar";
import { Route, Switch } from "react-router-dom";
import {Redirect} from "react-router-dom"
import ShippingPage from "../ShippingPage";
import LoginPage from "../LoginPage";
import Logout from "../../components/Logout";
import { connect } from "react-redux";
import * as actions from "../../redux/action/loginActions"
import * as signupActions from "../../redux/action/signupActions"

const BurgerPage = React.lazy(()=>{
  return import("../../page/BurgerPage");
})

const SignupPage = React.lazy(()=>{
  return import("../SignupPage");
})

const OrdersPage = React.lazy(()=>{
  return import("../OrdersPage");
})

const App = props => {
  const [showSideBar, setShowSideBar] = useState(false);

  const toggleSideBar = () => {
    setShowSideBar((prevShowSideBar) => !prevShowSideBar);
  };

  useEffect(()=>{
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const expiresDate = new Date(localStorage.getItem('expiresDate'));
    const refreshToken = localStorage.getItem('refreshToken');

    if(userId){
      if(expiresDate > new Date()){
        // hugatsaa n duusagui token bn, autologin hiine
        props.autoLogin(token,userId);
        // token huchintei bolohod uldej bga hugatsag olj ter hugatsanii auto logout hiine
        props.autoLogoutAfterMillisec(expiresDate.getTime() - new Date().getTime())
      } else {
          // token hugatsaa n duussan bn
          props.logout();
      }
    }
  }, []);

    return (
      <div>
        <Toolbar toggleSideBar={toggleSideBar} />
        
        <SideBar showSideBar={showSideBar} toggleSideBar={toggleSideBar} />
        
        <main className={style.Content}>
          <Suspense fallback={<div>Түр хүлээнэ үү...</div>}>
          {props.userId ? (
          <Switch>
            <Route path="/logout" component={Logout} />
            <Route path="/orders" component={OrdersPage} />
            <Route path="/ship" component={ShippingPage} />
            <Route path="/" component={BurgerPage} />
          </Switch>
           ) : (
          <Switch>
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignupPage} />
            <Redirect to="login"/>
          </Switch>
        )}
          </Suspense>
        </main>
      </div>
    );
  }

const mapStateToProps = (state) => {
  return {
    userId: state.signupLoginReducer.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    autoLogin: (token, userId) => dispatch(actions.loginUserSucces(token, userId)),   
    autoLogout: () => dispatch(signupActions.logout()),
    autoLogoutAfterMillisec: () => dispatch(signupActions.autoLogoutAfterMillisec()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
