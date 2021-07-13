
module.exports = function (server,sessionMiddleware) {
  const io = require("socket.io")(server);
  
  io.use(function (socket,next) {
    sessionMiddleware(socket.request, {}, next);
  });
  
  io.sockets.on("connection", function (socket) {
    socket.on('join', function (data) { 
      console.log(data);
      socket.join(data.username);
    });
    
    socket.on('buscar:chat',(data) =>{
        io.to('calidad').emit('message:serverchat'+data.busqueda,data);
    });

    for (let i = 1; i < 14; i++) {
      socket.on('chat:mensaje'+(i),(data) =>{
        io.to('A0'+[i]).emit('message:usercorte'+[i],data);
        io.to('calidad').emit('message:usercalidad'+[i],data);
        console.log(data);
      });

      socket.on('chat2:mensaje'+(i),(data) =>{
        io.to('calidad').emit('message:calidad'+[i],data);
        io.to('A0'+[i]).emit('message:calidaduser'+[i],data);
        console.log(data);
      });
    }
  });
}