<?php
require_once 'db.php';

header('Content-Type: application/json'); // важно для AJAX

$response = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name  = trim($_POST['name']);
    $phone = trim($_POST['phone']);

    if ($name === '' || $phone === '') {
        $response['status'] = 'error';
        $response['message'] = 'Заполните все поля';
        echo json_encode($response);
        exit;
    }

    try {
        $stmt = $pdo->prepare(
            "INSERT INTO callbacks (name, phone) VALUES (:name, :phone)"
        );

        $stmt->execute([
            ':name' => $name,
            ':phone' => $phone
        ]);

        $response['status'] = 'success';
        $response['message'] = 'Спасибо! Ваша заявка отправлена.';

    } catch (PDOException $e) {
        $response['status'] = 'error';
        $response['message'] = 'Ошибка при сохранении данных';
    }

    echo json_encode($response);
    exit;
}