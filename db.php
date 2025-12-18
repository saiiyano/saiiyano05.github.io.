<?php
// Параметры подключения
$host = '127.0.0.1'; // используем 127.0.0.1 вместо localhost для TCP
$port = 3307;        // ваш порт MySQL в XAMPP
$db   = 'phone_numbers';
$user = 'root';
$pass = '';
$charset = 'utf8mb4';

// DSN для PDO
$dsn = "mysql:host=$host;port=$port;dbname=$db;charset=$charset";

try {
    $pdo = new PDO($dsn, $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, // выбрасывать исключения
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, // ассоциативные массивы по умолчанию
        PDO::ATTR_EMULATE_PREPARES => false, // использовать настоящие подготовленные запросы
    ]);
} catch (PDOException $e) {
    // Выводим подробную ошибку подключения (для разработки)
    die("Ошибка подключения к БД: " . $e->getMessage());
}