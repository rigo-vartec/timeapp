const socket = io();
let username = document.getElementById('username');
let output1 = document.getElementById('message01');
let output2 = document.getElementById('message02');
window.addEventListener('load',Emitir, false);

function Emitir(){
    socket.emit('join',{
        username: username.value
    });
}


function ocultarchat(){
    let chatmensajes = document.getElementsByClassName("oculto");
    for (let i = 0; i < chatmensajes.length; i++) {
            chatmensajes[i].style.display="none";
    }
}

function ocultaruserchat(){
    let ocultaruserchat = document.getElementsByClassName("chat");
    for (let i = 0; i < ocultaruserchat.length; i++) {
            ocultaruserchat[i].style.display="none";
    }
}

function mostraruserchat(){
    let mostraruserchat = document.getElementsByClassName("chat");
    for (let i = 0; i < mostraruserchat.length; i++) {
            mostraruserchat[i].style.display="block";
    }
}

function Buscarchat(){
    let numeromaquina = document.getElementById("search").value;
    ocultarchat()
    document.getElementById("chatmensaje").style.display="block";
    if (numeromaquina=="TODOS") {
        ocultaruserchat();
        mostraruserchat();
    }else{
        ocultaruserchat();
        document.getElementById("maquina"+numeromaquina).style.display = "block";
    }
    document.getElementById("search").value="";
}


function enviarchat(id){
    let mensaje = document.getElementById('mensaje'+id);
    let hora = document.getElementById('hora');
  if (mensaje.value === "") {
    alert("No hay mensajes para enviar");
    return false;
  }else{
    socket.emit('chat2:mensaje'+id,{
      mensaje: mensaje.value,
      hora: hora.textContent.substr(0,5)
  });
  mensaje.value = "";
  }
}

for (let i = 1; i < 14; i++) {
    socket.on('message:calidad'+(i), function(data){
        document.getElementById('message'+(i)).innerHTML +=  `<li class="msg-right">
      <div class="msg-left-sub">
        <img src="/logos/c.png">
        <div class="msg-desc text-center">
        ${data.mensaje}
        </div>
        <small class="time">${data.hora}</small>
      </div>
    </li>`
    });
    }


//recibiendo chat-corte
for (let i = 1; i < 14; i++) {
    socket.on('message:usercalidad'+(i), function(data){
        document.getElementById('message'+(i)).innerHTML +=  `<li class="msg-left">
        <div class="msg-left-sub">
            <img src="/logos/a${(i)}.png">
            <div class="msg-desc">
            ${data.mensaje}
            </div>
            <small class="time">${data.hora}</small>
        </div>
    </li>`
      });

}


  

