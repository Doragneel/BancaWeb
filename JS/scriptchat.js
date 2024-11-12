document.getElementById("chatbotButton").onclick = function() {
    const chatContainer = document.getElementById("chatbotContainer");
    chatContainer.style.display = (chatContainer.style.display === "none") ? "block" : "none";
    resetChat();
};


document.getElementById("closeChat").onclick = function() {
    const chatContainer = document.getElementById("chatbotContainer");
    chatContainer.style.display = "none";
};


document.getElementById("inicioChat").onclick = function() {
    resetChat()
    const chatContainer = document.getElementById("chatbotContainer");
    chatContainer.style.display = "block"; 
};

function resetChat() {
    document.getElementById("contenidoChat").style.display = "block";
    document.getElementById("formConsulta").style.display = "none";
    document.getElementById("menuOpciones").style.display = "none";
    document.getElementById("preguntasContainer").style.display = "none";
    document.getElementById("identificacion").value = ''; 
    document.getElementById("respuesta").innerHTML = '';  
}


document.getElementById("btnConsultaCuenta").onclick = function() {
    document.getElementById("contenidoChat").style.display = "none";
    document.getElementById("formConsulta").style.display = "block";
};


document.getElementById("btnPreguntas").onclick = function() {
    document.getElementById("contenidoChat").style.display = "none";
    document.getElementById("menuOpciones").style.display = "block";
};

function consultarCliente() {
    const identificacion = document.getElementById("identificacion").value.trim();

    if (identificacion === '') {
        alert('Por favor, ingrese un número de identificación.');
        return;
    }

    fetch("chatbot.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `identificacion=${identificacion}`
    })
    .then(response => response.json())
    .then(data => {
        const respuesta = document.getElementById("respuesta");
        respuesta.style.display = 'block';

        if (data.error) {
            respuesta.innerHTML = `<p style="color: red;">${data.error}</p>`;
        } else {
            respuesta.innerHTML = `
                <p><strong>Nombre de persona:</strong> ${data.nombre_persona || 'No disponible'}</p>
                <p><strong>Número de cuenta:</strong> ${data.numero_cuenta || 'No disponible'}</p>
                <p><strong>Tipo de cuenta:</strong> ${data.tipo_cuenta || 'No disponible'}</p>
                <p><strong>Cupo de crédito para vivienda: <strong>(COP)</strong></strong> ${data.cupo_credito || 'No disponible'},</p>
                

            `;
        }
    })
    .catch(error => {
        console.error("Error:", error);
        document.getElementById("respuesta").innerHTML = "<p style='color: red;'>Hubo un error al procesar la consulta.</p>";
    });
}

function mostrarPreguntas(opcion) {
    document.getElementById("menuOpciones").style.display = "none";
    document.getElementById("preguntasContainer").style.display = "block";

    let preguntasRespuestas = "";

    switch (opcion) {
        case 'cuentaAhorros':
            preguntasRespuestas = 
                `<div class="preguntaRespuesta">
                    <button onclick="mostrarRespuesta('respuesta1-cuentaAhorros')">¿Cómo puedo abrir una cuenta de ahorros?</button>
                    <div class="respuestabtn" id="respuesta1-cuentaAhorros"><li>Reúne tus documentos: Cédula de ciudadanía y comprobante de domicilio.</li>
                <li>Visita nuestra sucursal más cercana o inicia el proceso en línea.</li>
                <li>Completa el formulario de apertura de cuenta.</li>
                <li>Realiza tu depósito inicial (mínimo $50.000 COP).</li>
                <li>¡Listo! Tu cuenta estará activa en 24 horas hábiles.</li></div>
                </div>
                <div class="preguntaRespuesta">
                    <button onclick="mostrarRespuesta('respuesta2-cuentaAhorros')">¿Cuál es el saldo mínimo requerido?</button>
                    <div class="respuestabtn" id="respuesta2-cuentaAhorros"><li>El saldo mínimo requerido para mantener tu cuenta activa es de $50.000 COP.</li></div>
                </div>
                <div class="preguntaRespuesta">
                    <button onclick="mostrarRespuesta('respuesta3-cuentaAhorros')">¿Puedo consultar mi saldo en línea?</button>
                    <div class="respuestabtn" id="respuesta3-cuentaAhorros"><li>Puedes consultar tu saldo a través de nuestra app móvil, en línea, en cajeros automáticos o en cualquiera de nuestras sucursales.</li></div>
                </div>`;
            break;

        case 'creditoVivienda':
            preguntasRespuestas = 
                `<div class="preguntaRespuesta">
                    <button onclick="mostrarRespuesta('respuesta1-creditoVivienda')">¿Cuál es el monto mínimo y máximo que puedo solicitar?</button>
                    <div class="respuestabtn" id="respuesta1-creditoVivienda"><li>El monto mínimo es de 50 millones de pesos y el máximo dependerá de tu capacidad de endeudamiento y el valor de la vivienda.</li></div>
                </div>
                <div class="preguntaRespuesta">
                    <button onclick="mostrarRespuesta('respuesta2-creditoVivienda')">¿Puedo usar el crédito para comprar vivienda usada?</button>
                    <div class="respuestabtn" id="respuesta2-creditoVivienda"><li>Sí, nuestro Crédito de Vivienda puede ser utilizado tanto para vivienda nueva como usada.</li></div>
                </div>
                <div class="preguntaRespuesta">
                    <button onclick="mostrarRespuesta('respuesta3-creditoVivienda')">¿Qué documentos necesito para solicitar el crédito?</button>
                    <div class="respuestabtn" id="respuesta3-creditoVivienda"><li>Necesitarás tu documento de identidad, comprobantes de ingresos de los últimos 3 meses, declaración de renta (si aplica) y una cotización o promesa de compraventa del inmueble.</li></div>
                </div>`;
            break;

        case 'cdt':
            preguntasRespuestas = 
                `<div class="preguntaRespuesta">
                    <button onclick="mostrarRespuesta('respuesta1-cdt')">¿Qué pasa si necesito mi dinero antes del vencimiento?</button>
                    <div class="respuestabtn" id="respuesta1-cdt"><li>Los CDT están diseñados para mantenerse hasta su vencimiento. Sin embargo, en caso de emergencia, puedes solicitar la cancelación anticipada. Ten en cuenta que esto puede implicar penalidades o la pérdida de los intereses generados.</li></div>
                </div>
                <div class="preguntaRespuesta">
                    <button onclick="mostrarRespuesta('respuesta2-cdt')">¿Puedo reinvertir mi CDT al vencimiento?</button>
                    <div class="respuestabtn" id="respuesta2-cdt"><li>Sí, puedes renovar tu CDT al vencimiento. Incluso puedes configurar la renovación automática para que tu inversión siga creciendo sin interrupciones.</li></div>
                </div>
                <div class="preguntaRespuesta">
                    <button onclick="mostrarRespuesta('respuesta3-cdt')">¿Los intereses de mi CDT están sujetos a retención en la fuente?</button>
                    <div class="respuestabtn" id="respuesta3-cdt"><li>Sí, los rendimientos financieros están sujetos a una retención en la fuente del 4% sobre los intereses pagados. Esta retención se aplica en el momento del pago o abono en cuenta.</li></div>
                </div>`;
            break;

        case 'microcredito':
            preguntasRespuestas = 
                `<div class="preguntaRespuesta">
                    <button onclick="mostrarRespuesta('respuesta1-microcredito')">¿Qué documentos necesito para solicitar un microcrédito?</button>
                    <div class="respuestabtn" id="respuesta1-microcredito"><li>Necesitarás tu documento de identidad, RUT, extractos bancarios de los últimos 3 meses, y documentos que acrediten tu actividad económica (facturas, contratos, etc).</li></div>
                </div>
                <div class="preguntaRespuesta">
                    <button onclick="mostrarRespuesta('respuesta2-microcredito')">¿Cuánto tiempo toma aprobar mi solicitud?</button>
                    <div class="respuestabtn" id="respuesta2-microcredito"><li>El proceso de evaluación generalmente toma entre 24 y 48 horas hábiles, dependiendo de la completitud de la documentación proporcionada.</li></div>
                </div>
                <div class="preguntaRespuesta">
                    <button onclick="mostrarRespuesta('respuesta3-microcredito')">¿Puedo pagar mi microcrédito antes del plazo?</button>
                    <div class="respuestabtn" id="respuesta3-microcredito"><li>Sí, puedes realizar pagos anticipados o cancelar tu microcrédito antes del plazo sin penalidad. Esto te ayudará a reducir los intereses pagados.</li></div>
                </div>`;
            break;
    }

    document.getElementById("preguntasContainer").innerHTML = preguntasRespuestas;
    document.getElementById("preguntasContainer").style.display = "block";
}
function mostrarRespuesta(id) {
    var respuestabtn = document.getElementById(id);
    if (respuestabtn) {  
        if (respuestabtn.style.display === "none" || respuestabtn.style.display === "") {
            respuestabtn.style.display = "block";  
        } else {
            respuestabtn.style.display = "none";  
        }
    } else {
        console.error("Elemento con ID " + id + " no encontrado.");
    }
}
document.querySelectorAll(".pregunta").forEach(pregunta => {
    pregunta.addEventListener("click", function() {
        this.classList.toggle("activada");
        this.nextElementSibling.classList.toggle("respuestaVisible");
    });
});

function volverAlMenuPrincipal() {
    resetChat();
}
document.getElementById("identificacion").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        consultarCliente();
    }
});