<?php
    ini_set('log_errors', 0);
    ini_set('error_log', 'C:\xampp\htdocs\banco_imaginario\API\ResultadosdelAPI.txt');

    session_start();
    
    header("Content-Type: application/json; charset=UTF-8");
    
    $DatosRecibidosenJson = file_get_contents("php://input");
    //$DatosRecibidosenJson = file_get_contents('JsonTest.json');
    $_SESSION['JsonGuardado'] = $DatosRecibidosenJson;
    //error_log("SetJson.php ".$_SESSION['JsonGuardado']);
    echo json_encode(['mensaje' => "información guardada"]);
    
?>