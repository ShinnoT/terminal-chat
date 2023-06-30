"use client";

import Message from "./subcomponents/message";
import MessageInput from "./subcomponents/message-input";

import { useConnection } from "@/context/connect";
import { useState, useEffect } from "react";

const Chat = () => {
    const { connection } = useConnection();
    const [currentUser, setCurrentUser] = useState(null);
    const [roomId, setRoomId] = useState(null);
    const [messages, setMessages] = useState([]);

    const handleNewMessage = (event) => {
        event.preventDefault();
        const { message } = event?.target;
        connection.emit("sendMessage", {
            username: currentUser,
            room_id: roomId,
            message: message?.value,
        });
        event?.target?.reset();
    };

    useEffect(() => {
        if (connection) {
            const userHandler = ({ username, room_id, user_type }) => {
                console.log("USER TYPE:: ", user_type);
                // NOTE: only send below message if user is ADMIN

                if (user_type === "ADMIN")
                    connection.emit("sendMessage", {
                        username,
                        room_id,
                        message: `created room ${room_id} and is now connected.`,
                    });
                setCurrentUser(username) || setRoomId(room_id);
            };
            const messageHandler = (message) =>
                setMessages((prev) => [...prev, message]);
            connection.emit("fetchUser");
            connection.on("user", userHandler);
            connection.on("message", messageHandler);
            return () => {
                connection.off("user", userHandler);
                connection.off("message", messageHandler);
            };
        }
    }, [connection]);

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
