var socketio = require("socket.io");
var uuid = require("uuid");
var _ = require("lodash")

// DB Vars
var serverReady = false;
var userModel = require('./Schemas/User')

module.exports.listen = function(app, mongooseInstance, dataSet) {
  mongooseInstance.once('open',function callback() {
    serverReady = true;
  })

  io = socketio.listen(app);

  io.on("connection", function(socket) {
    /*
     User Registration
    */
    console.log("A user has connected");

    socket.on("registerID", payload => {
      console.log
      if (serverReady){
        var newUser = new userModel({publicName:payload})
        newUser.save().then( (user,err) => {
            if (err){
              console.log("ERROR USER")
              console.log(err);
            }
            else {
              console.log("emitting")
              IOWhisper(socket.id,"register", {
                privateID: user.privateID,
                publicID: user.publicID,
                publicName: user.publicName
              });
  
              dataSet.currentUsers[user.publicID] = { socket: socket , publicName:user.publicName};
              dataSet.currentUsers.length = dataSet.currentUsers.length + 1;
              console.log("Current User Dataset: " + dataSet.currentUsers.length + "\n");
            }
        })
      }
    })


    function IOWhisper(socketID,channel,payload) {
      io.to(`${socketID}`).emit(
        channel,
        payload
      );
    }

    function mapToPayloadUsers(chatID,functionToMap,payload,publicID = null){
      var chatToBeModified = dataSet.chats[chatID]
      for (user in chatToBeModified.users){
        if (chatToBeModified.users[user] != publicID){
          var selectedUser = chatToBeModified.users[user]
          functionToMap(selectedUser,payload)
        }
      }
    }

    socket.on("Chat isTyping", payload => {
      mapToPayloadUsers(payload.id,
        function (selectedUser,payload){
          IOWhisper(dataSet.currentUsers[selectedUser].socket.id,"Chat isTyping",payload)
        },
        payload,
        payload.publicID
      )
    })

    //Sends Text to all members of chat except sendee
    socket.on("Chat Broadcast", payload => {
      mapToPayloadUsers(payload.id,
        function (selectedUser,payload){
          IOWhisper(dataSet.currentUsers[selectedUser].socket.id,"Chat Broadcast",payload)
        },
        payload,
        payload.publicID
      )
    });

    socket.on("Add Chat", data => {
      // Verify that the requested chat connection has two EXISTING participants
      if (
        dataSet.currentUsers[data.publicID] &&
        dataSet.currentUsers[data.friendID]
      ) {
        var chat = {
          id:uuid(),
          name: "New Chat"
        }
      // Store existance of chat for future routing
        dataSet.chats[chat.id] = {
          users: [data.publicID, data.friendID],
          host: [data.publicID]
        };
        dataSet.chats[chat.id].users.map(function(key,index) {
          var friendID ;
          if (index === 0){
            friendID = dataSet.chats[chat.id].users[1]
          }
          else {
            friendID = dataSet.chats[chat.id].users[0]
          }
          chat["name"] = dataSet.currentUsers[friendID].publicName
          IOWhisper(dataSet.currentUsers[key].socket.id,"Add Chat",chat)
        });
      } else {
        console.log(dataSet.currentUsers);
        console.log(data);
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
