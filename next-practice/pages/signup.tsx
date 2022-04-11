import React, { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Signup = () => {
  const { status } = useSession();
  const router = useRouter();

  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  if (status === "authenticated") {
    router.replace("/");
    return (
      <div>
        <h1>Sign Up</h1>
        <div>You are already signed up.</div>
        <div>Now redirect to main page.</div>
      </div>
    );
  }

  const createUser = async (name: string, email: string, password: string) => {
    let response: any;

    return new Promise(async (resolve, reject) => {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const resjson = await response.json();
      resolve(resjson);
    });
  };

  const sendInfo = async (e) => {
    const enteredName = nameInputRef.current?.value;
    const enteredEmail = emailInputRef.current?.value;
    const enteredPassword = passwordInputRef.current?.value;

    const result = await createUser(enteredName, enteredEmail, enteredPassword);
    console.log(result);
    // setFormStatus(`Sign up Success: ${result.message}`);
    // window.location.href = "/";
    router.replace("/api/auth/signin");
  };

  return (
    <div
      style={{
        width: "20rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        border: "1px solid #2c82c9",
        padding: "1rem",
      }}
    >
      <div style={{ display: "flex" }}>
        <div style={{ width: "5rem" }}>
          <a>name</a>
        </div>
        <input ref={nameInputRef}></input>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ width: "5rem" }}>
          <a>email</a>
        </div>
        <input ref={emailInputRef}></input>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ width: "5rem" }}>
          <a>password</a>
        </div>
        <input ref={passwordInputRef}></input>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          style={{
            backgroundColor: "#2c82c9",
            color: "#fff",
            border: "1px solid #2c82c9",
            padding: "0.2rem",
          }}
          onClick={sendInfo}
        >
          sign up
        </button>
      </div>
    </div>
  );
};

export default Signup;
