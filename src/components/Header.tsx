import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { LogOut, Menu } from "lucide-react";
// import { logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../store";
import { logout } from "../store/slices/authSlice";

interface HeaderProps {
  toggleSidebar: () => void;
}

export const Header = ({ toggleSidebar }: HeaderProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state?.auth?.user);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("loginUser");
    navigate("/auth");
  };

  return (
    <header className="bg-white border-b h-16 fixed top-0 left-0 right-0 z-30">
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2 lg:pl-64">
            <h1 className="text-2xl font-bold text-gray-800">
              Welcome,{" "}
              <span className="text-xl capitalize ">{user?.fullName}</span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleLogout}
            className="flex items-center cursor-pointer gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="hidden md:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};
