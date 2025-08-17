import { WebSocketServer, WebSocket } from "ws";
const wss = new WebSocketServer({ port: 8080 });
let allSockets = [];
wss.on("connection", (socket) => {
    // Add the new user with empty room and name
    allSockets.push({ socket, room: "", name: "" });
    console.log("User connected");
    socket.on("message", (message) => {
        let parsedMessage;
        try {
            parsedMessage = JSON.parse(message.toString());
        }
        catch {
            socket.send(JSON.stringify({ type: "error", message: "Invalid JSON format" }));
            return;
        }
        const currentUser = allSockets.find(u => u.socket === socket);
        switch (parsedMessage.type) {
            case "create": {
                if (!currentUser)
                    return;
                const { roomId, name } = parsedMessage.payload;
                const roomExists = allSockets.some(u => u.room === roomId);
                if (roomExists) {
                    socket.send(JSON.stringify({ type: "error", message: "Room ID already occupied" }));
                    return;
                }
                currentUser.room = roomId;
                currentUser.name = name;
                socket.send(JSON.stringify({ type: "create", message: `Room ${roomId} created successfully`, roomId: roomId }));
                break;
            }
            case "join": {
                if (!currentUser)
                    return;
                const { roomId, name } = parsedMessage.payload;
                const roomExists = allSockets.some(u => u.room === roomId);
                if (!roomExists) {
                    socket.send(JSON.stringify({ type: "error", message: "Room does not exist" }));
                    return;
                }
                const nameTaken = allSockets.some(u => u.room === roomId && u.name === name);
                if (nameTaken) {
                    socket.send(JSON.stringify({ type: "error", message: "Name already taken in this room" }));
                    return;
                }
                currentUser.room = roomId;
                currentUser.name = name;
                // Notify others in the room
                allSockets.forEach(u => {
                    if (u.room === roomId && u.socket !== socket) {
                        u.socket.send(JSON.stringify({
                            type: "join",
                            message: `${name} has joined the room`
                        }));
                    }
                });
                socket.send(JSON.stringify({ type: "join", message: `Joined room ${roomId} successfully` }));
                break;
            }
            case "chat": {
                if (!currentUser || !currentUser.room)
                    return;
                const { message: chatMessage } = parsedMessage.payload;
                allSockets.forEach(u => {
                    if (u.room === currentUser.room) {
                        u.socket.send(JSON.stringify({
                            type: "chat",
                            from: currentUser.name,
                            message: chatMessage,
                            self: u.socket === socket
                        }));
                    }
                });
                break;
            }
            case "leave": {
                if (!currentUser)
                    return;
                const roomId = currentUser.room;
                const name = currentUser.name;
                // Remove user
                allSockets = allSockets.filter(u => u.socket !== socket);
                // Notify others
                allSockets.forEach(u => {
                    if (u.room === roomId) {
                        u.socket.send(JSON.stringify({
                            type: "leave",
                            message: `${name} has left the room`
                        }));
                    }
                });
                // Confirm to leaving user
                socket.send(JSON.stringify({
                    type: "leave",
                    message: `You have left room ${roomId}`
                }));
                break;
            }
        }
    });
    socket.on("close", () => {
        const disconnectedUser = allSockets.find(u => u.socket === socket);
        if (disconnectedUser) {
            const { room, name } = disconnectedUser;
            // Remove user
            allSockets = allSockets.filter(u => u.socket !== socket);
            // Notify others in the room
            allSockets.forEach(u => {
                if (u.room === room) {
                    u.socket.send(JSON.stringify({
                        type: "leave",
                        message: `${name} disconnected`
                    }));
                }
            });
        }
        console.log("User disconnected");
    });
});
//# sourceMappingURL=index.js.map