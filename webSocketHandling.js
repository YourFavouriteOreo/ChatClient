var socketio = require("socket.io");
var uuid = require("uuid");

module.exports.listen = function(app, dataSet) {
  io = socketio.listen(app);

  io.on("connection", function(socket) {
    /*
     Give User Registration ID . This is to still provide identification within the system
     I wanted to avoid data storage as I know I will not be focusing heavily on security
     apart from not being a security specialist myself.
    */
    console.log("A user has connected");
    var newUserID = uuid();
    io.emit("register", {
      userID: newUserID
    });
    console.log(newUserID);
    dataSet.currentUsers[newUserID] = { socket: socket };
    dataSet.currentUsers.length = dataSet.currentUsers.length + 1;
    console.log("Current User Dataset: " + dataSet.currentUsers.length + "\n");

    socket.on("Chat Broadcast", payload => {
      var chatToBeModified = dataSet.chats[payload.id]
      for (user in chatToBeModified.users){
        if (chatToBeModified.users[user] != payload.userID){
          var selectedUser = chatToBeModified.users[user]
          io.to(`${dataSet.currentUsers[selectedUser].socket.id}`).emit(
            "Chat Broadcast",
            payload
          );
        }
      }
    });

    socket.on("Add Chat", data => {
      // Verify that the requested chat connection has two EXISTING participants
      if (
        dataSet.currentUsers[data.userID] &&
        dataSet.currentUsers[data.friendID]
      ) {
        var chatID = uuid();
      // Store existance of chat for future routing
        dataSet.chats[chatID] = {
          users: [data.userID, data.friendID],
          host: [data.userID]
        };
        dataSet.chats[chatID].users.map(function(key) {
          io.to(`${dataSet.currentUsers[key].socket.id}`).emit(
            "Add Chat",
            chatID
          );
        });
      } else {
        console.log("Provided ID does not exist");
      }
    });

    socket.on("disconnect", function() {
      // Take Object managing gcurrent Users and remove the disconnected user 
      console.log("A user has disconnected");
      Object.keys(dataSet.currentUsers).map(index => {
        if (dataSet.currentUsers[index].socket === undefined) {
          delete dataSet.currentUsers[index];
          dataSet.currentUsers.length = dataSet.currentUsers.length - 1;
        } else if (dataSet.currentUsers[index].socket.id === socket.id) {
          delete dataSet.currentUsers[index];
          dataSet.currentUsers.length = dataSet.currentUsers.length - 1;
        }
      });
      console.log("Post-splice length: " + dataSet.currentUsers.length + "\n");
    });
  });

  return io;
};
