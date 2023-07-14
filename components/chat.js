"use client";

import Message from "./subcomponents/message";
import MessageInput from "./subcomponents/message-input";

import { useConnection } from "@/context/connect";
import { useEncryptionKey } from "@/context/encrypt";
import { useState, useEffect, useRef } from "react";
import { sanitize } from "dompurify";

import { generateIV, encrypt, decrypt } from "@/helpers/encryption";

const Chat = () => {
    const { connection } = useConnection();
    const secretKey = useEncryptionKey();
    const [currentUser, setCurrentUser] = useState(null);
    const [othersInRoom, setOthersInRoom] = useState(["none"]);
    const [roomId, setRoomId] = useState(null);
    const [messages, setMessages] = useState([]);
    const chatbox = useRef(null);

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
                        type: "message",
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
                        type: "message",
                        encrypted: false,
                        value: sanitizedMessage,
                        iv: null,
                    },
                });
            }
        }
        event?.target?.reset();
    };

    const userHandler = ({ username, room_id, user_type }) => {
        // NOTE: only send below message if user is ADMIN
        // TODO: move this below message out of this useEffect and create another useEffect that runs only on ComponentDidMount
        connection.emit("loggingMessage", {
            username,
            room_id,
            message: {
                type: "log",
                encrypted: false,
                value: `${
                    user_type === "ADMIN" ? "created" : "joined"
                } room ${room_id} ::: [ connection established ]`,
                iv: null,
            },
        });
        setCurrentUser(username) || setRoomId(room_id);
    };

    const allOtherUsersHandler = ({ user, allUsersInRoom }) => {
        const { username, room_id } = user;
        const styledUsers = allUsersInRoom.map((username) => `@${username}`);

        if (othersInRoom.toString() !== allUsersInRoom.toString()) {
            connection.emit("loggingMessage", {
                username,
                room_id,
                message: {
                    type: "log",
                    encrypted: false,
                    value: `connected in room ::: [ ${
                        allUsersInRoom.length ? styledUsers.join(", ") : "null"
                    } ]`,
                    iv: null,
                },
            });
            setOthersInRoom(allUsersInRoom);
        }
    };

    const messageHandler = async ({ username, message }) => {
        const { type, encrypted, value, iv } = message;
        if (encrypted && secretKey) {
            const decryptedMessage = await decrypt({
                secretKey,
                iv,
                message: value,
            });
            setMessages((prev) => [
                ...prev,
                { username, message: decryptedMessage, type },
            ]);
        }
        if (!encrypted) {
            setMessages((prev) => [
                ...prev,
                { username, message: value, type },
            ]);
        }
    };

    useEffect(() => chatbox.current.scrollIntoView(false), [messages]);

    useEffect(() => {
        if (connection) {
            connection.emit("fetchUser");
            connection.on("user", userHandler);
            return () => connection.off("user", userHandler);
        }
    }, [connection]);

    useEffect(() => {
        if (connection) {
            connection.emit("fetchAllOtherUsers");
            connection.on("allOtherUsers", allOtherUsersHandler);
            return () => connection.off("allOtherUsers", allOtherUsersHandler);
        }
    }, [connection, othersInRoom]);

    useEffect(() => {
        if (connection) {
            connection.on("message", messageHandler);
            return () => connection.off("message", messageHandler);
        }
    }, [connection, secretKey]);

    return (
        <div className="flex h-full p-2 flex-col items-left justify-between bg-gray-900 rounded">
            <h1 className="text-center text-xl text-gray-500 mb-2">
                Room ::: {roomId}
            </h1>
            <div className="h-full overflow-y-auto bg-gray-800 rounded">
                <div ref={chatbox}>
                    {messages &&
                        messages.map(({ username, message, type }, i) => (
                            <Message
                                key={i}
                                user={username}
                                messageType={type}
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
            </div>
            <MessageInput handleNewMessage={handleNewMessage} />
        </div>
    );
};

export default Chat;
