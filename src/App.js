import React, { useState } from "react";
import firebase from "firebase/app";
import "./App.css";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
function App() {
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    photo: "",
  });
  const provider = new firebase.auth.GoogleAuthProvider();
  const handleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        var { displayName, photoURL, email } = res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
        };
        setUser(signedInUser);
      })
      .catch((error) => {
        // var errorCode = error.code;
        // var errorMessage = error.message;
        // var email = error.email;
        // var credential = error.credential;
        console.log(error);
        console.log(error.message);
      });
  };
  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then((res) => {
        const signedOutUser = {
          isSignedIn: false,
          name: "",
          photo: "",
          email: "",
        };
        setUser(signedOutUser);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.message);
      });
  };
  return (
    <div>
      {user.isSignedIn ? (
        <button onClick={handleSignOut}>Sing Out</button>
      ) : (
        <button onClick={handleSignIn}>sign in</button>
      )}
      {user.isSignedIn && (
        <div>
          <p> welcome, {user.name}</p>
          <p>Your email:{user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      )}
    </div>
  );
}

export default App;