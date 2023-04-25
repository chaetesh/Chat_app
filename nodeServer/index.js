// Node Server which will handle socket.io connections
const io = require('socket.io')(8000)

const users = {};

io.on('connection',socket=>{
    console.log("connected")
    // when client sends this message
    socket.on('new-user-joined',nm=>{
        console.log("New User: ",nm);
        // every user has its unique socketID
        users[socket.id] = nm;
        // server sends this message to client
        socket.broadcast.emit('user-joined',nm);
    });

    socket.on('send',message=>{
        socket.broadcast.emit('recieve',{message: message, nm: users[socket.id]})
    });

    //when user disconnected 
    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    });
})