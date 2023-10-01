import { Server } from "socket.io";

export default (httpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: "*"
        }
    });

    io.on("connection", (socket) => {
        console.log('connected ' + socket.id);

        socket.on("custom_event", (data: any) => {
            console.log("data: ", data)
        })
    })

    return io;
}