"use client";

import { useState } from "react";
import { useConnection } from "@/context/connect";
import { useRouter } from "next/navigation";
import InputField from "./input";

const JoinRoom = () => {
    console.log("Join Room Form.");
    const { connection } = useConnection();
    const router = useRouter();
    const [usernameError, setUsernameError] = useState(null);
    const [roomIdError, setRoomIdError] = useState(null);
    const [roomPasswordError, setRoomPasswordError] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        const { username, room_id, room_password } = event?.target;
        connection.emit("login", {
            username: username?.value,
            room_id: room_id?.value,
            room_password: room_password?.value,
        });
        connection.on("login", (data) => {
            const { success } = data;
            if (success) {
                setUsernameError("✔️");
                setRoomIdError("✔️");
                setRoomPasswordError("✔️");
                // settimeout used so that user can see login for displayed all checkmarks before routing
                // also settimeout used in context/authentication.js before calling "LOGIN" dispatch on success
                // NOTE: logic below can be moved to context/authentication.js after success event????
                setTimeout(() => {
                    router.push("/chat");
                }, 500);
            }
            if (!success) {
                const { error } = data;
                setUsernameError(error?.usernameError || "✔️");
                setRoomIdError(error?.roomIdError || "✔️");
                setRoomPasswordError(error?.roomPasswordError || "✔️");
            }
        });
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
                error={usernameError}
            />
            <InputField
                requiredClass="required"
                fieldLabel="room_id"
                autofocus={false}
                inputType="text"
                placeholder="E.g. FreedomChat99"
                maxLength={20}
                inputLabel="Maximum of 20 characters."
                error={roomIdError}
            />
            <InputField
                requiredClass="required"
                fieldLabel="room_password"
                autofocus={false}
                inputType="password"
                placeholder="E.g. _69helloworld"
                maxLength={8}
                inputLabel="Maximum of 8 characters."
                error={roomPasswordError}
            />
            <InputField
                requiredClass="optional"
                fieldLabel="room_members_limit"
                autofocus={false}
                inputType="number"
                placeholder="E.g. 3"
                maxLength={10}
                inputLabel="Leave empty for no limit."
                error={null}
                disabled={true}
            />
            <div className="flex items-center justify-center">
                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold tracking-wide mt-3 py-1 px-6 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Authenticate
                </button>
            </div>
        </form>
    );
};

export default JoinRoom;
