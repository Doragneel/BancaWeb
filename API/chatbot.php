<?php
header('Content-Type: application/json');


$servername = "localhost";
$username = "root";  
$password = "";      
$dbname = "banco";   
$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}


if (isset($_POST['identificacion']) && !empty($_POST['identificacion'])) {
    $identificacion = $_POST['identificacion'];

    
    $sql = "SELECT NumCue, CupCre, NomPer, TipCue FROM usuarios WHERE IdPer = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $identificacion);  

    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
      
        $row = $result->fetch_assoc();

        
        $response = [
            'nombre_persona'=> $row['NomPer'],
            'numero_cuenta' => $row['NumCue'],
            'tipo_cuenta' => $row['TipCue'],  
            'cupo_credito' => $row['CupCre']
        ];

        echo json_encode($response);
    } else {
       
        echo json_encode(['error' => 'Usuario no encontrado porfavor cree una cuenta y realice su consulta']);
    }

    $stmt->close();
} else {
    
    echo json_encode(['error' => 'Número de identificación no proporcionado']);
}

$conn->close();
?>
