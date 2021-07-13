var averia;
let countimer = setInterval(resta, 1000);

function toggle(button){
          if(document.getElementById("1").value=="PAUSA")
          {
            clearInterval(countimer);
            var countdownTimer = setInterval('Secondpassed()', 1000);
            document.getElementById("1").value="TERMINAR";
            document.getElementById("1").className = "btn btn-danger btn-block";
            averia = setTimeout(Reloadfuntion, 9000);
            document.getElementById("alert").style.display = "block";
          }
          else{
            document.getElementById("1").value = "averia cerrada"; 
            document.getElementById("1").className = "btn btn-danger btn-block";
            document.getElementById("form").submit();
          }
            
}

function Reloadfuntion() {
    location.reload(true);
}

function Closefunction() {
    resta();
    document.getElementById("form").submit(); 
}

function resta() {
    Timer();
        document.getElementById("hora-fin").value = hora+":"+minutos+":"+segundos;
          inicio = document.getElementById("hora-llegada").value;
          fin = document.getElementById("hora-fin").value;
          inicioSegundos = parseInt(inicio.substr(6,5));
          inicioMinuto = parseInt(inicio.substr(3,2));
          inicioHoras = parseInt(inicio.substr(0,2));
          inicioMinutos = inicioMinuto + 5;
          finSegundos = parseInt(fin.substr(6,5));
          finMinutos = parseInt(fin.substr(3,2));
          finHoras = parseInt(fin.substr(0,2));
          
          transcurridoSegundos = finSegundos - inicioSegundos;
          transcurridoMinutos = finMinutos - inicioMinutos;
          transcurridoHoras = finHoras - inicioHoras;
          transcurridoDias  = 0; 
          
          
          if (transcurridoMinutos < 0) {
          transcurridoHoras--;
          transcurridoMinutos = 60 + transcurridoMinutos;
          }
          if (transcurridoSegundos < 0) {
          transcurridoMinutos--;
          transcurridoSegundos = 60 + transcurridoSegundos;
          }
          if (transcurridoHoras < 0) {
              transcurridoDias--;
              transcurridoHoras = 24 + transcurridoHoras;
              }
              if(transcurridoDias < 0){
                  transcurridoDias--;
              transcurridoDias = 0 + transcurridoDias;
              }
          
          horas = transcurridoHoras.toString();
          minutos = transcurridoMinutos.toString();
          segundos = transcurridoSegundos.toString();
          
          if (horas.length < 2) {
          horas = "0"+horas;
          }
          
          if (minutos.length < 2) {
          minutos = "0"+minutos;
          }
          
          if (segundos.length < 2) {
              segundos = "0"+segundos;
              }
              document.getElementById("total_time").value = horas+":"+minutos+":"+segundos;
}

var seconds = 120;
function Secondpassed() {
    var minutes = Math.round((seconds - 30) / 60);
    var remainingSeconds = seconds % 60;
    if (remainingSeconds < 10) {
        remainingSeconds = "0" + remainingSeconds;
    }
    document.getElementById('countdown').innerHTML = minutes + " minutos " + remainingSeconds + " segundos";
    if (seconds == 0) {
        clearInterval(countdownTimer);
        document.getElementById('countdown').innerHTML = "00:00";
    } else {
        seconds--;
    }
}
