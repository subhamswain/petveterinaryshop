import { BehaviorSubject } from "rxjs";
import { signUpAPI } from "../config/api";
// import config from 'config';
// import { handleResponse } from '@/_helpers';

const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem("currentUser"))
);



const login = function (role) {
  console.log(role);
  localStorage.setItem("currentUser", JSON.stringify(role));
  localStorage.setItem("currentUserId", JSON.stringify("2"));
  currentUserSubject.next(role);

  return role;
};

const logout = function () {
  localStorage.removeItem("currentUser");
  currentUserSubject.next(null);
};

const signUp = function (newUser) {
  const user = {
    name: newUser.name,
    surname: newUser.surname,
    email: newUser.email,
    phone: newUser.phone,
    address: newUser.address,
  };
  console.log(user);
  const headers = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };
  fetch(signUpAPI, headers).then((response) => console.log(response));
};

export const authenticationService = {
  login,
  logout,
  signUp,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  },
};
