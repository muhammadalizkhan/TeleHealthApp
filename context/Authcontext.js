import React, { useState, useEffect } from "react";
import SInfo from "react-native-sensitive-info";
import Auth0 from "react-native-auth0";
import { AUTH0_CLIENT_ID, AUTH0_DOMAIN } from "../config";

const auth0 = new Auth0({
  domain: AUTH0_DOMAIN,
  clientId: AUTH0_CLIENT_ID,
});

const AuthContext = React.createContext();

const AuthContextProvider = (props) => {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(null);
  const [userData, setUserData] = useState(null);

  const getUserData = async (access_token) => {
    const accessToken = access_token
      ? access_token
      : await SInfo.getItem("accessToken", {});

    const data = await auth0.auth.userInfo({ token: accessToken });
    return data;
  };

  // executed on first app load
  useEffect(() => {
    (async () => {
      try {
        const data = await getUserData();

        setLoggedIn(true);
        setUserData(data);
      } catch (err) {
        console.log("err: ", err);

        try {
          const refreshToken = await SInfo.getItem("refreshToken", {});
          const newAccessTokenResponse = await auth0.auth.refreshToken({
            refreshToken,
          });

          console.log("New access token response: ", newAccessTokenResponse);

          await SInfo.setItem(
            "accessToken",
            newAccessTokenResponse.accessToken,
            {}
          );

          console.log("New access token set: ", newAccessTokenResponse.accessToken);

          const userData = await getUserData(newAccessTokenResponse.accessToken);

          setUserData(userData);
          setLoggedIn(true);
        } catch (err) {
          console.log("error with refreshing token..");
          setLoggedIn(false);
        }
      }
    })();
  }, []);

  // executed when user just logged in
  useEffect(() => {
    (async () => {
      try {
        if (loggedIn) {
          const data = await getUserData();
          setUserData(data);
        }
      } catch (err) {
        console.log("error logging in: ", err);
      }
    })();
  }, [loggedIn]);

  // const login = async () => {
  //   try {
  //     const credentials = await auth0.webAuth.authorize({
  //       scope: "openid offline_access profile email",
  //     });

  //     console.log("Login credentials: ", JSON.stringify(credentials, null, 2));

  //     await SInfo.setItem("accessToken", credentials.accessToken, {});
  //     await SInfo.setItem("refreshToken", credentials.refreshToken, {});

  //     console.log("Access token set: ", credentials.accessToken);
  //     console.log("Refresh token set: ", credentials.refreshToken);

  //     setLoggedIn(true);
  //   } catch (err) {
  //     console.log("error logging in..", err);
  //   }
  // };
  const login = async () => {
    try {
      const credentials = await auth0.webAuth.authorize({
        scope: "openid offline_access profile email",
        // responseType: 'code',
        // redirectUri: 'https://myhealthcaresupport.co.uk/login/processing',
        // state: 'xyzABC123',
      });
  
      console.log("Login credentials: ", JSON.stringify(credentials, null, 2));
  
      await SInfo.setItem("accessToken", credentials.accessToken, {});
      await SInfo.setItem("refreshToken", credentials.refreshToken, {});
  
      console.log("Access token set: ", credentials.accessToken);
      console.log("Refresh token set: ", credentials.refreshToken);
  
      setLoggedIn(true);
    } catch (err) {
      console.log("error logging in..", err);
    }
  };

  const logout = async () => {
    try {
      await auth0.webAuth.clearSession({});

      await SInfo.deleteItem("accessToken", {});
      await SInfo.deleteItem("refreshToken", {});

      setLoggedIn(false);
      setUserData(null);
    } catch (err) {
      console.log("error logging out..", err);
    }
  };

  const value = {
    loading,
    loggedIn,
    login,
    logout,
    userData,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
