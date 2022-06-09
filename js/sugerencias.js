//Sugerencias

let botonSugerencia = document.getElementById("botonEnviarSugerencia");
botonSugerencia.onclick = (e) => {
    
    let unaSugerencia ={
        email: document.getElementById("inputEmail").value,
        sugerencia: document.getElementById("textAreaSugerencias").value
    }; 

    let enviarSugerencia = (unaSugerencia) => {
        return new Promise( (resolve, reject) => {
            if (unaSugerencia == null) {
                reject("Error al enviar la sugerencia");
            }
            else{
                resolve("Sugerencia enviada con exito");
                
            }
        });
    }


        enviarSugerencia(unaSugerencia).then( (response) => {
            
            let sugerencias = [];
            //Guardo los datos en la localStorage ya que desde JavaScript no puedo guardarlo en un archivo
            if (localStorage.getItem("Sugerencias") == null) {
                localStorage.setItem("Sugerencias",JSON.stringify(sugerencias))      
            }

            sugerencias = JSON.parse(localStorage.getItem("Sugerencias"));
            sugerencias.push(unaSugerencia);
            console.log(unaSugerencia)
            localStorage.setItem("Sugerencias",JSON.stringify(sugerencias))
            


            Toastify({ 
                text: `Sugerencia enviada correctamente!` ,
                duration: 3000,
                gravity: "top", 
                position: "right",
                style: {
                  background: "#0c9122",
                  color: "white",
                  fontFamily: "Cinzel Decorative, Franklin Gothic Medium, Arial Narrow, Arial, sans-serif"
                }
              }).showToast();
              
              botonSugerencia.disabled = true;
              setTimeout(() => {window.location.href = "/index.html"} , 2000);
            });



        enviarSugerencia(unaSugerencia).catch( (response) => {
            Toastify({ 
                text: `No se pudo enviar la sugerencia` ,
                duration: 3000,
                gravity: "top", 
                position: "right",
                style: {
                  background: "#910c0c",
                  color: "white",
                  fontFamily: "Cinzel Decorative, Franklin Gothic Medium, Arial Narrow, Arial, sans-serif"
                }
            }).showToast();
          });
}

//Fin sugerencias