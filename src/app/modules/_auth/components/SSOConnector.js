/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import PopupLogInOut from "../../../layout/components/PopupLogInOut";
import * as CONST from "../../../../Constant";
import * as authRedux from "../_redux/authRedux";
import * as authCRUD from "../_redux/authCrud";
import * as layoutRedux from '../../../layout/_redux/layoutRedux'

function SSOConnector(props) {
  const dispatch = useDispatch();
  const [ssoMessage, setSSOMessage] = React.useState({});
  const [loaded, setLoaded] = React.useState(false)
  const authReducer = useSelector(({ auth }) => auth);

  const { isAuthorized } = useSelector(
    ({ auth }) => ({
      isAuthorized: auth.user != null,
    }),
    shallowEqual
  );

  const handleLoggedIn = (token) =>
    new Promise((resolve) => {
      debugger
      let loginDetail = {};

      //get token
      loginDetail.authToken = token;

      //get user
      loginDetail.user = authCRUD.getUserByToken(token);

      // get exp
      let exp = authCRUD.getExp(token);
      loginDetail.exp = exp;

      //get roles
      loginDetail.roles = authCRUD.getRoles(token);

      dispatch(authRedux.actions.renewToken(loginDetail));
      resolve();
    });

  const handleLoggedOut = () =>
    new Promise((resolve) => {
      dispatch(authRedux.actions.logout());
      resolve();
    });

  React.useEffect(() => {
    const handler = (event) => {
      if (event.origin === CONST.SSO_URL) {
        setSSOMessage(JSON.parse(event.data));
      }
    };
    window.addEventListener("message", handler);
    // clean up
    return () => window.removeEventListener("message", handler);
  }, []);

  React.useEffect(() => {
    if (ssoMessage.eventType === "token-updated") {
      if (
        ssoMessage.eventMessage !== "" &&
        ssoMessage.eventMessage !== "null" &&
        ssoMessage.eventMessage !== null
      ) {
        //set login
        if (ssoMessage.eventMessage !== authReducer.authToken) {
          console.log("token-updated:", ssoMessage.eventMessage);
          handleLoggedIn(ssoMessage.eventMessage).then(() => {
            dispatch(layoutRedux.actions.hidePopupLogInOut())
          });
        } else {
          dispatch(layoutRedux.actions.hidePopupLogInOut())
        }
      } else {
        //set logout
        console.log("token-updated:", "logged-out");
        handleLoggedOut().then(() => {
          dispatch(layoutRedux.actions.showPopupLogInOut())
        });
      }
      setLoaded(true)
    }
  }, [ssoMessage]);

  return (
    <React.Fragment>
      {loaded && (
        <React.Fragment>{isAuthorized && props.children}</React.Fragment>
      )}
      <PopupLogInOut></PopupLogInOut>
    </React.Fragment>
  );
}

export default SSOConnector;
