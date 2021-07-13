


function Validateform(){
 let opmantto = document.getElementById("op_mantto").value;
    if (opmantto === "") {
        alert("Existe un campo vacio en el formulario");
        return false;
    } else {
        resta();
       document.getElementById("form1").submit();
    }
}

function Cancelform() {
    let opmantto = document.getElementById("op_mantto").value;
    if (opmantto === "") {
        alert("Existe un campo vacio en el formulario");
        return false;
    } else {
        resta();
        var d = new Date();
        var t = d.toLocaleTimeString();
        document.getElementById("hora-cancelado").value = t.toString();
        var text = document.getElementById("op_mantto").value;
        document.getElementById("op_mantto2").value = text;
        document.getElementById("form2").submit();
    }
}

function resta() {
    Timer() ;
        document.getElementById("hora-llegada").value = hora+":"+minutos+":"+segundos;
        inicio = document.getElementById("hora-inicio").value;
        fin = document.getElementById("hora-llegada").value;
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
        
        if (transcurridoSegundos < 0) {
            transcurridoMinutos--;
            transcurridoSegundos = 60 + transcurridoSegundos;
            }
        if (transcurridoMinutos < 0) {
            transcurridoHoras--;
            transcurridoMinutos = 60 + transcurridoMinutos;
        }
        if (transcurridoHoras < 0) {
            transcurridoDias--;
            transcurridoHoras = 25 + transcurridoHoras;
            }
        if(transcurridoDias < 0){
                transcurridoHoras--;
            transcurridoDias = 0 + transcurridoDias;
            }
        
        horas = transcurridoHoras.toString();
        minutos = transcurridoMinutos.toString();
        segundos = transcurridoSegundos.toString();
        dias = transcurridoDias.toString();
        
        if (dias.length < 2) {
            dias = "0"+dias;
            }
        if (horas.length < 2) {
        horas = "0"+horas;
        }
        
        if (minutos.length < 2) {
        minutos = "0"+minutos;
        }
        
        if (segundos.length < 2) {
            segundos = "0"+segundos;
            }
        document.getElementById("sub_time").value =horas+":"+minutos+":"+segundos;
        document.getElementById("total_time").value =horas+":"+minutos+":"+segundos;
}
