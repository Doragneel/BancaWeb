document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel-inner');
    const images = carousel.querySelectorAll('img');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    let currentIndex = 0;

    function showImage(index) {
        images.forEach((img, i) => {
            if (i === index) {
                img.style.display = 'block';
            } else {
                img.style.display = 'none';
            }
        });
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    }

    nextBtn.addEventListener('click', showNext);
    prevBtn.addEventListener('click', showPrev);
    showImage(currentIndex);
    setInterval(showNext, 5000);
});

// Selección de todos los botones
const TodoslosBotonesSelecionados = document.querySelectorAll(".btn");

// Función principal para verificar el token y la redirección
async function verificarTokenYBotones() {
    try {
        // Fetch para obtener el token
        const response = await fetch('http://localhost/banco_imaginario/API/TokenGuardado.php', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const Token = await response.json();

        if (Token.Estado === "Valido") {
            console.log("Token Válido. Bienvenido!");

            // Cambiar el nombre y texto del botón de login/logout
            const login_logout = document.querySelector('a[name="Login"]');
            login_logout.textContent = "Salir de tu portal";

            // Llamar la función de los botones
            const redireccion = await SelecionadordeBotones();  // Esperar el resultado de la selección del botón

            if (redireccion == "HTML/login.html"){
                try {
                    // Realizando la solicitud POST
                    const response = await fetch('http://localhost/banco_imaginario/API/CerrarSesion.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'  // Especificamos que el contenido es JSON
                        }
                    });
                    location.reload();
                } catch (error) {
                    console.error('Error al enviar la solicitud:', error);
                    console.log("Hubo un problema con la conexión al servidor en EnviarJson.");
                }
            }else if(redireccion != null){
                console.log("Redirigiendo a: ", redireccion);
                window.location.href = redireccion;  // Realizar la redirección
            } else {
                console.log("No se seleccionó un destino válido.");
            }

        } else {
            console.log("El token ha caducado o no es válido. Por favor, inicie sesión de nuevo.");

            // Llamar la función de los botones
            const redireccion = await SelecionadordeBotones();  // Esperar el resultado de la selección del botón

            if (redireccion !== null) {
                EnviarJsonYRedirigir(redireccion);
            } else {
                console.log("No redirecciona");
            }
        }

    } catch (error) {
        console.error('Error al hacer el fetch:', error);
        console.log("Hubo un problema con la conexión al servidor.");
    }
}

// Función que maneja la lógica de los botones
function SelecionadordeBotones() {
    return new Promise((resolve, reject) => {
        // Recorrer los botones seleccionados
        TodoslosBotonesSelecionados.forEach(function (BotonSelecionado) {
            BotonSelecionado.addEventListener('click', function (event) {
                // Diccionario de botones y destinos
                const ListadeBotonesEsperados = DiccionariodeBotonesEsperados();
                const ListadeDirreciones = DiccionariodeDestinos();
                let NombredelBoton = event.target.name;

                // Verificar si el botón está en el diccionario
                if (Object.values(ListadeBotonesEsperados).includes(NombredelBoton)) {
                    // Si es un botón de desarrollo (ej. Personas, Empresas)
                    if (NombredelBoton === "Personas" || NombredelBoton === "Empresas") {
                        window.alert("En desarrollo, lugar de destino: " + ListadeDirreciones[NombredelBoton]);
                        resolve(null);  // No redirigir
                    } else {
                        resolve(ListadeDirreciones[NombredelBoton]);  // Redirigir a la URL del botón
                    }
                } else {
                    resolve(null);  // Si el botón no es válido, no hacer nada
                }
            });
        });
    });
}

async function EnviarJsonYRedirigir(DireccionRecibida) {
    // El objeto que deseas enviar
    const mensaje = {
        Direccion: DireccionRecibida
    };

    try {
        // Realizando la solicitud POST
        const response = await fetch('http://localhost/banco_imaginario/API/Setjson.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'  // Especificamos que el contenido es JSON
            },
            body: JSON.stringify(mensaje)  // Convertimos el objeto JavaScript en una cadena JSON
        });

        // Verificamos si la respuesta es exitosa (código 200-299)
        if (response.ok) {
            const responseJson = await response.json(); // Parseamos la respuesta JSON
            console.log("Respuesta del servidor:", responseJson);

            // Si todo fue bien, redirigimos al usuario a la página de login
            window.location.href = 'HTML/login.html';
        } else {
            console.error("Error en la solicitud:", response.statusText);         
        }
    } catch (error) {
        console.error('Error al enviar la solicitud:', error);
        console.log("Hubo un problema con la conexión al servidor en EnviarJson.");
    }
}

verificarTokenYBotones();  // Llamada a la función principal

function DiccionariodeBotonesEsperados(){
    return {
        1 : "Personas",
        2 : "Empresas",
        3 : "Login",
        4 : "CuentadeAhorros",
        5 : "CreditodeVivienda",
        6 : "CDT",
        7 : "Microcredito"
    }
    return ListadeBotonesEsperados;
}

function DiccionariodeDestinos(){
    return {
        "Personas" : "/HTML/personas.html",
        "Empresas" : "HTML/empresas.html",
        "Login" : "HTML/login.html",
        "CuentadeAhorros" : "HTML/cuentaahorros.html",
        "CreditodeVivienda" : "HTML/credito_vivienda.html",
        "CDT" : "HTML/cdt.html",
        "Microcredito" : "HTML/microcredito.html"
    }
}

window.addEventListener('popstate', async function (event) {
    console.log("Navegación hacia atrás detectada");

    // Aquí puedes realizar la misma verificación del token si es necesario
    await verificarTokenYBotones();  // Asegúrate de volver a ejecutar la lógica de redirección
});


