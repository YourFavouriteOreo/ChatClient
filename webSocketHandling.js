var socketio = require("socket.io");
var uuid = require("uuid");

module.exports.listen = function(app,dataSet) {
  io = socketio.listen(app);

  io.on("connection", function(socket) {
    console.log("A user has connected");
    var newUserID = uuid()
    io.emit("register", { 
      userID: newUserID
    });
    console.log(newUserID);
    dataSet.currentUsers[newUserID]= {socket:socket}
    dataSet.currentUsers.length = dataSet.currentUsers.length+1
    console.log("Current User Dataset: " + dataSet.currentUsers.length+"\n");


    socket.on("Add Chat",(data)=> {
      if (dataSet.currentUsers[data.userID]){
        var chatID = uuid();

        dataSet.chats[chatID] = ({
          users:[data.userID,data.friendID],
          host:[data.userID]})

        dataSet.chats[chatID].users.map(function(key){
          io.to(`${dataSet.currentUsers[key].socket.id}`).emit('Add Chat', chatID);
        })
      }
    })

    socket.on("disconnect", function() {
      console.log("A user has disconnected");
      Object.keys(dataSet.currentUsers).map((index)=> {
        if (dataSet.currentUsers[index].socket === undefined){
          delete dataSet.currentUsers[index]
          dataSet.currentUsers.length=dataSet.currentUsers.length-1
        }
        else if (dataSet.currentUsers[index].socket.id === socket.id){
          delete dataSet.currentUsers[index]
          dataSet.currentUsers.length=dataSet.currentUsers.length-1
        }
        
      })
      console.log("Post-splice length: " + dataSet.currentUsers.length+"\n")
    });
  });

  

  return io;
};
