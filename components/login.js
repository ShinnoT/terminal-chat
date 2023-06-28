"use client";

import { useState, useEffect } from "react";
import { useConnection } from "@/context/connect";
import { useRouter } from "next/navigation";

const LoginForm = () => {
    const { connection } = useConnection();
    const router = useRouter();
    let [error, setError] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        const username = event?.target?.username?.value;
        connection.emit("login", { username });
        connection.on("login", (data) =>
            data?.success ? router.push("/chat") : setError(data?.error)
        );
    };

    return (
        <form
            className="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit}
        >
            <div>
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
                    autoFocus="autofocus"
                    maxLength={8}
                />
                <p className="text-gray-600 text-xs">
                    Maximum of 7 characters.
                </p>
            </div>
            <div className="mb-5 h-2">
                {error && (
                    <span className="flex items-center font-medium tracking-wide text-red-500 text-sm">
                        {error}
                    </span>
                )}
            </div>
            <div className="flex items-center justify-center">
                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold tracking-wide py-1 px-6 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Sign In
                </button>
            </div>
        </form>
    );
};

export default LoginForm;
