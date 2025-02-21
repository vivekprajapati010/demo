import { Navigate } from "react-router-dom";
import { PrivateRouteProps } from "../types/common";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/authSlice";
import { AppDispatch } from "../store";

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated, getUser } = useAuth();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(setUser(getUser()));
  }, []);
  return isAuthenticated() ? <>{children}</> : <Navigate to="/auth" />;
};
