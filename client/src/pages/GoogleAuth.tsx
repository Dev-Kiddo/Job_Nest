import React from "react";

const GoogleAuth = () => {
  async function handleGoogleSignin(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    const res = await fetch(`http://localhost:6173/api/auth/google`);

    if (!res.ok) {
      throw new Error("Something went wrong");
    }

    const data = await res.json();

    console.log("data:", data);

    window.location.href = data.authUrl;
  }

  return (
    <>
      <h1>Hello</h1>
      <button className="bg-blue-300 p-2 rounded-lg" onClick={handleGoogleSignin}>
        Sign in with google
      </button>
    </>
  );
};

export default GoogleAuth;
