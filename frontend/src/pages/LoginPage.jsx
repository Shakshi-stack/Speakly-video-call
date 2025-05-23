import { useState } from "react";
import { ShipWheelIcon } from "lucide-react";
import { Link } from "react-router";
import useLogin from "../hooks/useLogin";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { isPending, error, loginMutation } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-200 to-base-100 p-4">
      <div className="backdrop-blur-md border border-base-300/50 shadow-xl rounded-3xl overflow-hidden w-full max-w-5xl flex flex-col lg:flex-row bg-white/10">
        {/* Left Section - Form */}
        <div className="w-full lg:w-1/2 p-8 sm:p-10">
          <div className="flex items-center gap-3 mb-6">
            <ShipWheelIcon className="size-8 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Speakly
            </h1>
          </div>

          {error && (
            <div className="alert alert-error mb-4">
              <span>{error.response?.data?.message}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <h2 className="text-xl font-semibold">Welcome Back</h2>
              <p className="text-sm text-muted opacity-70">
                Sign in to continue your language learning journey!
              </p>
            </div>

            <div className="space-y-3">
              {/* Email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email address"
                  className="input input-bordered input-sm w-full rounded-xl py-2"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  required
                />
              </div>

              {/* Password */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="********"
                  className="input input-bordered input-sm w-full rounded-xl py-2"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-full rounded-xl" disabled={isPending}>
                {isPending ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>

              <div className="text-center mt-4 text-sm">
                Don't have an account?{" "}
                <Link to="/signup" className="text-primary hover:underline">
                  Create one
                </Link>
              </div>
            </div>
          </form>
        </div>

        {/* Right Section - Image + Text */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent items-center justify-center p-10">
          <div className="max-w-md text-center space-y-5">
            <img
              src="/i.png"
              alt="Language connection illustration"
              className="rounded-xl shadow-md"
            />
            <h2 className="text-xl font-semibold">
              Connect with language partners worldwide
            </h2>
            <p className="text-sm text-muted opacity-70">
              Practice conversations, make friends, and improve your language skills together.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
