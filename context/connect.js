"use client";

import { usePathname, useRouter } from "next/navigation";
import { useContext, createContext, useState, useEffect } from "react";
import io from "socket.io-client";

// import supportsColor from "supports-color";

const ConnectionContext = createContext();
const useConnection = () => useContext(ConnectionContext);

const ConnectionProvider = ({ children }) => {
    const [connection, setConnection] = useState(null);
    // const [isAuthenticated, setIsAuthenticated] = useState(false);
    // const pathName = usePathname();
    // const router = useRouter();

    useEffect(() => {
        // socketInitializer();
        const socket = io("http://localhost:9000");
        // socket.connect();

        const connectionHandler = () => {
            console.log("Client connected!");
            console.log("User: ", socket.id);
            setConnection(socket);
        };

        // const isAuthHandler = (data) => {
        //     console.log("running isAuthenticated event handler.");
        //     const { isAuth } = data;
        //     setIsAuthenticated(isAuth);
        //     // const pathName = usePathname();
        //     console.log("pathName: ", pathName);
        //     console.log("isAuth? ", isAuth);
        //     if (pathName === "/chat" && !isAuth) router.push("/");
        // };

        socket.on("connect", connectionHandler);
        // socket.on("isAuthenticated", isAuthHandler);

        return () => {
            socket.off("connect", connectionHandler);
            // socket.off("isAuthenticated", isAuthHandler);
            // socket.disconnect();
        };
    }, []);

    // const socketInitializer = () => {
    //     try {
    //         // const res = await fetch("/api/socket");
    //         // const data = await res.json();

    //         // if (!res.ok) throw new Error(`${res?.status}: ${data?.error}`);

    //         // console.log("api call successfull: ", res?.status, data);
    //         // // ---------------------------------------------------------------------------------------
    //         // const socket = io(undefined, {
    //         //     path: "/api/socket",
    //         //     autoConnect: false,
    //         //     transports: ["polling", "websocket"],
    //         // });

    //         // ---------------------------------------------------------------------------------------
    //     } catch (error) {
    //         console.log("there was an error calling the API: ", error);
    //     }
    // };

    return (
        <ConnectionContext.Provider value={{ connection }}>
            {children}
        </ConnectionContext.Provider>
    );
};

// NOTE: useConnection use case: const { connection } = useConnection()
export { useConnection, ConnectionProvider as default };
