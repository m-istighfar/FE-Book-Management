import Login from "../containers/Login";

function LoginPage() {
  const handleLoginSuccess = (accessToken: string) => {
    localStorage.setItem("accessToken", accessToken);
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
