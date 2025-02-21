import { useDispatch } from "react-redux";
import { AuthResponse, UserData } from "../types/common";
import { AppDispatch } from "../store";
import { logout as logoutSlices, setUser } from "../store/slices/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const usersData: UserData[] =
    (localStorage.getItem("user") &&
      JSON.parse(localStorage.getItem("user") || "")) ??
    [];

  const isAuthenticated = (): boolean => {
    const user = localStorage.getItem("loginUser");
    return !!user;
  };
  const getUser = () => {
    const user: UserData =
      (localStorage.getItem("loginUser") &&
        JSON.parse(localStorage.getItem("loginUser") || "")) ??
      [];
    return user;
  };
  const login = (user: UserData): Promise<AuthResponse> => {
    return new Promise((resolve) => {
      const findUser = usersData?.find(
        (item: UserData) =>
          item?.password === user?.password && item?.email === user?.email
      );

      if (findUser) {
        dispatch(setUser(findUser));
        localStorage.setItem("loginUser", JSON.stringify(findUser));
        resolve({
          success: true,
          message: "Login successful",
        });
      } else {
        resolve({
          success: false,
          message: "Please enter a valid password and email",
        });
      }
    });
  };

  const logout = (): void => {
    dispatch(logoutSlices());
    localStorage.removeItem("user");
  };

  const register = (user: UserData): Promise<AuthResponse> => {
    return new Promise((resolve) => {
      const findUser = usersData?.find(
        (item: UserData) => item?.email === user?.email
      );
      if (findUser) {
        resolve({
          success: false,
          message: "this email is already register",
        });
      } else {
        usersData.push(user);
        localStorage.setItem("loginUser", JSON.stringify(user));
        localStorage.setItem("user", JSON.stringify(usersData));
        resolve({
          success: true,
          message: "Registration successful",
        });
      }
    });
  };

  return { isAuthenticated, login, logout, register, getUser };
};
