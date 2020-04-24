<?php

    $to = "harshsri2208@gmail.com";
    $subject = "test mesaage";
    $message = "This is a test message";
    $headers = "From: jirenbrolymui@gmail.com";

    if (mail($to, $subject, $message, $headers)) {
        echo "Mail sent successfully";
    }
    else {
        echo "Could not send mail";
    }

?>