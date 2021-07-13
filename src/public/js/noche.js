let Subtract1 = setInterval(Subtract_1, 100), 
Subtract2 = setInterval(Subtract_2, 100), 
Subtract3 = setInterval(Subtract_3, 100);
 
var text1= parseInt (document.getElementById("hora_1").value), 
text2= parseInt (document.getElementById("hora_2").value), 
text3= parseInt (document.getElementById("hora_3").value);



window.addEventListener('load', Stop, false);

function Stop(){
    if (text1==0) {
        document.getElementById("button1").style.display = "block";
        document.getElementById("hora_1").readOnly = false;
    }
    if (text1 > 0) {
        document.getElementById("hora_1").value = text1+' pzs';
        document.getElementById("button1").style.display = "none";
        document.getElementById("button2").style.display = "block";
        document.getElementById("texto2").readOnly = false;
    }
    if (text2 > 0) {
        clearInterval(Subtract1);
        var suma = text1 + text2;
        document.getElementById("hora_2").value = text2+' pzs';
        document.getElementById("texto2").value = suma+' pzs';
        document.getElementById("button2").style.display = "none";
        document.getElementById("texto2").readOnly = true;
        document.getElementById("texto3").readOnly = false;
        document.getElementById("button3").style.display = "block";
    }
    if (text3 > 0) {
        clearInterval(Subtract2);
        var suma = text1 + text2 + text3;
        document.getElementById("hora_2").value = text3+' pzs';
        document.getElementById("texto3").value = suma+' pzs';
        document.getElementById("button3").style.display = "none";
        document.getElementById("texto3").readOnly = true;
        document.getElementById("texto4").readOnly = false;
        document.getElementById("button4").style.display = "block";
    }
}


function Subtract_1() {
    var text1_1=document.getElementById("texto2").value
    var resta = text1_1-text1;
    if (resta < 0) {
        document.getElementById("hora_2").value = 0+' pzs';
    } else {
        document.getElementById("hora_2").value = resta+(' pzs');
    }
}

function Subtract_2() {
    var text2_1=document.getElementById("texto3").value
    var resta = text2_1-text1-text2;
    if (resta < 0) {
        document.getElementById("hora_3").value = 0+' pzs';
    } else {
        document.getElementById("hora_3").value = resta+(' pzs');
    }
}

function Subtract_3() {
    var text3_1=document.getElementById("texto4").value
    var resta = text3_1-text1-text2-text3;
    if (resta < 0) {
        document.getElementById("hora_4").value = 0+' pzs';
    } else {
        document.getElementById("hora_4").value = resta+(' pzs');
    }
}