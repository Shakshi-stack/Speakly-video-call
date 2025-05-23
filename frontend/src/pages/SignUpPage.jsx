import { useState } from "react";
import { ShipWheelIcon } from "lucide-react";
import { Link } from "react-router";
import useSignUp from "../hooks/useSignUp";

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { isPending, error, signupMutation } = useSignUp();

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
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

          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <h2 className="text-xl font-semibold">Create an Account</h2>
              <p className="text-sm text-muted opacity-70">
                Join Speakly and start your language learning adventure!
              </p>
            </div>

            <div className="space-y-3">
              {/* Full Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Full Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="input input-bordered input-sm w-full rounded-xl py-2"
                  value={signupData.fullName}
                  onChange={(e) =>
                    setSignupData({ ...signupData, fullName: e.target.value })
                  }
                  required
                />
              </div>

              {/* Email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email address"
                  className="input input-bordered input-sm w-full rounded-xl py-2"
                  value={signupData.email}
                  onChange={(e) =>
                    setSignupData({ ...signupData, email: e.target.value })
                  }
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
                  value={signupData.password}
                  onChange={(e) =>
                    setSignupData({ ...signupData, password: e.target.value })
                  }
                  required
                />
                <p className="text-xs text-muted opacity-60 mt-1">
                  Password must be at least 6 characters long
                </p>
              </div>

              {/* Checkbox */}
              <div className="form-control">
                <label className="flex items-center gap-2 cursor-pointer">
  <input type="checkbox" className="checkbox checkbox-sm" required />

                  <span className="text-xs leading-snug">
                    I agree to the{" "}
                    <span className="text-primary hover:underline cursor-pointer">
                      terms of service
                    </span>{" "}
                    and{" "}
                    <span className="text-primary hover:underline cursor-pointer">
                      privacy policy
                    </span>
                    .
                  </span>
                </label>
              </div>
            </div>

            <button className="btn btn-primary w-full rounded-xl" type="submit">
              {isPending ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>

            <div className="text-center text-sm mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Sign in
              </Link>
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
              Practice conversations, make friends, and improve your language
              skills together.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
