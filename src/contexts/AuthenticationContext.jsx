/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from "react";

const AuthenticationContext = createContext();

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error("Unkonw Action");
  }
}

const intialState = {
  user: null,
  isAuthenticated: false,
};

function AuthenticationProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    intialState
  );

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
      console.log("login succ");
    } else {
      console.log("login Failed");
    }
  }

  function logout() {
    dispatch({ type: "logout" });
    console.log("logout");
  }

  return (
    <AuthenticationContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}

function useAuthentication() {
  const context = useContext(AuthenticationContext);
  if (context === undefined) {
    throw new Error(
      "The Authentication Context is used outside the cities Provider"
    );
  }
  return context;
}

export { AuthenticationProvider, useAuthentication };
