<?php
    ini_set('log_errors', 0);

    ini_set('error_log', 'C:\xampp\htdocs\banco_imaginario\API\ResultadosdelAPI.txt');
    
    session_start();

    if (isset($_SESSION['Token'])) {

        // Decodificar el contenido JSON a un array asociativo de PHP
        $Token = json_decode($_SESSION['Token'], true);
        $HoraActual = new DateTime();
        $HoraActual = $HoraActual->format('Y-m-d H:i:s');
        $FechaDeCaducidad = new DateTime($Token['FechadeCreacion']);
        $FechaDeCaducidad->modify('+30 minutes');
        if ($HoraActual >= $FechaDeCaducidad->format('Y-m-d H:i:s')) {
            session_unset();
            session_destroy();
            echo json_encode(["Estado" => "Denegado", "Mensaje" => "Token ha caducado"]);
        } else {
            echo json_encode(["Estado" => "Valido", "Mensaje" => "Token valido"]);
        }


    } else {
        echo json_encode(["Estado" => "Denegado", "Mensaje" => "Token No encontado"]);
    }
    
?>
