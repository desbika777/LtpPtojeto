<?php
// Simple router (optional)
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$path = rtrim($path, '/');

switch ($path) {
    case '':
    case '/':
    case '/index':
        require __DIR__ . '/index.php';
        break;
    case '/dashboard':
        require __DIR__ . '/dashboard.php';
        break;
    default:
        http_response_code(404);
        echo '404 Not Found';
}
