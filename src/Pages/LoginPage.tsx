import Login from "../containers/Login";

function LoginPage() {
  const handleLoginSuccess = (token: string) => {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("isLoggedIn", "true");

    window.location.replace("/dashboard");
  };

  return (
    <div className="App">
      <Login onLoginSuccess={handleLoginSuccess} />
    </div>
  );
}

export default LoginPage;
