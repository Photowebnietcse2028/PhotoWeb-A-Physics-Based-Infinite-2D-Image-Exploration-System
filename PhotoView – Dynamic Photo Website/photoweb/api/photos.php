<?php
$q = $_GET['q'] ?? "nature";

// Secondary Backend Safety Filter
$blocked = ["adult", "porn", "sex", "nsfw", "xxx", "nude", "erotic"];
foreach($blocked as $word) {
    if (strpos(strtolower($q), $word) !== false) {
        echo json_encode(["photos" => []]);
        exit;
    }
}

// ⚠️ IMPORTANT: Replace this with your actual Pexels API Key
$apiKey = "s0twysQayUh5J8GBew0MBth9e2hNtJ43xM2TdPM1tLxhPYmGTpHdXUjn";

if ($apiKey === "YOUR_API_KEY") {
    http_response_code(500);
    echo json_encode(["error" => "API Key not configured in api/photos.php"]);
    exit;
}

$url = "https://api.pexels.com/v1/search?query=" . urlencode($q) . "&per_page=40";

$options = [
 "http" => [
   "header" => "Authorization: $apiKey",
   "ignore_errors" => true // Allow us to see Pexels' error messages
 ]
];

$context = stream_context_create($options);
$res = @file_get_contents($url, false, $context);

if ($res === false) {
    http_response_code(500);
    echo json_encode(["error" => "Failed to connect to Pexels API. Check server internet or PHP allow_url_fopen."]);
    exit;
}

header('Content-Type: application/json');
echo $res;
?>
