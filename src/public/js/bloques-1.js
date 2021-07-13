let d = new Date(),
  h = d.getHours();

let horariom = new Array("0","1","2","3","4","5","0","1","2","3","4","5","6","7","8","9");
let horariot = new Array("9","1","2","3","4","5","0","1","2","3","4","5","6","7","8","0","1","2","3","4","5","6","7","8","9");
let horarion = new Array("0", "1", "2", "3", "4", "5");
let hm = parseInt(horariom[h]);
let ht = parseInt(horariot[h]);
let hn = parseInt(horarion[h]);
let turn = document.getElementById("turno").value;
let turno = turn.toLowerCase();
let hsm = parseInt(hm+1),hsm1 = parseInt(hm+11),hsm2 = parseInt(hm+21),hsm3 = parseInt(hm+31);
let hst = parseInt(ht+1),hst1 = parseInt(ht+11),hst2 = parseInt(ht+21),hst3 = parseInt(ht+31);
let hsn = parseInt(hn+1),hsn1 = parseInt(hn+11),hsn2 = parseInt(hn+21),hsn3 = parseInt(hn+31);
let hvm1 = parseInt(hm+9),hvm2 = parseInt(hm+18),hvm3 = parseInt(hm+27);
let hvt1 = parseInt(ht+9),hvt2 = parseInt(ht+18),hvt3 = parseInt(ht+27);
let hvn1 = parseInt(hn+9),hvn2 = parseInt(hn+18),hvn3 = parseInt(hn+27);

switch (turno) {
  case "mañana":
    window.addEventListener("load", mostrarhorasm, false);
    var timer = setInterval(sumahorasm, 500);
    break;
  case "tarde":
    window.addEventListener("load", mostrarhorast, false);
    var timer2 = setInterval(sumahorast, 500);
  break;
  case "tarde:":
    window.addEventListener("load", mostrarhorast, false);
    var timer2 = setInterval(sumahorast, 500);
  break;
  case "noche":
    window.addEventListener("load", mostrarhorasn, false);
    var timer3 = setInterval(sumahorasn, 500);
  break;

  default:
    break;
}

function mostrarhorasm() {
  let mostar = document.getElementsByClassName("col-md-5");
  for (i = hm; i < mostar.length; i += 10) {
    mostar[i].style.display = "block";
  }
  let mostrarhora2 = document.getElementsByClassName("hora-mañana");
  for (let i = 0; i < mostrarhora2.length; i++) {
    mostrarhora2[i].style.display = "block";
  }
}

function mostrarhorast() {
  let mostar = document.getElementsByClassName("col-md-5");
  for (i = ht; i < mostar.length; i += 10) {
    mostar[i].style.display = "block";
  }
  let mostrarhora2 = document.getElementsByClassName("hora-tarde");
  for (let i = 0; i < mostrarhora2.length; i++) {
    mostrarhora2[i].style.display = "block";
  }
}

function mostrarhorasn() {
  let mostar = document.getElementsByClassName("col-md-5");
  for (i = hn; i < mostar.length; i += 10) {
    mostar[i].style.display = "block";
  }
  let mostrarhora2 = document.getElementsByClassName("hora-noche");
  for (let i = 0; i < mostrarhora2.length; i++) {
    mostrarhora2[i].style.display = "block";
  }
}

function sumahorasm() {
  let sh = 0,sh1 = 0,sh2 = 0,sh3 = 0;

  for (let i = 0; i < hsm; i++) {
    let hora = parseInt(
      document.getElementsByClassName("form-control 1")[i].value
    );
    sh += hora;
  }
  for (let i = 10; i < hsm1; i++) {
    let hora = parseInt(
      document.getElementsByClassName("form-control 1")[i].value
    );
    sh1 += hora;
  }
  for (let i = 20; i < hsm2; i++) {
    let hora = parseInt(
      document.getElementsByClassName("form-control 1")[i].value
    );
    sh2 += hora;
  }
  for (let i = 30; i < hsm3; i++) {
    let hora = parseInt(
      document.getElementsByClassName("form-control 1")[i].value
    );
    sh3 += hora;
  }
  document.getElementsByClassName("form-control 2")[hm].value = sh;
  document.getElementsByClassName("form-control 2")[hvm1].value = sh1;
  document.getElementsByClassName("form-control 2")[hvm2].value = sh2;
  document.getElementsByClassName("form-control 2")[hvm3].value = sh3;
}

function sumahorast() {
  let sh = 0,sh1 = 0,sh2 = 0,sh3 = 0;

  for (let i = 0; i < hst; i++) {
    let hora = parseInt(
      document.getElementsByClassName("form-control 1")[i].value
    );
    sh += hora;
  }
  for (let i = 10; i < hst1; i++) {
    let hora = parseInt(
      document.getElementsByClassName("form-control 1")[i].value
    );
    sh1 += hora;
  }
  for (let i = 20; i < hst2; i++) {
    let hora = parseInt(
      document.getElementsByClassName("form-control 1")[i].value
    );
    sh2 += hora;
  }
  for (let i = 30; i < hst3; i++) {
    let hora = parseInt(
      document.getElementsByClassName("form-control 1")[i].value
    );
    sh3 += hora;
  }
  document.getElementsByClassName("form-control 2")[ht].value = sh;
  document.getElementsByClassName("form-control 2")[hvt1].value = sh1;
  document.getElementsByClassName("form-control 2")[hvt2].value = sh2;
  document.getElementsByClassName("form-control 2")[hvt3].value = sh3;
}

function sumahorasn() {
  let sh = 0,sh1 = 0,sh2 = 0,sh3 = 0;
  for (let i = 0; i < hsn; i++) {
    let hora = parseInt(
      document.getElementsByClassName("form-control 1")[i].value
    );
    sh += hora;
  }
  for (let i = 10; i < hsn1; i++) {
    let hora = parseInt(
      document.getElementsByClassName("form-control 1")[i].value
    );
    sh1 += hora;
  }
  for (let i = 20; i < hsn2; i++) {
    let hora = parseInt(
      document.getElementsByClassName("form-control 1")[i].value
    );
    sh2 += hora;
  }
  for (let i = 30; i < hsn3; i++) {
    let hora = parseInt(
      document.getElementsByClassName("form-control 1")[i].value
    );
    sh3 += hora;
  }
  document.getElementsByClassName("form-control 2")[hn].value = sh;
  document.getElementsByClassName("form-control 2")[hvn1].value = sh1;
  document.getElementsByClassName("form-control 2")[hvn2].value = sh2;
  document.getElementsByClassName("form-control 2")[hvn3].value = sh3;
}