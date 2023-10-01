import { useState } from "react";
import socketService from "../services/socketService";
import gameService from "../services/gameService";

const JoinRoom = () => {
    const [roomId, setRoomId] = useState('');
    const [name, setName] = useState('');
    const [isJoining, setIsJoining] = useState(false);

    const joinRoom = async (room: String, userName: String) => {
        const socket = socketService.socket;
        if (!socket) {
            return;
        }

        setIsJoining(true);

        const joined = await gameService.joinGameRoom(socket, room, userName).catch((err) => {
            alert(err);
        });

        if (joined) {
            // set in room
        }
        setIsJoining(false);
    }

    const handleSubmit = () => {
        if (!roomId || roomId.trim() === "" || !name || name.trim() === "") {
            return;
        }
        joinRoom(roomId, name);
    }

    return (
        <div>
            <input value={roomId} onChange={(e) => setRoomId(e.target.value)} />
            <input value={name} onChange={(e) => setName(e.target.value)} />
            <button onClick={handleSubmit} disabled={isJoining}>{isJoining ? "Joining..." : "Join"}</button>
        </div>
    )
}

export default JoinRoom;