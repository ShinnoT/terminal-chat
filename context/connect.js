"use client";

import { useContext, createContext, useState, useEffect } from "react";
import io from "socket.io-client";

// import supportsColor from "supports-color";

const Context = createContext();
const useConnection = () => useContext(Context);

const Provider = ({ children }) => {
    const [connection, setConnection] = useState(null);

    useEffect(() => {
        socketInitializer();
    }, []);

    const socketInitializer = () => {
        try {
            // const res = await fetch("/api/socket");
            // const data = await res.json();

            // if (!res.ok) throw new Error(`${res?.status}: ${data?.error}`);

            // console.log("api call successfull: ", res?.status, data);
            // // ---------------------------------------------------------------------------------------
            // const socket = io(undefined, {
            //     path: "/api/socket",
            //     autoConnect: false,
            //     transports: ["polling", "websocket"],
            // });

            const socket = io("http://localhost:9000");
            socket.connect();

            const connectionHandler = () => {
                console.log("Client connected!");
                setConnection(socket);
            };

            socket.on("connect", connectionHandler);

            return () => {
                socket.off("connect", connectionHandler);
                socket.disconnect();
            };
            // ---------------------------------------------------------------------------------------
        } catch (error) {
            console.log("there was an error calling the API: ", error);
        }
    };

    return (
        <Context.Provider value={{ connection }}>{children}</Context.Provider>
    );
};

export { Context as default, useConnection, Provider };
