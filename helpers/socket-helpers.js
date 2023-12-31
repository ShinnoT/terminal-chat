// const updateMembers = async ({ io, room }) => {
//     const sockets = await io.in(room).fetchSockets();
//     const members = sockets.map((socket) => socket.data.user);
//     if (members.length > 0) {
//         io.in(room).emit("roomMembers", {
//             success: true,
//             data: members,
//         });
//     } else {
//         delete io.sockets.adapter.rooms[room];
//     }
// };

// const handleOnLogin =
//     ({ socket, io }) =>
//     async (data) => {
//         const { username } = data;

//         const allSockets = await io.fetchSockets();
//         const userSockets = allSockets.filter(
//             (s) => s?.data?.user?.username === username
//         );

//         if (userSockets.length > 0)
//             return socket.emit("login", {
//                 error: "Username already taken",
//             });

//         let user = {
//             username,
//         };

//         if (username == "Aaron") {
//             user = {
//                 username,
//                 verified: true,
//             };
//         } else {
//             user = {
//                 username,
//             };
//         }

//         socket.data.user = user;
//         socket.emit("login", {
//             success: true,
//             data: user,
//         });
//     };

// const handleOnUsersOnline = (socket) => async () => {
//     socket.emit("UsersOnline", { success: true });
// };

// const handleOnCreateRoom =
//     ({ socket, io }) =>
//     (data) => {
//         const { name, password, maxUsers } = data;
//         if (!name)
//             return socket.emit("createRoom", {
//                 success: false,
//                 error: "Name is required",
//             });
//         if (io.sockets.adapter.rooms[name])
//             return socket.emit("createRoom", {
//                 success: false,
//                 error: "Room already exists",
//             });
//         let room = {
//             id: Math.random().toString(36).substring(2, 9),
//             name: name.replace(/[^a-zA-Z0-9 ]/g, ""),
//             owner: socket.data.user,
//             users: 1,
//             maxUsers: maxUsers,
//         };

//         if (password) room.password = password;

//         io.sockets.adapter.rooms[room.id] = room;

//         socket.rooms.forEach((user_room) => {
//             socket.leave(user_room);
//             updateMembers({ io, room: user_room });
//             socket.to(user_room).emit("message", {
//                 system: true,
//                 message: `${socket.data.user.username} left the room`,
//             });
//         });
//         socket.join(room.id);
//         socket.emit("createRoom", { success: true, data: room });
//     };

// const handleOnJoinRoom = (socket) => async (data) => {
//     const { id, password } = data;
//     if (!id)
//         return socket.emit("joinRoom", {
//             success: false,
//             error: "Room id is required",
//         });
//     if (!io.sockets.adapter.rooms[id])
//         return socket.emit("joinRoom", {
//             success: false,
//             error: "Room not found",
//         });

//     const room = io.sockets.adapter.rooms[id];
//     if (room.password && room.password !== password)
//         return socket.emit("joinRoom", {
//             success: false,
//             error: "Wrong password",
//         });
//     const sockets = await io.in(id).fetchSockets();
//     if (sockets.length >= room.maxUsers)
//         return socket.emit("joinRoom", {
//             success: false,
//             error: "Room is full",
//         });
//     if (sockets.find((s) => s.data.user.username === socket.data.user.username))
//         return socket.emit("joinRoom", {
//             success: false,
//             alreadyIn: true,
//             error: "You are already in this room",
//         });

//     socket.rooms.forEach((user_room) => {
//         socket.leave(user_room);
//         updateMembers({ io, room: user_room });
//         socket.to(user_room).emit("message", {
//             system: true,
//             message: `${socket.data.user.username} left the room`,
//         });
//     });

//     socket.join(id);

//     updateMembers({ io, room: id });
//     socket.emit("joinRoom", { success: true, data: room });
//     socket.to(id).emit("message", {
//         system: true,
//         message: `${socket.data.user.username} joined the room`,
//     });
// };

// const handleOnJoinRoomStranger =
//     ({ socket, io }) =>
//     async (data) => {
//         const { id, password } = data;
//         if (!id)
//             return socket.emit("joinRoomStranger", {
//                 success: false,
//                 error: "Room id is required",
//             });
//         if (!io.sockets.adapter.rooms[id])
//             return socket.emit("joinRoomStranger", {
//                 success: false,
//                 error: "Room not found",
//             });

//         const room = io.sockets.adapter.rooms[id];
//         if (room.password && room.password !== password)
//             return socket.emit("joinRoomStranger", {
//                 success: false,
//                 error: "Wrong password",
//             });
//         const sockets = await io.in(id).fetchSockets();
//         if (sockets.length >= room.maxUsers)
//             return socket.emit("joinRoomStranger", {
//                 success: false,
//                 error: "Room is full",
//             });
//         if (
//             sockets.find(
//                 (s) => s.data.user.username === socket.data.user.username
//             )
//         )
//             return socket.emit("joinRoomStranger", {
//                 success: false,
//                 alreadyIn: true,
//                 error: "You are already in this room",
//             });

//         socket.rooms.forEach((user_room) => {
//             socket.leave(user_room);
//             updateMembers({ io, room: user_room });
//             socket.to(user_room).emit("message", {
//                 system: true,
//                 message: `${socket.data.user.username} left the room`,
//             });
//         });

//         socket.join(id);

//         updateMembers({ io, room: id });
//         socket.emit("joinRoomStranger", { success: true, data: room });
//         socket.to(id).emit("message", {
//             system: true,
//             message: `A stranger joined the room`,
//         });
//     };

// const handleOnLeaveRoom = (socket) => async () => {
//     const room = Array.from(socket.rooms).find((room) => room !== socket.id);
//     if (!room)
//         return socket.emit("leaveRoom", {
//             success: false,
//             error: "You are not in a room",
//         });
//     socket.leaveAll();
//     socket.join("global");
//     socket.emit("leaveRoom", { success: true });

//     updateMembers({ io, room });
//     socket.to(room).emit("message", {
//         system: true,
//         message: `${socket.data.user.username} left the room`,
//     });
// };

// const handleOnLeaveRoomStranger = (socket) => async () => {
//     const room = Array.from(socket.rooms).find((room) => room !== socket.id);
//     if (!room)
//         return socket.emit("leaveRoomStranger", {
//             success: false,
//             error: "You are not in a room",
//         });
//     socket.leaveAll();
//     socket.join("global");
//     socket.emit("leaveRoomStranger", { success: true });

//     socket.to(room).emit("ClearMessages", {
//         success: true,
//     });

//     updateMembers({ io, room });
//     socket.to(room).emit("message", {
//         system: true,
//         message: `Stranger left the room`,
//     });
// };

// const handleOnIsTyping = (socket) => async () => {
//     const room = Array.from(socket.rooms).find((room) => room !== socket.id);
//     socket.to(room).emit("IsTypping", {
//         success: true,
//         user: socket.data.user,
//     });
// };

// const handleOnClearMessages = (socket) => async () => {
//     socket.emit("ClearMessages", { success: true });
// };

// const handleOnRoomMembers = (socket) => async () => {
//     const room = Array.from(socket.rooms).find((room) => room !== socket.id);
//     if (!room)
//         return socket.emit("roomMembers", {
//             success: false,
//             error: "You are not in a room",
//         });

//     updateMembers({ io, room });
// };

// const handleOnDisconnect =
//     ({ socket, io }) =>
//     (data) => {
//         socket.rooms.forEach((room) => {
//             socket.to(room).emit("message", {
//                 system: true,
//                 message: `${socket.data.user.username} left the room`,
//             });

//             updateMembers({ io, room });
//         });
//         socket.leaveAll();
//         console.log("USER DISCONNECTED.");
//     };

// const handleOnFetchUser = (socket) => () => {
//     const { user } = socket.data;
//     user ? socket.emit("user", user) : socket.emit("user", null);
// };

// const handleOnFetchRooms = (socket) => () => {
//     setInterval(async () => {
//         const rooms = io.sockets.adapter.rooms;
//         const allRooms = (
//             await Promise.all(
//                 Object.keys(rooms).map(async (room) => {
//                     const sockets = await io.in(room).fetchSockets();
//                     const users = sockets.map((s) => s.data.user);
//                     return {
//                         id: room,
//                         name: rooms[room]?.name,
//                         owner: rooms[room]?.owner,
//                         passwordProtected: !!rooms[room]?.password,
//                         maxUsers: rooms[room]?.maxUsers,
//                         users: users.length,
//                     };
//                 })
//             )
//         ).filter((r) => r.name !== "global");

//         socket.emit("rooms", {
//             isLogged: socket.data?.user !== undefined ? true : false,
//             user: socket.data?.user,
//             rooms: allRooms,
//         });

//         const allSockets = await io.fetchSockets();
//         const users = allSockets.filter((s) => s?.data?.user?.username);
//         const usersonline = users.length;

//         socket.emit("UsersOnline", {
//             success: true,
//             users: usersonline,
//         });
//     }, 1000);
// };

// const handleOnFetchRoom = (socket) => async () => {
//     const room = Array.from(socket.rooms).find((room) => room !== socket.id);
//     if (!room)
//         return socket.emit("fetchRoom", {
//             success: false,
//             error: "You are not in a room",
//         });

//     socket.emit("fetchRoom", {
//         success: true,
//         data: io.sockets.adapter.rooms[room],
//     });
// };

// const handleOnMessage = (socket) => async (data) => {
//     const room = Array.from(socket.rooms).find((room) => room !== socket.id);
//     if (!room) return;

//     const message = {
//         user: socket.data.user,
//         message: data.message,
//         date: new Date(),
//     };

//     const sockets = await io.in(room).fetchSockets();
//     sockets.forEach((s) => {
//         s.emit("message", {
//             ...message,
//             self: s.id === socket.id,
//         });
//     });
// };

// export {
//     updateMembers,
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
//     handleOnFetchRoom,
//     handleOnFetchRooms,
// };
