module.exports = (io) => {
    let activeUsers = []; // Array to store active users

    io.on('connection', (socket) => {
        console.log('User connected');

        // Ask for user's name and store it
        socket.on('setUsername', (username) => {
            socket.username = username;
            activeUsers.push(username);
            io.emit('userList', activeUsers); // Send updated user list to all clients
        });

        // Handle code changes
        socket.on('codeChange', (data) => {
            // Broadcast code changes to other clients
            socket.broadcast.emit('codeChange', data);
        });

        //handle chat 
        socket.on('chatMessage', (message) => {
            io.emit('chatMessage', message);
        });
 
        // Handle disconnection
        socket.on('disconnect', () => {
            console.log('User disconnected');
            // Remove user from activeUsers array
            const index = activeUsers.indexOf(socket.username);
            if (index !== -1) {
                activeUsers.splice(index, 1);
                io.emit('userList', activeUsers); // Send updated user list to all clients
            }
        });
    });
};