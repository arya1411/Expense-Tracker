import React, { useContext } from "react";
import { userContext } from "../../context/userContext";
import Navbar from "./Navbar";
import Sidemenu  from "./Sidemenu";

const DashboardLayout = ({ children, activeMenu }) => {
    const { user } = useContext(userContext);
    return (
        <div className="min-h-screen bg-[#0a0a0f]">
            <Navbar activeMenu={activeMenu} />
            {user && (
                <div className="flex">
                    <div className="max-[1080px]:hidden">
                        <Sidemenu activeMenu={activeMenu} />
                    </div>
                    <div className="grow mx-5">{children}</div>
                </div>
            )}
        </div>
    );
};

export default DashboardLayout