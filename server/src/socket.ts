import { Server, Socket } from "socket.io";

export default (httpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: "*"
        }
    });

    io.on("connection", (socket) => {
        console.log('connected ' + socket.id);

        socket.on("join_game", async ({ roomId, name }) => {
            const connectedSockets = io.sockets.adapter.rooms.get(roomId);
            console.log(connectedSockets)
            const socketRooms = Array.from(socket.rooms.values()).filter((room) => room !== socket.id);

            if (socketRooms.length > 0) {
                socket.emit("room_join_error", {
                    error: "You're already connected to another room!"
                })
            } else if (connectedSockets && connectedSockets.size > 9) {
                socket.emit("room_join_error", {
                    error: "Room is full"
                })
            } else {
                await socket.join(roomId);
                console.log('New user ' + name + ' has joined room: ' + roomId);
                socket.emit("room_joined");
            }
        })
    })

    return io;
}
