import { Socket } from "socket.io-client";

class GameService {
    public async joinGameRoom(socket: Socket, roomId: String, name: String): Promise<boolean> {
        return new Promise((rs, rj) => {
            socket.emit("join_game", { roomId, name });
            socket.on("room_joined", () => rs(true));
            socket.on("room_join_error", ({ error }) => rj(error));
        })
    }
}

export default new GameService();