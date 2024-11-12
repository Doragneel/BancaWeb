<?php
class Database {
    private $host = 'localhost';
    private $user = 'root';
    private $pass = '';
    private $dbname = 'banco';

    public function getConnection() {
        $hostDB = "mysql:host=" . $this->host . ";port=3306;dbname=" . $this->dbname;
        try {
            $connection = new PDO($hostDB, $this->user, $this->pass);
            $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $connection;
        } catch (PDOException $e) {
            die("ERROR: " . $e->getMessage());
        }
    }
}
?>