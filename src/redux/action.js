import * as types from "./actionTypes";
import { auth } from "../firebase";
import axiosClient from "../util/axiosClient";
import jwt from "jsonwebtoken"

const loginStart = () => ({
  type: types.LOGIN_START,
});

const loginSuccess = (user) => ({
  type: types.LOGIN_SUCCESS,
  payload: user,
});

const loginFail = (error) => ({
  type: types.LOGIN_FAIL,
  payload: error,
});

const logoutStart = () => ({
  type: types.LOGOUT_START,
});

const logoutSuccess = () => ({
  type: types.LOGOUT_SUCCESS,
});

const logoutFail = (error) => ({
  type: types.LOGOUT_FAIL,
  payload: error,
});

export const loginInitiate = (email, password) => async dispatch => {
  dispatch(loginStart)
   try {
      const res = await auth.signInWithEmailAndPassword(email, password);
      if (res.user) {
        const token = await res.user.getIdToken();
        const db_token = await axiosClient.post('authentication/login', {token: `${token}`}, { headers: {"content-type": "application/json-patch+json"}});
        const decode_token = jwt.decode(db_token.token);
        const user = {...decode_token};
        localStorage.setItem("__token", db_token?.token);
        dispatch(loginSuccess(user));
      }
   } catch (error) {
    dispatch(loginFail(error.message))
   }
//  return function(dispatch) {
//     dispatch(loginStart());
//     //lấy token từ firebase
//     try {
//       const res =   auth.signInWithEmailAndPassword(email, password);
//       if (res.user) {
//         const token =  res.user.getIdToken();
//         const db_token =   axiosClient.post('authentication/login/login', token);
//         const decode_token = jwt.decode(db_token);
//         const user = {...decode_token};
//         dispatch(loginSuccess(user));
//       }
//     } catch (error) {
//       dispatch(loginFail(error.message))
//     }
   
      // auth.signInWithEmailAndPassword(email, password).then(() => {
      //   const token = await res.user.getIdToken();
      //   const db_token = await axiosClient.post('authentication/login/login', token);
      //   const decode_token = jwt.decode(db_token);
      //   const user = {...decode_token};
      //   dispatch(loginSuccess(user));
      // }
      // ).catch((error) =>  dispatch(loginFail(error.message))

   
    // auth
    //   .signInWithEmailAndPassword(email, password)
    //   .then(( res ) => {
    //     const token = res.user.getIdToken();
    //     // dispatch(loginSuccess(user));
    //   })
    //   .catch((error) => dispatch(loginFail(error.message)));
  };
// };

export const logoutInitiate = () => {
  return function (dispatch) {
    dispatch(logoutStart());
    auth
      .signOut()
      .then((res) => dispatch(logoutSuccess()))
      .catch((error) => dispatch(logoutFail(error.message)));
  };
};
