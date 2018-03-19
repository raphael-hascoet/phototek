<?php

include "model.php";

$db = connectionDB();

print_r(getIdPhotosAll($db));

echo "ca marche";
?>
