"use client";

import { useState, useEffect } from "react";
import { useConnection } from "@/context/connect";
import { useRouter } from "next/navigation";
import InputField from "./subcomponents/input";

const LoginForm = () => {
    const { connection } = useConnection();
    const router = useRouter();
    let [error, setError] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        const { username, room_id, room_password } = event?.target;
        // connection.emit("login", {
        //     username: username?.value,
        //     room_id: room_id?.value,
        //     room_password: room_password?.value,
        // });
        connection.emit("login", {
            username: username?.value,
        });
        connection.on("login", (data) =>
            data?.success ? router.push("/chat") : setError(data?.error)
        );
    };

    return (
        <form
            className="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit}
        >
            <InputField
                requiredClass="required"
                fieldLabel="username"
                autofocus={true}
                inputType="text"
                placeholder="E.g. sn9x55"
                maxLength={8}
                inputLabel="Maximum of 8 characters."
                error={error}
            />
            <InputField
                requiredClass="required"
                fieldLabel="room_id"
                autofocus={false}
                inputType="text"
                placeholder="E.g. FreedomChat99"
                maxLength={20}
                inputLabel="Maximum of 20 characters."
                error={error}
            />
            <InputField
                requiredClass="required"
                fieldLabel="room_password"
                autofocus={false}
                inputType="password"
                placeholder="E.g. _69helloworld"
                maxLength={8}
                inputLabel="Maximum of 8 characters."
                error={error}
            />
            <InputField
                requiredClass="optional"
                fieldLabel="room_members_limit"
                autofocus={false}
                inputType="number"
                placeholder="E.g. 3"
                maxLength={10}
                inputLabel="Leave empty for no limit."
                error={error}
                disabled={true}
            />
            <div className="flex items-center justify-center">
                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold tracking-wide mt-3 py-1 px-6 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Sign In
                </button>
            </div>
        </form>
    );
};

export default LoginForm;
