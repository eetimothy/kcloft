import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
    auth,
    registerWithEmailAndPassword,
    signInWithGoogle,
} from "../../../firebase";

import "./Register.css";

export default function RegisterUser() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [user, loading] = useAuthState(auth);
    const history = useNavigate();

    useEffect(() => {
        if (loading) return;
        if (user) history("/dashboard");
      }, [user, loading, history]);

    const register = () => {
        if (!displayName) alert("Please enter name");
        registerWithEmailAndPassword(displayName, email, password);
      };

    return (
        <div className="register">
          <div className="register__container">
            <input
              type="text"
              className="register__textBox"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Display Name"
            />
            <input
              type="text"
              className="register__textBox"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail Address"
            />
            <input
              type="password"
              className="register__textBox"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button className="register__btn" onClick={register}>
              Register
            </button>
            <button
              className="register__btn register__google"
              onClick={signInWithGoogle}
            >
              Register with Google
            </button>
            <div>
              Already have an account? <Link to="/login">Login</Link> now.
            </div>
          </div>
        </div>
      );

}