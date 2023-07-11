"use client";

import Message from "./subcomponents/message";
import MessageInput from "./subcomponents/message-input";

import { useConnection } from "@/context/connect";
import { useEncryptionKey } from "@/context/encrypt";
import { useState, useEffect } from "react";
import { sanitize } from "dompurify";

import { generateIV, encrypt, decrypt } from "@/helpers/encryption";

const Chat = () => {
    const { connection } = useConnection();
    const secretKey = useEncryptionKey();
    const [currentUser, setCurrentUser] = useState(null);
    const [roomId, setRoomId] = useState(null);
    const [messages, setMessages] = useState([]);

    const handleNewMessage = async (event) => {
        event.preventDefault();
        const { message } = event?.target;
        const sanitizedMessage = sanitize(message?.value);

        if (sanitizedMessage) {
            if (secretKey) {
                const iv = generateIV();
                const encryptedMessage = await encrypt({
                    secretKey,
                    iv,
                    message: sanitizedMessage,
                });
                connection.emit("sendMessage", {
                    username: currentUser,
                    room_id: roomId,
                    message: {
                        encrypted: true,
                        value: encryptedMessage,
                        iv,
                    },
                });
            }
            if (!secretKey) {
                connection.emit("sendMessage", {
                    username: currentUser,
                    room_id: roomId,
                    message: {
                        encrypted: false,
                        value: sanitizedMessage,
                        iv: null,
                    },
                });
            }
        }
        event?.target?.reset();
    };

    useEffect(() => {
        if (connection) {
            const userHandler = ({ username, room_id, user_type }) => {
                // NOTE: only send below message if user is ADMIN
                if (user_type === "ADMIN")
                    connection.emit("sendMessage", {
                        username,
                        room_id,
                        message: {
                            encrypted: false,
                            value: `created room ${room_id} and is now connected.`,
                            iv: null,
                        },
                    });
                setCurrentUser(username) || setRoomId(room_id);
            };
            const messageHandler = async ({ username, message }) => {
                const { encrypted, value, iv } = message;
                if (encrypted && secretKey) {
                    console.log("encrypted message:: ", encrypted);
                    console.log("secret key:: ", secretKey);
                    console.log("iv:: ", iv);
                    const decryptedMessage = await decrypt({
                        secretKey,
                        iv,
                        message: value,
                    });
                    setMessages((prev) => [
                        ...prev,
                        { username, message: decryptedMessage },
                    ]);
                }
                if (!encrypted) {
                    setMessages((prev) => [
                        ...prev,
                        { username, message: value },
                    ]);
                }
            };
            if (!secretKey) {
                connection.emit("fetchUser");
                connection.on("user", userHandler);
            }
            connection.on("message", messageHandler);
            return () => {
                connection.off("user", userHandler);
                connection.off("message", messageHandler);
            };
        }
    }, [connection, secretKey]);

    return (
        <div className="flex h-full p-2 flex-col items-left justify-between bg-gray-900 rounded">
            <h1 className="text-center text-xl text-gray-500 mb-2">
                Room ::: {roomId}
            </h1>
            <div className="h-full overflow-y-auto bg-gray-800 rounded">
                {messages &&
                    messages.map(({ username, message }, i) => (
                        <Message
                            key={i}
                            user={username}
                            color={
                                username === currentUser
                                    ? "text-green-700"
                                    : "text-green-400"
                            }
                        >
                            {message}
                        </Message>
                    ))}
            </div>
            <MessageInput handleNewMessage={handleNewMessage} />
        </div>
    );
};

export default Chat;
