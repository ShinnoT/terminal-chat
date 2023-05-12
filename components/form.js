"use client";

import { useState } from "react";

const Form = () => {
    const [userName, setUserName] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        setUserName(e.target.username.value);
        console.log("Custom username set.");
    };

    return (
        <form
            className="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit}
        >
            <div className="mb-4">
                <label
                    className="block text-green-500 tracking-widest font-bold text-base mb-2"
                    htmlFor="username"
                >
                    Username
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 mb-1.5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    placeholder="E.g. sn9x55"
                    maxLength={8}
                />
                <p className="text-gray-600 text-xs">
                    Maximum of 7 characters.
                </p>
            </div>
            <div className="flex items-center justify-center">
                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Sign In
                </button>
            </div>
        </form>
    );
};

export default Form;
