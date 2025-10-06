import React, { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash } from 'react-icons/lu';

const ProfilePhotoSelc = ({ image, setImage }) => {
    const inputref = useRef(null);
    const [previewUrl, SetpreviewUrl] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
            const preview = URL.createObjectURL(file);
            SetpreviewUrl(preview);
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
        SetpreviewUrl(null);
    };

    const onChoosefile = () => {
        inputref.current.click();
    };

    return (
        <div className="flex flex-col items-center mb-6">
            <input
                type="file"
                accept="image/*"
                ref={inputref}
                onChange={handleImageChange}
                className="hidden"
            />
            <div className="relative w-24 h-24">
                {!image ? (
                    <div className="w-24 h-24 flex items-center justify-center bg-purple-100 rounded-full border-2 border-primary">
                        <LuUser className="text-purple-400" size={48} />
                        <button
                            type="button"
                            className="absolute bottom-2 right-2 w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full shadow-md hover:bg-purple-700 transition"
                            onClick={onChoosefile}
                            title="Upload photo"
                        >
                            <LuUpload size={20} />
                        </button>
                    </div>
                ) : (
                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary relative">
                        <img
                            src={previewUrl}
                            alt="profile"
                            className="w-full h-full object-cover"
                        />
                        <button
                            type="button"
                            className="absolute bottom-2 right-2 w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full shadow-md hover:bg-red-700 transition"
                            onClick={handleRemoveImage}
                            title="Remove photo"
                        >
                            <LuTrash size={20} />
                        </button>
                    </div>
                )}
            </div>
            <span className="text-xs text-slate-500 mt-2">
                {image ? "Change or remove your photo" : "Upload your profile photo"}
            </span>
        </div>
    );
};

export default ProfilePhotoSelc;

