onload = inicia; 

var laTabla, totalFilas, elContenido=[]; 

var misColumnas = 5; 

function inicia() {
  laTabla = document.querySelector("table"); 
  lasFilas = laTabla.querySelectorAll("tr"); 
  totalFilas = lasFilas.length; 
  totalColumnas = lasFilas[0].querySelectorAll("td"); 

  for(r=0; r<totalFilas; r++) {
    
    elContenido[r] = []; 
    
    for(d=0; d<totalColumnas.length; d++) {
      elContenido[r][d] = lasFilas[r].querySelectorAll("td")[d].innerHTML;
    }
  }


  var nuevaTabla = ""; 
  
  for(r=0; r<totalFilas; r++) {
    nuevaTabla += "<tr>"; 
  
    for(d=0; d<misColumnas; d++) {
      nuevaTabla += "<td></td>";
    }
  
    nuevaTabla += "</tr>"; 
  }
  
  laTabla.innerHTML = nuevaTabla; 
  
    for(t=0; t<totalFilas; t++) {
      laTabla.querySelectorAll("tr")[t].querySelector("td").innerHTML = elContenido[t][0]; 
    }
  
  llenaTabla(0); 
  
  document.querySelector("input").style.width = laTabla.offsetWidth+"px"; 
  document.querySelector("input").max = (totalColumnas.length - misColumnas); 
  document.querySelector("input").value = 0; 
}



function llenaTabla(muestra) {
  for(f=0; f<totalFilas; f++) {
    for(c=1; c<misColumnas; c++) {
      laTabla.querySelectorAll("tr")[f].querySelectorAll("td")[c].innerHTML = elContenido[f][+muestra+c]; 
    }
  }
}