let horario = h+""+minutos;
let turno = parseInt(horario);

console.log(turno);

  if (turno > 29 && turno < 600) {
    for (let i = 0; i < 4; i++) {
    document.getElementsByName("turno")[i].value = "NOCHE";
    }
  }
  if (turno > 600 && turno < 1530) {
    for (let i = 0; i < 4; i++) {
    document.getElementsByName("turno")[i].value = "MAÑANA";
    }
  }
  if (turno > 1529 && turno < 2360) {
    for (let i = 0; i < 4; i++) {
    document.getElementsByName("turno")[i].value = "TARDE";
    }
  }
  if (turno > 0 && turno < 30) {
    for (let i = 0; i < 4; i++) {
    document.getElementsByName("turno")[i].value = "TARDE:";
    }
  }