<?php
  include util/dbauth.php;
  echo "Testing DB<br>";
  echo "$db_server:$db_user:$db_pass<br>";

  // Create connection
$conn = new mysqli($db_server, $db_user, $db_pass);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";
 ?>
