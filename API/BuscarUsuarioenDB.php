<?php
require_once('Main.class.php');
    ini_set('log_errors', 0);
    ini_set('error_log', 'C:\xampp\htdocs\banco_imaginario\API\ResultadosdelAPI.txt');

    header("Content-Type: application/json; charset=UTF-8");
    $jsonRecibidoporLogin = file_get_contents("php://input");

    //$jsonRecibidoporLogin = file_get_contents('JsonTest.json');

    //error_log($jsonRecibidoporLogin); 
    $DatosRecibidosdelLogin = json_decode($jsonRecibidoporLogin, true);

    // Verificar que se recibieron los datos correctamente
    if ($DatosRecibidosdelLogin === null && json_last_error() !== JSON_ERROR_NONE) {
        header('Content-Type: application/json');
        echo json_encode(['mensaje' => 'Error al decodificar JSON en BuscarUsuarioenDB.php: ' . json_last_error_msg()]);
        exit;
    }
    if ($DatosRecibidosdelLogin) {
        if(isset($DatosRecibidosdelLogin['Usuario']) 
        && isset($DatosRecibidosdelLogin['Pass']))
        {
            $mensaje = Main::search_usuario($DatosRecibidosdelLogin['Usuario'], 
            $DatosRecibidosdelLogin['Pass']);

        }else $mensaje = 'datos no completos';
    } else {
        $mensaje = "no se pudo subir los datos de inicio de sesion";
    }

    if($mensaje['Estado'] == "valido"){
        echo json_encode(['Estado' => 'correcto','mensaje' => $mensaje['Mensaje']]);
    }else{
        echo json_encode(['Estado' => 'incorrecto', 'mensaje' => $mensaje['Mensaje']]);
    }
?>