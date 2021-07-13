var reloj = setInterval(Timer, 1000);
var d = new Date(),
    h = d.getHours(),
    m = d.getMinutes(),
    s = d.getSeconds(),
    month = (d.getMonth()+1),
    day = d.getDate();
    
let hora = h.toString(),
minutos = m.toString(),
segundos = s.toString(),
mes = month.toString(),
dia = day.toString();

if (hora.length < 2) {
    hora = "0" + hora;
}
if (minutos.length < 2) {
    minutos = "0" + minutos;
}
if (segundos.length < 2) {
    segundos = "0" + segundos;
}
if (mes.length < 2) {
    mes = "0" + mes;
}
if (dia.length < 2) {
    dia = "0" + dia;
}

var meses = new Array("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");

var diasSemana = new Array("Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado");

document.getElementById("fecha").innerHTML =d.getDate() + " de "     +  meses[d.getMonth()] + " de " +d.getFullYear();

document.getElementById("hora").innerHTML = hora + ":" + minutos + ":" + segundos;

    

function Timer() {
    var d = new Date();
        h = d.getHours(),
        m = d.getMinutes(),
        s = d.getSeconds();

    hora = h.toString();
    minutos = m.toString();
    segundos = s.toString();
    
    if (hora.length < 2) {
        hora = "0" + hora;
    }
    if (minutos.length < 2) {
        minutos = "0" + minutos;
    }
    if (segundos.length < 2) {
        segundos = "0" + segundos;
    }
    document.getElementById("hora").innerHTML =
        hora + ":" + minutos + ":" + segundos;
}
