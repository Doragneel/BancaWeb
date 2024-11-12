<?php

    ini_set('log_errors', 0);

    ini_set('error_log', 'C:\xampp\htdocs\banco_imaginario\API\ResultadosdelAPI.txt');

    require_once('Database.class.php');

    class Main{

        //funcion para realizar la conexión con la base de datos
        private static function conectar(){
            $database= new Database();
            return $database->getConnection();
        }
        public static function search_usuario($user, $pass){
            $conn=self::conectar();
            //busca al usuario
            $stmt=$conn->prepare('SELECT * FROM usuarios WHERE Idper = :user LIMIT 1');
            $stmt->bindParam(':user',$user);
            $stmt->execute();
            //guarda la información que trajo
            $RegistroBuscado = $stmt->fetch(PDO::FETCH_ASSOC);
            //si el usuario no es vacio existe
            if (!empty($RegistroBuscado)) {
                if(strcmp($RegistroBuscado['PasUsu'], $pass) == 0){
                    self::GeneradordelTokens($RegistroBuscado['IdPer']);
                    return ["Estado" => "valido", "Mensaje" => "token generado"];
                }
                else {
                    return ["Estado" => "incorrecto", "Mensaje" => "password incorrecta"];
                }
            } else {
                return ["Estado" => "incorrecto", "Mensaje" => "usuario no encontrado"];
            }

        }

        Private static function GeneradordelTokens($DatoaEncriptar){
            $Clave = "ECCI 2027";
            $Iv = openssl_random_pseudo_bytes(openssl_cipher_iv_length('aes-256-cbc'));  // Generar IV aleatorio

            // Encriptar el texto utilizando AES-256-CBC
            $TextoEncriptado = openssl_encrypt($DatoaEncriptar, 'aes-256-cbc', $Clave, 0, $Iv);

            // Codificar el IV y el texto encriptado en base64 para poder transmitirlos como texto
            $InformacionEncriptada = base64_encode($Iv . $TextoEncriptado);

            $FechadeCreacion = new DateTime();
            $FechadeCreacion = $FechadeCreacion->format('Y-m-d H:i:s');
            $Token = [
                "Usuario" => $InformacionEncriptada,
                "FechadeCreacion" => $FechadeCreacion
            ];
            $JsonToken=json_encode($Token);
            session_start();
            $_SESSION['Token'] = $JsonToken;
        }

        private static function DesencriptacionDetoken ($TokenEncritadoJson){
            $TokenEncriptado=json_decode($TokenEncritadoJson);
            // Definir la clave (debe ser la misma que usaste para encriptar)
            $Clave = "ECCI 2027";

            // Decodificar el Base64 para obtener el IV y el texto encriptado
            $DatosDecodificados = base64_decode($TokenEncriptado->Usuario);

            // Extraer el IV (los primeros 16 bytes) y el texto encriptado (el resto)
            $Iv = substr($DatosDecodificados, 0, openssl_cipher_iv_length('aes-256-cbc'));
            $TextoEncriptado = substr($DatosDecodificados, openssl_cipher_iv_length('aes-256-cbc'));

            // Desencriptar el texto utilizando AES-256-CBC
            $TextoDesencriptado = openssl_decrypt($TextoEncriptado, 'aes-256-cbc', $Clave, 0, $Iv);

            // Mostrar el texto desencriptado
            echo "Texto desencriptado: " . $TextoDesencriptado;
        }
    }
    
    //$Usuario = new Main();
?>