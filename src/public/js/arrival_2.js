let countimer = setInterval(resta, 1000);
let mostrarboton = setInterval(showbutton,1000);

window.addEventListener("load", function(){
    countdownTimer = setInterval('Secondpassed()', 1000);
});

var seconds = 299;
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

var Averia;
var Canceled;

function resta() {
    Timer();
        document.getElementById("hora-apertura").value = hora+":"+minutos+":"+segundos;
        inicio = document.getElementById("hora-llegada").value;
        fin = document.getElementById("hora-apertura").value;
        inicioSegundos = parseInt(inicio.substr(6,5));
        inicioMinutos = parseInt(inicio.substr(3,2));
        inicioHoras = parseInt(inicio.substr(0,2));
        
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
            document.getElementById("sub_time").value = horas+":"+minutos+":"+segundos;
            document.getElementById("total_time").value = horas+":"+minutos+":"+segundos;
}



function Cancelform() {
   let tipoaveria = document.getElementById("Select1").value;
   if (tipoaveria === "1") {
    alert("Selecciona el tipo de averia");
    return false;
}
else {
    var text = document.getElementById("Select1").value;
    document.getElementById("tipo_averia_2").value = text;
    var d = new Date();
    var t = d.toLocaleTimeString();
    document.getElementById("hora-cancelado").value = t.toString();
    document.getElementById("form2").submit();
}
}



function Sendfunction() {
    tipoaveria = document.getElementById("Select1").value;
    if(tipoaveria === "1"){
        alert("Selecciona el tipo de averia");
        return false;
    }else{
        var text = document.getElementById("Select1").value;
        document.getElementById("tipo_averia").value = text;
        var d = new Date();
        var t = d.toLocaleTimeString();
        document.getElementById("hora-apertura").value = t.toString();
        document.getElementById("form1").submit();
    }
}

function showbutton() {
    inicio = document.getElementById("sub_time").value;
    Minutos = parseInt(inicio.substr(3));
    Horas = parseInt(inicio.substr(0));
    if (Minutos == 5) {
        var text = document.getElementById("Select1").value;
        document.getElementById("tipo_averia").value = text;
        document.getElementById("form1").submit();
    }else if (Horas > 0) {
        document.getElementById("showbutton2").style.display = "none";
        document.getElementById("showbutton").style.display = "block";
    }else if(Minutos > 5){
        document.getElementById("showbutton2").style.display = "none";
        document.getElementById("showbutton").style.display = "block";
    }else{
        document.getElementById("showbutton").style.display = "none";
    }
}





