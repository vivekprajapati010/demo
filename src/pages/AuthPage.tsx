import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormValidation } from "../hooks/useFormValidation";
import { useAuth } from "../hooks/useAuth";
import { Eye, EyeOff, Mail, Lock, Phone, User } from "lucide-react";
import {
  emailRegex,
  mobileRegex,
  passwordRegex,
  showToaster,
} from "../utility";

const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState("");
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const { login, register, isAuthenticated } = useAuth();
  const loginValidate = (name: string, value: string): string => {
    switch (name) {
      case "email":
        return emailRegex.test(value) ? "" : "Invalid email address";

      case "password":
        if (!passwordRegex.test(value)) {
          return "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character";
        }
        return "";

      default:
        return "";
    }
  };
  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/dashboard");
    }
  }, []);
  const registrationValidate = (name: string, value: string): string => {
    switch (name) {
      case "fullName":
        return value?.length > 0 ? "" : "Please enter your full name";
      case "email":
        return emailRegex.test(value) ? "" : "Invalid email address";

      case "mobile":
        return mobileRegex.test(value) ? "" : "Mobile number must be 10 digits";

      case "password":
        if (!passwordRegex.test(value)) {
          return "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character";
        }
        return "";

      case "confirmPassword":
        return value === values.password ? "" : "Passwords do not match";
      case "gender":
        return value ? "" : "Please select your gender";
      default:
        return "";
    }
  };
  const { values, errors, handleChange, isValid, clearError, resetForm } =
    useFormValidation(
      {
        fullName: "",
        confirmPassword: "",
        email: "",
        password: "",
        mobile: "",
        gender: "",
      },
      isLogin ? loginValidate : registrationValidate
    );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isValid()) {
      setLoading(true);
      try {
        let res = null;
        if (isLogin) {
          res = await login(values);
        } else {
          res = await register(values);
        }
        if (res?.success) {
          showToaster({ message: res?.message, type: "success" });
          navigate("/dashboard");
        } else {
          showToaster({ message: res?.message, type: "error" });
        }
        resetForm();
      } catch (error) {
        console.error("Auth error:", error);
      } finally {
        setLoading(false);
      }
    }
  };
  if (isAuthenticated()) {
    return <></>;
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="max-w-md w-full space-y-8 bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            {isLogin ? "Welcome back" : "Create account"}
          </h2>
          <p className="mt-2 text-gray-600">
            {isLogin
              ? "Sign in to access your account"
              : "Sign up to get started with our service"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            {!isLogin && (
              <div>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    name="fullName"
                    type={"text"}
                    value={values.fullName}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className={`w-full pl-10 pr-12 py-3 rounded-lg border ${
                      errors.fullName ? "border-red-300" : "border-gray-300"
                    } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                  />
                </div>
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                )}
              </div>
            )}

            <div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                    errors.email ? "border-red-300" : "border-gray-300"
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  name="password"
                  type={showPassword === "password" ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className={`w-full pl-10 pr-12 py-3 rounded-lg border ${
                    errors.password ? "border-red-300" : "border-gray-300"
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      showPassword === "password" ? "" : "password"
                    )
                  }
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  {showPassword === "password" ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>
            {!isLogin && (
              <>
                <div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      name="confirmPassword"
                      type={
                        showPassword === "confirmPassword" ? "text" : "password"
                      }
                      value={values.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm Password"
                      className={`w-full pl-10 pr-12 py-3 rounded-lg border ${
                        errors.confirmPassword
                          ? "border-red-300"
                          : "border-gray-300"
                      } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          showPassword === "confirmPassword"
                            ? ""
                            : "confirmPassword"
                        )
                      }
                      className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword === "confirmPassword" ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender
                  </label>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={values.gender === "male"}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700 cursor-pointer">Male</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={values.gender === "female"}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700 cursor-pointer">Female</span>
                    </label>
                  </div>
                  {errors.gender && (
                    <p className="mt-1 text-sm text-red-600">{errors.gender}</p>
                  )}
                </div>
                <div>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      name="mobile"
                      type={"text"}
                      value={values.mobile}
                      onChange={handleChange}
                      placeholder="Mobile"
                      className={`w-full pl-10 pr-12 py-3 rounded-lg border ${
                        errors.mobile ? "border-red-300" : "border-gray-300"
                      } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                    />
                  </div>
                  {errors.mobile && (
                    <p className="mt-1 text-sm text-red-600">{errors.mobile}</p>
                  )}
                </div>{" "}
              </>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                <span className="ml-2">Processing...</span>
              </div>
            ) : isLogin ? (
              "Sign in"
            ) : (
              "Create account"
            )}
          </button>

          <div className="flex items-center my-4">
            <div className="flex-1 border-t border-gray-300"></div>
            <p className="mx-4 text-sm text-gray-500">or</p>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                clearError();
                setIsLogin(!isLogin);
              }}
              className="text-sm text-blue-600 hover:text-blue-500 font-medium focus:outline-none cursor-pointer"
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
