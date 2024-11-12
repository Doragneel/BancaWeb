<?php
    ini_set('log_errors', 0);
    ini_set('error_log', 'C:\xampp\htdocs\banco_imaginario\API\ResultadosdelAPI.txt');

    session_start();
    
    //error_log("Getjson.php ".$_SESSION['JsonGuardado']);
    
    echo $_SESSION['JsonGuardado'];
    
?>