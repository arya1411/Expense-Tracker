import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ value, onChange, placeholder, label, type, id }) => {
    const [showpassword, setshowpassword] = useState(false);

    const toggleShowPassword = () => {
        setshowpassword(!showpassword);
    };

    return (
        <div>
            <label htmlFor={id} className="text-[13px] text-gray-300 font-medium">{label}</label>
            <div className="input-box">
                <input
                    id={id}
                    type={type === 'password' ? (showpassword ? 'text' : 'password') : type}
                    placeholder={placeholder}
                    className="w-full outline-none"
                    value={value}
                    onChange={e => onChange(e.target.value)}
                />

                {type === 'password' && (
                    <>
                        {showpassword ? (
                            <FaRegEye
                                size={22}
                                className="text-primary cursor-pointer"
                                onClick={toggleShowPassword}
                            />
                        ) : (
                            <FaRegEyeSlash
                                size={22}
                                className="text-slate-400 cursor-pointer"
                                onClick={toggleShowPassword}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Input;