const BotondeEnvio = document.querySelector("#enviar");

BotondeEnvio.addEventListener("click", async function (event) {
    // Evitar la recarga de la página (evitar el envío del formulario)
    event.preventDefault();  // Evita el comportamiento predeterminado del botón (que podría ser enviar el formulario)

    const IdPer = document.querySelector("#IdPer").value;
    const PasUsu = document.querySelector("#PasUsu").value;

    // Llamar a la función asincrónica para obtener la dirección
    const direccion = await obtenerDireccion();

    if (direccion) {
        const datos = {
            Usuario: IdPer,
            Pass: PasUsu
        };

        try {
            // Realizar la solicitud POST
            const response = await fetch('http://localhost/banco_imaginario/API/BuscarUsuarioenDB.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datos)  // Enviar el JSON
            });

            // Obtener y manejar la respuesta
            const data = await response.json();
            console.log("Respuesta del servidor:", data);
            if (data.Estado == "correcto") {
                if(direccion == "HTML/login.html"){
                    window.location.href = '../index.html';
                }else{
                    window.location.href = '../' + direccion;
                }
            }else{
                console.log(data.mensaje);
            }

        } catch (error) {
            console.error('Error al hacer la solicitud:', error);
            alert("Hubo un problema con la conexión.");
        }
    } else {
        console.log("No se pudo obtener la dirección.");
    }
});

async function obtenerDireccion() {
    try {
        // Hacer la solicitud GET para obtener la dirección
        const response = await fetch('http://localhost/banco_imaginario/API/Getjson.php');
        const data = await response.json();

        if (data && data.Direccion) {
            return data.Direccion;  // Retornar la dirección obtenida
        } else {
            console.log("No se encontró la dirección en la respuesta.");
            return null;  // Si no se encuentra la dirección, retornar null
        }
    } catch (error) {
        console.error('Error al obtener la dirección:', error);
        return null;  // Si hay un error, retornar null
    }
}
