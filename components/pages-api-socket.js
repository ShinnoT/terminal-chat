// import { Server } from "socket.io";
// import {
//     handleOnLogin,
//     handleOnUsersOnline,
//     handleOnCreateRoom,
//     handleOnJoinRoom,
//     handleOnJoinRoomStranger,
//     handleOnLeaveRoom,
//     handleOnLeaveRoomStranger,
//     handleOnIsTyping,
//     handleOnClearMessages,
//     handleOnRoomMembers,
//     handleOnDisconnect,
//     handleOnFetchUser,
//     handleOnMessage,
//     handleOnFetchRooms,
//     handleOnFetchRoom,
// } from "@/helpers/socket-helpers";

// // import "supports-color";

// const config = {
//     // api: {
//     //     bodyParser: false,
//     // },
// };

// const handler = async (req, res) => {
//     try {
//         console.log("============= NEXTJS GET REQUEST INITIALIZED");
//         if (res?.socket?.server?.io) {
//             console.log("Socket is already running");
//             res.status(200).json({ message: "Server already running" });
//             return;
//         } else {
//             console.log("Socket is initializing");

//             const io = new Server(res?.socket?.server, {
//                 pingInterval: 10000,
//                 pingTimeout: 5000,
//                 path: "/api/socket",
//                 addTrailingSlash: false,
//             });

//             res.socket.server.io = io;

//             io.use((socket, next) => {
//                 setInterval(() => {
//                     socket.emit("ping", "pong");
//                 }, 1000);
//                 next();
//             });

//             io.on("connection", (socket) => {
//                 console.log("%%%%%% Server connected!");

//                 // socket.join("global");

//                 //         socket.on("login", handleOnLogin({ socket, io }));

//                 //         socket.on("fetchUser", handleOnFetchUser(socket));

//                 //         // socket.on("fetchRooms", handleOnFetchRooms(socket));

//                 //         // socket.on("UsersOnline", handleOnUsersOnline(socket));

//                 //         // socket.on("createRoom", handleOnCreateRoom({ socket, io }));

//                 //         // socket.on("joinRoom", handleOnJoinRoom(socket));

//                 //         // socket.on("joinRoomStranger", handleOnJoinRoomStranger({ socket, io }));

//                 //         // socket.on("leaveRoom", handleOnLeaveRoom(socket));

//                 //         // socket.on("leaveRoomStranger", handleOnLeaveRoomStranger(socket));

//                 //         // socket.on("ClearMessages", handleOnClearMessages(socket));

//                 //         // socket.on("IsTypping", handleOnIsTyping(socket));

//                 //         // socket.on("roomMembers", handleOnRoomMembers(socket));

//                 //         // // updateMembers function was here

//                 //         // socket.on("message", handleOnMessage(socket));

//                 //         // socket.on("fetchRoom", handleOnFetchRoom(socket));

//                 socket.on("disconnect", (data) =>
//                     console.log("USER DISCONNECTED")
//                 );
//             });
//         }

//         res.status(200).json({
//             message: "Connection established successfully.",
//         });
//         console.log("api request completed successfully");
//     } catch (error) {
//         console.log("there was an error: ", error);
//         res.status(400).json({ error });
//     }
// };

// export { handler as default, config };
