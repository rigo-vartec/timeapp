let d = new Date(),
  h = d.getHours();

let horariom = new Array("0","1","2","3","4","5","0","1","2","3","4","5","6","7","8","9"
);
let horariot = new Array("9","1","2","3","4","5","0","1","2","3","4","5","6","7","8","0","1","2","3","4","5","6","7","8","9"
);
let horarion = new Array("0", "1", "2", "3", "4", "5");

let turn = document.getElementById("turno").value;
let turno = turn.toLowerCase();

var ht = 0;
if (turno == "mañana") {
  ht = parseInt(horariom[h]);
}else if (turno == "tarde") {
  ht = parseInt(horariot[h]);
}else if (turno == "noche"){
  ht = parseInt(horarion[h]);
}

let hs = parseInt(ht+1),hs1 = parseInt(ht+11),hs2 = parseInt(ht+21),hs3 = parseInt(ht+31),hs4 = parseInt(ht+41);

let hv1 = parseInt(ht+9),hv2 = parseInt(ht+18),hv3 = parseInt(ht+27),hv4 = parseInt(ht+36);

window.addEventListener("load", mostrarhoras, false);
var timer = setInterval(sumahoras, 500);

function mostrarhoras() {
  let mostarbloque = document.getElementsByClassName("col-md-5");
  for (i = ht; i < mostarbloque.length; i += 10) {
    mostarbloque[i].style.display = "block";
  }
  let mostrarhora2 = document.getElementsByClassName("hora-"+turno);
  for (let i = 0; i < mostrarhora2.length; i++) {
    mostrarhora2[i].style.display = "block";
  }
}

function sumahoras() {
  let sh = 0,sh1 = 0,sh2 = 0,sh3 = 0,sh4 = 0;
  for (let i = 0; i < hs; i++) {
    let hora = parseInt(
      document.getElementsByClassName("form-control 1")[i].value
    );
    sh += hora;
  }
  for (let i = 10; i < hs1; i++) {
    let hora = parseInt(
      document.getElementsByClassName("form-control 1")[i].value
    );
    sh1 += hora;
  }
  for (let i = 20; i < hs2; i++) {
    let hora = parseInt(
      document.getElementsByClassName("form-control 1")[i].value
    );
    sh2 += hora;
  }
  for (let i = 30; i < hs3; i++) {
    let hora = parseInt(
      document.getElementsByClassName("form-control 1")[i].value
    );
    sh3 += hora;
  }
  for (let i = 40; i < hs4; i++) {
    let hora = parseInt(
      document.getElementsByClassName("form-control 1")[i].value
    );
    sh4 += hora;
  }
  document.getElementsByClassName("form-control 2")[ht].value = sh;
  document.getElementsByClassName("form-control 2")[hv1].value = sh1;
  document.getElementsByClassName("form-control 2")[hv2].value = sh2;
  document.getElementsByClassName("form-control 2")[hv3].value = sh3;
  document.getElementsByClassName("form-control 2")[hv4].value = sh4;
}