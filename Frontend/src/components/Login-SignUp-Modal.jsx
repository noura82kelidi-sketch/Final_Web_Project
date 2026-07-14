import { useContext } from "react";
import { AuthContext } from "../App";
import { useState } from "react";
import { get, post } from "../utils/httpClient";
function LoginModal({ closeModal }) {
  const { user, setUser } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    if (
      fullName != "" &&
      email != "" &&
      password != "" &&
      confirmPassword != ""
    ) {
      const user = await get(`/Users/${email}`);
      if (!user || user.length === 0) {
        if (password !== confirmPassword) {
          alert("Passwords do not match");
          return;
        } else if (password == "") {
          alert("Please Fill in Passwords");
          return;
        } else if (confirmPassword == "") {
          alert("Please Fill in confirmPasswords");
          return;
        } else if (confirmPassword == "" && password == "") {
          alert("Please Fill in Password and confirmPasswords");
          return;
        }

        const newUser = await post(`/Users`, { fullName, email, password });

        setUser(newUser);
        alert("Account created successfully");
        closeModal();
      } else {
        alert("You have an Account already!");
      }
    } else {
      alert("Fill all inputs!");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = await get(`/Users/${email}`);
    if (!user) {
      alert("There isn't any Account with this Email !");
      return;
    }
    if (password !== user.password) {
      alert("Password is not correct");
      return;
    } else {
      alert("Login successful");

      setUser(user);

      closeModal();
    }
  };
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={closeModal}
    >
      <div
        className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-6 flex items-center justify-between border-b pb-4">
          <h2 className="text-xl font-semibold">
            {isLogin ? "Sign in to your account" : "Create a new account"}
          </h2>

          <button
            onClick={closeModal}
            className="text-2xl text-gray-500 hover:text-black"
          >
            ×
          </button>
        </div>

        <form onSubmit={isLogin ? handleLogin : handleCreateAccount}>
          {!isLogin && (
            <div className="mb-4">
              <label htmlFor="name" className="mb-2 block text-sm font-medium">
                Full Name
              </label>

              <input
                id="name"
                type="text"
                placeholder="John Doe"
                className="w-full rounded-md border px-3 py-2 focus:border-sky-500 focus:outline-none"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="email" className="mb-2 block text-sm font-medium">
              Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="example@email.com"
              className="w-full rounded-md border px-3 py-2 focus:border-sky-500 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full rounded-md border px-3 py-2 focus:border-sky-500 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {!isLogin && (
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-medium"
              >
                Confirm Password
              </label>

              <input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                className="w-full rounded-md border px-3 py-2 focus:border-sky-500 focus:outline-none"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-md bg-sky-500 py-2 text-white hover:bg-sky-600"
          >
            {isLogin ? "Login" : "Create Account"}
          </button>

          <div className="mt-5 text-center text-sm">
            {isLogin ? (
              <>
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => setIsLogin(false)}
                  className="font-semibold text-sky-500 hover:underline"
                >
                  Create account
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className="font-semibold text-sky-500 hover:underline"
                >
                  Login
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;

//ساختار مودال با کمک سایت Flowbite نوشته شده است.
//در return بخش های شرطی با کمک هوش مصنوعی نوشته شده است.