import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import Sidemenu from "./Sidemenu";

const Navbar = ({activeMenu}) =>{
    const [openSideMenu , setOpenSideMenu ] = useState(false);
    return (
        <div className="flex gap-5 bg-[#12121a] border-b border-white/10 backdrop-blur-sm py-4 px-7 sticky top-0 z-30">
             <button
             className="block lg:hidden text-white"
             onClick={()=>{
                setOpenSideMenu(!openSideMenu);
             }}
             >
                {openSideMenu ? (
                    <HiOutlineX className="text-2xl"/>
                ) : (
                    <HiOutlineMenu className="text-2xl" />
                )}
             </button>
             <h2 className="text-lg font-semibold text-white">Expense Tracker</h2>

             {openSideMenu && (
                <div className="fixed top-[61px] -ml-4 bg-[#12121a] border-r border-white/10">
                    <Sidemenu activeMenu={activeMenu} />
                </div>
             )}
        </div>
    )
}
export default Navbar;