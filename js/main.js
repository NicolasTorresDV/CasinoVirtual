
let stats = {
    victorias: 0,
    empates: 0,
    derrotas: 0
}
if (localStorage.getItem("Estadisticas") == null) {
    localStorage.setItem("Estadisticas",JSON.stringify(stats))
}

let seccionJugar = document.createElement("div");
let botonPedirOtra;

function lanzarDado(...dados) {
    for (let i = 0; i < dados.length; i++) {
        dados[i] = Math.floor(Math.random() * (7 - 1) + 1);      //Codigo para obtener un numero random entre el 1 y el 6;     
    }
    return dados; 
}


function compararDados(dados){
    if (dados[0]+dados[1] > dados[2]+dados[3]) {
        // victorias = victorias + 1 ;
        stats = JSON.parse(localStorage.getItem("Estadisticas"));
        stats.victorias++;
        console.log(stats?.victorias || "No se pudo agregar la victoria a las estadisticas");
        localStorage.setItem("Estadisticas",JSON.stringify(stats));

        Toastify({
            text: `Nueva victoria! Victorias: ${stats.victorias}` ,
            duration: 3000,
            gravity: "top", 
            position: "right",
            style: {
              background: "#0c9122",
              color: "white",
              fontFamily: "Cinzel Decorative, Franklin Gothic Medium, Arial Narrow, Arial, sans-serif"
            }
          }).showToast();

        return "Felicidades, Ganaste!";
    } else if(dados[0]+dados[1] < dados[2]+dados[3]){
        // derrotas = derrotas + 1 ;
        stats = JSON.parse(localStorage.getItem("Estadisticas"));
        stats.derrotas++;
        console.log(stats?.derrotas || "No se pudo agregar la derrota a las estadisticas");
        localStorage.setItem("Estadisticas",JSON.stringify(stats));

        Toastify({
            text: `Derrota :( Derrotas: ${stats.derrotas}` ,
            duration: 3000,
            gravity: "top", 
            position: "right",
            style: {
              background: "#910c0c",
              color: "white",
              fontFamily: "Cinzel Decorative, Franklin Gothic Medium, Arial Narrow, Arial, sans-serif"
            }
          }).showToast();

        return "Has pedido. Suerte la proxima!";
    } else {
        // empates = empates + 1 ;
        stats = JSON.parse(localStorage.getItem("Estadisticas"));
        stats.empates++;
        console.log(stats?.empates || "No se pudo agregar el empate a las estadisticas");
        localStorage.setItem("Estadisticas",JSON.stringify(stats));

        Toastify({
            text: `Empate! Empates: ${stats.empates}` ,
            duration: 3000,
            gravity: "top", 
            position: "right",
            style: {
              background: "#027bb8",
              color: "white",
              fontFamily: "Cinzel Decorative, Franklin Gothic Medium, Arial Narrow, Arial, sans-serif"
            }
          }).showToast();

        return "Empate, ni pa ti ni pa mi :)";
    }
}

function crearBaraja(){
    const arrayBaraja = [];
    let contador = 0;
    let palo = "";
    for (let j = 1; j <= 4; j++) {
        if (j==1)
            palo = "Trebol"
        if (j==2)
            palo = "Pica"
        if (j==3)
            palo = "Diamante"
        if (j==4)
            palo = "Corazon"

        for (let i = 1; i <= 13; i++) {

            if (i == 1) {
                arrayBaraja[contador] = new Naipe(1,1,palo,"A");
            }

            if (i > 1 && i < 11) {
                arrayBaraja[contador] = new Naipe(i,i,palo,i.toString());
            }

            if (i == 11) {
                arrayBaraja[contador] = new Naipe(11,10,palo,"J");
            }
            if (i == 12) {
                arrayBaraja[contador] = new Naipe(12,10,palo,"Q");
            }
            if (i == 13) {
                arrayBaraja[contador] = new Naipe(13,10,palo,"K");
            }
            contador = contador + 1;
        }
    }
    return arrayBaraja;
}

function mostrarMano(mano){
    let mensajeMano = "";
    let valorTotal = 0;
    let result = [];
    for (let i = 0; i < mano.length; i++) {
        valorTotal += mano[i].valorBJ;
        // if (i == mano.length-1) {
        //     mensajeMano = mensajeMano + mano[i].letra + " de " + mano[i].palo + " ";  
        // }else{
        //     mensajeMano = mensajeMano + mano[i].letra + " de " + mano[i].palo + " ,";    
        // }
        i == mano.length-1 ? mensajeMano = mensajeMano + mano[i].letra + " de " + mano[i].palo + " " :   mensajeMano = mensajeMano + mano[i].letra + " de " + mano[i].palo + " ,"; 
    }
    mensajeMano = mensajeMano + ` = ${valorTotal}`;
    result = [mensajeMano,valorTotal];
    
    return result;
}

function nuevaMano(){

        if (nuevaBaraja.barajaNaipes.length <= 15) {
            alert("Se acabaron las cartas! Volviendo a barajar..."); //En caso que le toque la mano más larga posible con todos los As y 2 y un 3, más las cartas del dealer
            nuevaBaraja = new baraja();
            nuevaBaraja.barajar();
        }
        
        nuevaBaraja.barajar();
        manoIA = [nuevaBaraja.darCarta(),nuevaBaraja.darCarta()];
        manoJ = [nuevaBaraja.darCarta(),nuevaBaraja.darCarta()]; 

        const [primeraCartaIA,segundaCartaIA] = manoIA;
        const [primeraCartaJ,segundaCartaJ] = manoJ;

        seccionJugar.innerHTML = `<div class="sectionContainer">
                                <div class="blackJackContainer">
                                    <div class="messageSection">
                                        <p id="handMessageSection"> Buena Suerte! </p>
                                    </div>
                                    <div class="handSectionContainer">
                                    <p id="totalManoIA" >Mano IA: ${mostrarMano(manoIA)[1]}</p>
                                        <div class="handSection" id="manoBJIA">
                                            
                                            <div><img class="cards" src="img/Cartas/${primeraCartaIA.letra}${primeraCartaIA.palo}.png" alt="${primeraCartaIA.letra}${primeraCartaIA.palo}"></div>
                                            <div><img class="cards" src="img/Cartas/${segundaCartaIA.letra}${segundaCartaIA.palo}.png" alt="${segundaCartaIA.letra}${segundaCartaIA.palo}"></div>
                                        </div>
                                        <p id="totalManoJ" >Tu mano: ${mostrarMano(manoJ)[1]}</p>
                                        <div class="handSection" id="manoBJJ">
                                            
                                            <div><img class="cards" src="img/Cartas/${primeraCartaJ.letra}${primeraCartaJ.palo}.png" alt="${primeraCartaJ.letra}${primeraCartaJ.palo}"></div>
                                            <div><img class="cards" src="img/Cartas/${segundaCartaJ.letra}${segundaCartaJ.palo}.png" alt="${segundaCartaJ.letra}${segundaCartaJ.palo}"></div>
                                        </div>
                                    </div>
                                    <div class="buttonSectionContainer">
                                        <button class="buttonSection" id="botonNuevaMano">Nueva mano</button>
                                        <button class="buttonSection" id="botonPedirOtra">Pedir otra</button>
                                        <button class="buttonSection" id="botonPlantarse">Plantarse</button>
                                        <button class="buttonSection" id="botonSalir">Salir</button>
                                    </div>
                                </div>                      
                            </div>`;

    document.body.appendChild(seccionJugar);

    let botonNuevaMano = document.getElementById("botonNuevaMano");

    let mensaje;
    mensaje = document.getElementById("handMessageSection")


    botonNuevaMano.style.display = "none";

    let botonPedirOtra = document.getElementById("botonPedirOtra");

    botonPedirOtra.onclick = (e) => {
        manoJ.push(nuevaBaraja.darCarta())

        let nuevamano = document.createElement("div");
        nuevamano.innerHTML = `<img class="cards" src="img/Cartas/${manoJ[manoJ.length-1].letra}${manoJ[manoJ.length-1].palo}.png" alt="${manoJ[manoJ.length-1].letra}${manoJ[manoJ.length-1].palo}">`
        
        document.getElementById("totalManoJ").innerHTML = `<p id="totalManoJ" >Mano IA: ${mostrarMano(manoJ)[1]}</p>`;
        document.getElementById("manoBJJ").appendChild(nuevamano);
        if (mostrarMano(manoJ)[1] > 21) {
            mensaje.innerText = "Perdiste! Suerte la siguiente mano!"

            stats = JSON.parse(localStorage.getItem("Estadisticas"));
            stats.derrotas++;
            console.log(stats?.derrotas || "No se pudo agregar la derrota a las estadisticas");
            localStorage.setItem("Estadisticas",JSON.stringify(stats));

            Toastify({
                text: `Derrota :( Derrotas: ${stats.derrotas}` ,
                duration: 3000,
                gravity: "top", 
                position: "right",
                style: {
                  background: "#910c0c",
                  color: "white",
                  fontFamily: "Cinzel Decorative, Franklin Gothic Medium, Arial Narrow, Arial, sans-serif"
                }
              }).showToast();

            botonNuevaMano.style.display = "initial";
            botonPedirOtra.style.display = "none";
            botonPlantarse.style.display = "none";
        }
        
    }

    botonNuevaMano.onclick = (e) => {
        botonNuevaMano.style.display = "none";
        botonPedirOtra.style.display = "initial";
        botonPlantarse.style.display = "initial";
        nuevaMano();
    }

    let botonPlantarse = document.getElementById("botonPlantarse");

    botonPlantarse.onclick = (e) => {
        let manoTerminada = false;

        do {

            if (mostrarMano(manoIA)[1] > mostrarMano(manoJ)[1] && mostrarMano(manoIA)[1] < 21) {
                mensaje.innerText = "Perdiste! Suerte la siguiente mano!"
                stats = JSON.parse(localStorage.getItem("Estadisticas"));
                stats.derrotas++;
                console.log(stats?.derrotas || "No se pudo agregar la derrota a las estadisticas");
                localStorage.setItem("Estadisticas",JSON.stringify(stats));
                // derrotas = derrotas + 1;

                Toastify({
                    text: `Derrota :( Derrotas: ${stats.derrotas}` ,
                    duration: 3000,
                    gravity: "top", 
                    position: "right",
                    style: {
                      background: "#910c0c",
                      color: "white",
                      fontFamily: "Cinzel Decorative, Franklin Gothic Medium, Arial Narrow, Arial, sans-serif"
                    }
                  }).showToast();

                botonNuevaMano.style.display = "initial";
                botonPedirOtra.style.display = "none";
                botonPlantarse.style.display = "none";
                
                manoTerminada = true;
            }else if(mostrarMano(manoIA)[1] > 21){
                mensaje.innerText = "Ganaste! Felicidades!"
                stats = JSON.parse(localStorage.getItem("Estadisticas"));
                stats.victorias++;
                console.log(stats?.victorias || "No se pudo agregar la victoria a las estadisticas");
                localStorage.setItem("Estadisticas",JSON.stringify(stats));
                // victorias = victorias + 1; 

                Toastify({
                    text: `Nueva victoria! Victorias: ${stats.victorias}` ,
                    duration: 3000,
                    gravity: "top", 
                    position: "right",
                    style: {
                      background: "#0c9122",
                      color: "white",
                      fontFamily: "Cinzel Decorative, Franklin Gothic Medium, Arial Narrow, Arial, sans-serif"
                    }
                  }).showToast();

                botonNuevaMano.style.display = "initial";
                botonPedirOtra.style.display = "none";
                botonPlantarse.style.display = "none";
                manoTerminada = true;

            }else if(mostrarMano(manoIA)[1] <= mostrarMano(manoJ)[1] && mostrarMano(manoIA)[1] < 17) {
                manoIA.push(nuevaBaraja.darCarta())
                let nuevamano = document.createElement("div");
                nuevamano.innerHTML = `<img class="cards" src="img/Cartas/${manoIA[manoIA.length-1].letra}${manoIA[manoIA.length-1].palo}.png" alt="${manoIA[manoIA.length-1].letra}${manoIA[manoIA.length-1].palo}">`
                document.getElementById("totalManoIA").innerHTML = `<p id="totalManoIA" >Mano IA: ${mostrarMano(manoIA)[1]}</p>`;
                document.getElementById("manoBJIA").appendChild(nuevamano);
                manoTerminada = false;

            }else if(mostrarMano(manoIA)[1] < mostrarMano(manoJ)[1] && mostrarMano(manoIA)[1] >= 17){                
                mensaje.innerText = "Ganaste! Felicidades!"
                stats = JSON.parse(localStorage.getItem("Estadisticas"));
                stats.victorias++;
                console.log(stats?.victorias || "No se pudo agregar la victoria a las estadisticas");
                localStorage.setItem("Estadisticas",JSON.stringify(stats));
                // victorias = victorias + 1; 

                Toastify({
                    text: `Nueva victoria! Victorias: ${stats.victorias}` ,
                    duration: 3000,
                    gravity: "top", 
                    position: "right",
                    style: {
                      background: "#0c9122",
                      color: "white",
                      fontFamily: "Cinzel Decorative, Franklin Gothic Medium, Arial Narrow, Arial, sans-serif"
                    }
                  }).showToast();

                botonNuevaMano.style.display = "initial";
                botonPedirOtra.style.display = "none";
                botonPlantarse.style.display = "none";
                manoTerminada = true;

            }else if(mostrarMano(manoIA)[1] == mostrarMano(manoJ)[1] && mostrarMano(manoIA)[1] >= 17){
                mensaje.innerText = "Emapte! Todos ganan :)!"
                stats = JSON.parse(localStorage.getItem("Estadisticas"));
                stats.empates++;
                console.log(stats?.empates || "No se pudo agregar el empate a las estadisticas");
                localStorage.setItem("Estadisticas",JSON.stringify(stats));
                // empates = empates + 1; 

                Toastify({
                    text: `Empate! Empates: ${stats.empates}` ,
                    duration: 3000,
                    gravity: "top", 
                    position: "right",
                    style: {
                      background: "#027bb8",
                      color: "white",
                      fontFamily: "Cinzel Decorative, Franklin Gothic Medium, Arial Narrow, Arial, sans-serif"
                    }
                  }).showToast();

                botonNuevaMano.style.display = "initial";
                botonPedirOtra.style.display = "none";
                botonPlantarse.style.display = "none";
                manoTerminada = true;

            }
        } while (manoTerminada != true);
    }

    let botonSalir = document.getElementById("botonSalir");

    botonSalir.onclick = (e) => {
        location.reload();
    }
}

//Constructor de cartas
class Naipe {
    constructor(valor,valorBJ,palo,letra) {
        this.letra = letra;
        this.valor = valor;
        this.valorBJ = valorBJ;
        this.palo = palo;
    }
}

//Constructor de Barajas
class baraja{
    constructor(){
        this.barajaNaipes = crearBaraja();
    }
    barajar(){
        return this.barajaNaipes = this.barajaNaipes.sort((a, b) => 0.5 - Math.random());
    }
    darCarta(){
        let carta = this.barajaNaipes[0];
        this.barajaNaipes.shift();
        return carta;
    }
}

//Dados
let botonDados = document.getElementById("jugarDados");



botonDados.onclick = (e) => {
    document.getElementById("sectionButton").style.display = "none";
    document.getElementById("sectionFooter").style.display = "none";
    let seccionJugar = document.createElement("div");

    let dado1 = 0,dado2 = 0 ,dadoIA1 = 0,dadoIA2 = 0;
    // dados = dados.map(lanzarDado) //Quito el map para poder aplicar el Spread para la entrega  
    let dados = lanzarDado(dado1,dado2,dadoIA1,dadoIA2);

    seccionJugar.innerHTML = `<div class="sectionContainer" id="gameSectionDice">

                                <div class="dicesSectionContainer">
                                    <div class="sectionMessage">
                                        <p> ${compararDados(dados)} </p>
                                    </div>
                                </div>

                                <div class="dicesSectionContainer">
                                    <div class="dicesSection">
                                    <p> Dados IA:</p>
                                        <img src="img/Dados/dadoCara${dados[2]}.png" alt="${dados[2]}">
                                        <img src="img/Dados/dadoCara${dados[3]}.png" alt="${dados[3]}">
                                    </div>

                                    <div class="dicesSection">
                                        <p> Tus dados:</p>
                                        <img src="img/Dados/dadoCara${dados[0]}.png" alt="${dados[0]}">
                                        <img src="img/Dados/dadoCara${dados[1]}.png" alt="${dados[1]}">
                                    </div>
                                </div>

                                <div class="dicesSectionContainer">
                                    <a href="index.html"> Volver </a>
                                </div>
                            </div>`;
    document.body.appendChild(seccionJugar);
}
//Fin Dados


//BlackJack
let botonBlackJack = document.getElementById("jugarBlackJack");
let nuevaBaraja = new baraja();
let manoIA,manoJ;


botonBlackJack.onclick = (e) => {
    document.getElementById("sectionButton").style.display = "none"; 
    document.getElementById("sectionFooter").style.display = "none";
    manoIA = [nuevaBaraja.darCarta(),nuevaBaraja.darCarta()];
    manoJ = [nuevaBaraja.darCarta(),nuevaBaraja.darCarta()]; 
    nuevaMano();
}
//Fin BlackJack


//Estadisticas
let botonEstadisticas = document.getElementById("mostrarEstadisticas");
botonEstadisticas.onclick = (e) => {
    document.getElementById("sectionButton").style.display = "none";
    document.getElementById("sectionFooter").style.display = "none";
    let seccionJugar = document.createElement("div");

    seccionJugar.innerHTML = `<div class="sectionContainer">
                                <div class="sectionStats">
                                    <p>Victorias: ${JSON.parse(localStorage.getItem("Estadisticas")).victorias}</p>
                                    <p>Derrotas: ${JSON.parse(localStorage.getItem("Estadisticas")).derrotas}</p>
                                    <p>Empates: ${JSON.parse(localStorage.getItem("Estadisticas")).empates}</p>
                                    <a href="index.html"> Volver </a>
                                </div>
                            
                            </div>`;

    document.body.appendChild(seccionJugar);
}

//Fin Estadisticas

//Fortuna

let botonFortuna = document.getElementById("mostrarFortuna");
botonFortuna.onclick = (e) => {
    document.getElementById("sectionButton").style.display = "none";
    document.getElementById("sectionFooter").style.display = "none";
    let seccionJugar = document.createElement("div");

        fetch("fortunas.json")
            .then(respuesta => respuesta.json())
            .then(result => {
                let datos = result;
                let frase = datos[Math.floor(Math.random() * ((datos.length+1) - 1) + 1)].frase;
                console.log(frase)
    
                seccionJugar.innerHTML = `<div class="sectionContainer">
                                <div class="sectionFortune">
                                    <p>${frase} </p>
                                    <a href="index.html"> Volver </a>
                                </div>
                            
                            </div>`;
    
            })
            .catch(error => console.log(error))
    

    document.body.appendChild(seccionJugar);
}

//Fin Fortuna


