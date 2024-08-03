// import React, { useState, useEffect } from "react";
// import SInfo from "react-native-sensitive-info";


// import DeviceInfo from "react-native-device-info";

// import { Linking,Clipboard } from 'react-native';
// import CryptoJS from "crypto-js";
// import pkceChallenge from 'react-native-pkce-challenge';
// import { AUTH0_DOMAIN, AUTH0_CLIENT_ID } from "../config";
// const challenge = pkceChallenge();

// const AuthContext = React.createContext();

// const AuthContextProvider = (props) => {
//   const [loading, setLoading] = useState(true);
//   const [loggedIn, setLoggedIn] = useState(null);
//   const [userData, setUserData] = useState(null);


//   // Function to get user data from Auth0
//   const getUserData = async (access_token) => {
//     const accessToken = access_token
//       ? access_token
//       : await SInfo.getItem("accessToken", {});

//     if (accessToken) {
//       // Example: Replace with your Auth0 API call to get user profile info
//            const response = await fetch(`https://${AUTH0_DOMAIN}/userinfo`, {
//          headers: {
//            Authorization: `Bearer ${accessToken}`
//          }
//        });
//        const data = await response.json();
//       return data;

//       return null; // Placeholder for Auth0 user info retrieval
//     } else {
//       return null;
//     }
//   };
//   const refreshToken = async () => {
//     try {
//       const refreshToken = await SInfo.getItem('refreshToken', {});
//       const tokenUrl = `https://${AUTH0_DOMAIN}/oauth/token`;

//       const response = await fetch(tokenUrl, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           grant_type: 'refresh_token',
//           client_id: AUTH0_CLIENT_ID,
//           refresh_token: refreshToken,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to refresh token');
//       }

//       const tokenResponse = await response.json();
//       await SInfo.setItem('accessToken', tokenResponse.access_token, {});
//       await SInfo.setItem('refreshToken', tokenResponse.refresh_token, {});
//       const userData = getUserData(newAccessTokenResponse.accessToken);

//       setUserData(userData);
//       setLoggedIn(true);
//       return tokenResponse.access_token;
//     } catch (error) {
//       console.log("error with refreshing token..");
//           setLoggedIn(false);
//     }
//   };
//   useEffect(() => {
//     (async () => {
//       try {
//         const accessToken = await SInfo.getItem('accessToken', {});

//         const data = await getUserData(accessToken);
//         if (data) {
//           setLoggedIn(true);
//           setUserData(data);
//         }
//       } catch (err) {
//         console.log("err: ", err);
//         refreshToken();

//       }
//     })();
//   }, []);

//   // executed when user just logged in
//   useEffect(() => {
//     (async () => {
//       try {
//         if (loggedIn) {
//           const accessToken = await SInfo.getItem('accessToken', {});
//           const data = await getUserData(accessToken);
//           setUserData(data);
//         } else {
//           await SInfo.deleteItem("accessToken", {});
//           await SInfo.deleteItem("refreshToken", {});
//           setLoggedIn(false);
//           setUserData(null);
//         }
//       } catch (err) {
//         console.log("error logging in: ", err);
//       }
//     })();
//   }, [loggedIn]);



//   // Generate a code_challenge from the code_verifier
//  useEffect(() => {

//     const handleOpenUrl = (event) => {
//       handleAuthorizationCallback(event);
//     };

//     Linking.addEventListener('url', handleOpenUrl);

//     return () => {
//       Linking.removeAllListeners('url');
//     };
//   }, []);
//   const login = async () => {


//     try {
//       const authorizationUrl = `https://${AUTH0_DOMAIN}/authorize?` +

//         `&scope=openid profile email offline_access` +
//         `&response_type=code` +
//         `&client_id=${AUTH0_CLIENT_ID}` +
//         `&code_challenge=${challenge.codeChallenge}` +
//         `&code_challenge_method=S256` +
//         `&redirect_uri=com.telehealthapp.auth0://${AUTH0_DOMAIN}/android/com.telehealthapp/callback`;


//        Linking.openURL(authorizationUrl)

//     } catch (err) {
//       console.log("error logging in..", err);
//     }
//   };
//   const handleAuthorizationCallback = async (event) => {

//     //Linking.removeEventListener('url', handleAuthorizationCallback);


//     const url = event.url;
//     const code = getCodeFromUrl(url);


//     if (code) {
//       console.log('Auth code = ', code);

//       // try {

//       //   const tokenResponse = await exchangeCodeForToken(code);
//       //   Clipboard.setString("Authcode: " + code + "\n tokens :" + JSON.stringify(tokenResponse));
//       //   alert("Authcode: " + code + "\n tokens :" + JSON.stringify(tokenResponse))
//       //   await SInfo.setItem("accessToken", tokenResponse.access_token, {});
//       //   await SInfo.setItem("refreshToken", tokenResponse.refresh_token, {});

//       //   setLoggedIn(true);
//       //   const userData = await getUserData(tokenResponse.access_token);
//       //   setUserData(userData);
//       // } catch (error) {
//       //   console.log("Error exchanging code for token:", error);
//       // }
//     } else {
//       console.log("Authorization code not found in URL");
//     }
//   };
//   const getCodeFromUrl = (url) => {
//     const regex = /[?&]code=([^&#]*)/;
//     const match = regex.exec(url);
//     return match && decodeURIComponent(match[1]);
//   };

//   const constructLogoutUrl = () => {
//     const returnToUrl = encodeURIComponent('com.telehealthapp.auth0://dev-uk6xcsqkgii66syi.us.auth0.com/android/com.telehealthapp/callback');

//     return `https://${AUTH0_DOMAIN}/v2/logout?client_id=${AUTH0_CLIENT_ID}&returnTo=${returnToUrl}`;
//   };

//   const exchangeCodeForToken = async (code) => {
//     const tokenUrl = `https://${AUTH0_DOMAIN}/oauth/token`;

//     const redirectUri = `com.telehealthapp.auth0://${AUTH0_DOMAIN}/android/com.telehealthapp/callback`;

//     const tokenResponse = await fetch(tokenUrl, {
//       method: 'post',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         grant_type: 'authorization_code',
//         client_id: AUTH0_CLIENT_ID,
//         code_verifier: challenge.codeVerifier,
//         code: code,
//         redirect_uri: redirectUri,
//         scope:"openid profile email offline_access"
//       }),
//     });

//     if (!tokenResponse.ok) {
//       throw new Error('Failed to exchange code for token');
//     }

//     return tokenResponse.json();
//   };
//   const logout = async () => {
//     try {
//       const logoutUrl = constructLogoutUrl();

//       // Open logout URL to initiate logout process
//       Linking.openURL(logoutUrl);

//       await SInfo.deleteItem("accessToken", {});
//       await SInfo.deleteItem("refreshToken", {});

//       setLoggedIn(false);
//       setUserData(null);
//     } catch (err) {
//       console.log("error logging out..", err);
//     }
//   };

//   const value = {
//     loading,
//     loggedIn,
//     login,
//     logout,
//     userData,
//   };

//   return (

//     <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
//   );
// };

// export { AuthContext, AuthContextProvider };

import React, { useState, useEffect } from "react";
import SInfo from "react-native-sensitive-info";


import DeviceInfo from "react-native-device-info";

import { Linking, Clipboard, Alert } from 'react-native';
// import { AUTH0_CLIENT_ID, AUTH0_DOMAIN, SCHEMA, CLIENT_SECRET } from "../../config";
import CryptoJS from "crypto-js";
import pkceChallenge from 'react-native-pkce-challenge';
import { AUTH0_CLIENT_ID , AUTH0_DOMAIN, SCHEMA, CLIENT_SECRET} from "../config";
const challenge = pkceChallenge();

const AuthContext = React.createContext();

const AuthContextProvider = (props) => {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(null);
  const [userData, setUserData] = useState(null);

   console.log('user data = ', JSON.stringify(userData, null, 2));


  useEffect(() => {
    (async () => {
      try {
        const authcode = await SInfo.getItem('authcode', {});
        if (authcode) {
          const userData = await loginUser(authcode);

          if (userData) {
            setLoggedIn(true);
            setUserData(data);
          }
        }
      } catch (err) {
        console.log("err: ", err);
        refreshToken();

      }
    })();
  }, []);

  // executed when user just logged in
  useEffect(() => {
    (async () => {
      try {
        if (loggedIn) {
          const authcode = await SInfo.getItem('authcode', {});
          const userData = await loginUser(authcode);
          setUserData(userData.user);
        } else {
          await SInfo.deleteItem("authcode", {});

          setLoggedIn(false);
          setUserData(null);
        }
      } catch (err) {
        console.log("error logging in: ", err);
      }
    })();
  }, [loggedIn]);



  // Generate a code_challenge from the code_verifier
  useEffect(() => {

    const handleOpenUrl = (event) => {
      handleAuthorizationCallback(event);
    };

    Linking.addEventListener('url', handleOpenUrl);

    return () => {
      Linking.removeAllListeners('url');
    };
  }, []);
  const login = async () => {


    try {
      const authorizationUrl = `https://${AUTH0_DOMAIN}/authorize?` +

        `&scope=openid profile email offline_access` +
        `&response_type=code` +
        `&client_id=${AUTH0_CLIENT_ID}` +
        `&client_secret=${CLIENT_SECRET}` +
        `&redirect_uri=${SCHEMA}.auth0://${AUTH0_DOMAIN}/android/${SCHEMA}/callback`;


      Linking.openURL(authorizationUrl)

    } catch (err) {
      console.log("error logging in..", err);
    }
  };
  const handleAuthorizationCallback = async (event) => {

    //Linking.removeEventListener('url', handleAuthorizationCallback);


    const url = event.url;
    const authcode = getCodeFromUrl(url);



    if (authcode) {
      try {

        //const tokenResponse = await exchangeCodeForToken(code);
        // Clipboard.setString("Authcode: " + authcode);
        // Alert.alert("Authcode: " + authcode)
        console.log("Authcode: " + authcode)

        await SInfo.setItem("authcode", authcode, {});
        // await SInfo.setItem("refreshToken", tokenResponse.refresh_token, {});


        const userData = await loginUser(authcode);
        console.log(userData)
        setLoggedIn(true);
        setUserData(userData);
      } catch (error) {
        console.log("Error ", error);
      }
    } else {
      console.log("Authorization failed");
    }
  };
  const getCodeFromUrl = (url) => {
    const regex = /[?&]code=([^&#]*)/;
    const match = regex.exec(url);
    return match && decodeURIComponent(match[1]);
  };

  const constructLogoutUrl = () => {
    const returnToUrl = encodeURIComponent(`${SCHEMA}.auth0://${AUTH0_DOMAIN}/android/${SCHEMA}/callback`);

    return `https://${AUTH0_DOMAIN}/v2/logout?client_id=${AUTH0_CLIENT_ID}&returnTo=${returnToUrl}`;
  };
  const loginUser = async (authCode) => {
    const url = 'https://api-dev.mhc.doginfo.click/user/login?platform=app';
    // Replace with your actual Bearer token


    const response = await fetch(url, {
      method: 'post',
      headers: {

        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: authCode,

      }),
    });



    // Handle the response as needed
    if (!response.ok) {
      throw new Error('Unable to login');
    } else {

    }

    return response.json()

  };
  const exchangeCodeForToken = async (code) => {
    const tokenUrl = `https://${AUTH0_DOMAIN}/oauth/token`;

    const redirectUri = `${SCHEMA}.auth0://${AUTH0_DOMAIN}/android/${SCHEMA}/callback`;

    const tokenResponse = await fetch(tokenUrl, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grant_type: 'authorization_code',
        client_id: AUTH0_CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: code,
        redirect_uri: redirectUri,
        scope: "openid profile email offline_access"
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error('Failed to exchange code for token');
    }

    return tokenResponse.json();
  };
  const logout = async () => {
    try {
      const logoutUrl = constructLogoutUrl();

      // Open logout URL to initiate logout process
      Linking.openURL(logoutUrl);

      await SInfo.deleteItem("authcode", {});


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
