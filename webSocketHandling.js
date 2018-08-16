var socketio = require("socket.io");

var uuid = require("uuid");

module.exports.listen = function(app) {
  io = socketio.listen(app);

  io.on("connection", function(socket) {
    console.log("A user has connected");
    io.emit("register", { userID: uuid() });
    
    socket.on("chat",function(chat){
        console.log(chat);
        socket.broadcast.emit('chat',chat)
      })
  });

  return io;
};
