import React, { useContext } from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../context/userContext";

const Sidemenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(userContext);
  const navigate = useNavigate();

  const handleClick = (route) => {
    // Logout item uses path '/logout' in SIDE_MENU_DATA
    if (route === "/logout") {
      handleLogout();
      return;
    }
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    // Send user to landing page after logout with a full reload to avoid auth interceptors
    window.location.replace("/main");
  };

  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-[#12121a] border-r border-white/10 p-5 sticky top-[61px] z-20">
      <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
        {user?.profileImageUrl ? (
          <img
            src={user.profileImageUrl}
            alt="Profile Image"
            className="w-20 h-20 bg-slate-400 rounded-full object-cover border-2 border-gray-200 shadow-sm"
          />
        ) : (
          <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center border-2 border-purple-500 shadow-sm cursor-cell">
            <span className="text-white text-2xl font-semibold ">
              {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
            </span>
          </div>
        )}
        <h5 className="text-white font-medium leading-6 text-center cursor-default ">
          {user?.fullName || ""}
        </h5>
      </div>
      <div className="flex flex-col gap-2">
        {SIDE_MENU_DATA.map((item, index) => (
          <button
            key={`menu_${index}`}
            className={`w-full flex items-center gap-3 text-[15px] py-3 px-4 rounded-lg transition-colors duration-150 mb-1 ${
              activeMenu === item.label ? "bg-purple-600 text-white" : "text-gray-300 hover:bg-white/5"
            }`}
            onClick={() => handleClick(item.path)}
          >
            <item.icon className="text-xl" />
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidemenu;
