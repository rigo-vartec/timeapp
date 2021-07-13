const socket = io();
let turno = d.getHours();

document.getElementById("fecha-inicio").value =diasSemana[d.getDay()] + ", " + d.getDate() + " de"     +  meses[d.getMonth()] + " de " +d.getFullYear();

document.getElementById("fecha-creacion").value = dia + "-" + mes + "-" + d.getFullYear();
    
document.getElementById("fecha-inicio-1").value =diasSemana[d.getDay()] + ", " + d.getDate() + " de"     +  meses[d.getMonth()] + " de " +d.getFullYear();

document.getElementById("fecha-creacion-1").value = dia + "-" + mes + "-" + d.getFullYear();

if (turno > 22) {
  for (let i = 0; i < 4; i++) {
  document.getElementsByName("turno")[i].value = "NOCHE";
  }
}
if (turno == 0 && turno < 6) {
  for (let i = 0; i < 4; i++) {
  document.getElementsByName("turno")[i].value = "NOCHE";
  }
}
if (turno > 5 && turno < 14) {
  for (let i = 0; i < 4; i++) {
  document.getElementsByName("turno")[i].value = "MAÑANA";
  }
}
if (turno > 13 && turno < 23) {
  for (let i = 0; i < 4; i++) {
  document.getElementsByName("turno")[i].value = "TARDE";
  }
}

let username = document.getElementById('username');
let output1 = document.getElementById('message');


window.addEventListener('load',Emitir, false);
function Emitir(){
    socket.emit('join',{
        username: username.value
    });
}

function StartformA() {
  
    Timer();
    document.getElementById("hora-inicio").value =
    hora + ":" + minutos + ":" + segundos;
    document.getElementById("test").submit();
  }

function StartformI() {
  opmantto = document.getElementById("text").value;
  if (opmantto === "") {
    alert("Existe un campo vacio en el formulario");
    return false;
  } else {
    Timer();
    document.getElementById("hora-inicio-1").value =
    hora + ":" + minutos + ":" + segundos;
    var texto = document.getElementById("text").value;
    document.getElementById("text2").value = texto;
    document.getElementById("test1").submit();
  }
}


//enviar mensaje a calidad
function enviarchat(id){
    let mensaje = document.getElementById('mensaje');
    let hora = document.getElementById('hora');
  if (mensaje.value === "") {
    alert("No hay mensajes para enviar");
    return false;
  }else{
    socket.emit('chat:mensaje'+id,{
      mensaje: mensaje.value,
      hora: hora.textContent.substr(0,5)
  });
  mensaje.value = "";
  }
}


//mostrar mensaje en pantalla operador
for (let i = 1; i < 14; i++) {
socket.on('message:usercorte'+(i), function(data){
  document.getElementById('message'+(i)).innerHTML +=  `<li class="msg-right">
  <div class="msg-left-sub">
    <img src="/logos/a${(i)}.png">
    <div class="msg-desc text-center">
    ${data.mensaje}
    </div>
    <small class="time">${data.hora}</small>
  </div>
</li>`
});
}

//recibiendo chat-calidad
for (let i = 1; i < 14; i++) {
  socket.on('message:calidaduser'+(i), function(data){
      document.getElementById('message'+(i)).innerHTML +=  `<li class="msg-left">
      <div class="msg-left-sub">
          <img src="/logos/c.png">
          <div class="msg-desc">
          ${data.mensaje}
          </div>
          <small class="time">${data.hora}</small>
      </div>
  </li>`
    });

}