<?php

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: index.html");
    exit;
}

$to = "Dr.Rajini.Muthineni@gmail.com";

$formType = isset($_POST["form_type"])
    ? trim($_POST["form_type"])
    : "contact";

$name = isset($_POST["full_name"])
    ? trim($_POST["full_name"])
    : "";

$email = isset($_POST["email"])
    ? trim($_POST["email"])
    : "";

$phone = isset($_POST["phone"])
    ? trim($_POST["phone"])
    : "";

$message = isset($_POST["message"])
    ? trim($_POST["message"])
    : "";

$preferredDate = isset($_POST["preferred_date"])
    ? trim($_POST["preferred_date"])
    : "";

$service = isset($_POST["service"])
    ? trim($_POST["service"])
    : "";


/* -----------------------------------------
   VALIDATION
------------------------------------------ */

if (
    empty($name) ||
    empty($email) ||
    empty($phone)
) {
    die("Please fill all required fields.");
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    die("Please enter a valid email address.");
}


/* -----------------------------------------
   APPOINTMENT
------------------------------------------ */

if ($formType === "appointment") {

    $subject =
        "New Appointment Request - " . $name;

    $emailBody =
        "NEW APPOINTMENT REQUEST\n\n" .
        "Full Name: " . $name . "\n" .
        "Email: " . $email . "\n" .
        "Phone: " . $phone . "\n" .
        "Preferred Date: " . $preferredDate . "\n" .
        "Service: " . $service . "\n\n" .
        "Message:\n" . $message;

}


/* -----------------------------------------
   CONTACT
------------------------------------------ */

else {

    $subject =
        "New Contact Message - " . $name;

    $emailBody =
        "NEW CONTACT FORM MESSAGE\n\n" .
        "Full Name: " . $name . "\n" .
        "Email: " . $email . "\n" .
        "Phone: " . $phone . "\n\n" .
        "Message:\n" . $message;

}


/* -----------------------------------------
   EMAIL HEADERS
------------------------------------------ */

$headers = [];

$headers[] = "From: Website <noreply@" . $_SERVER["SERVER_NAME"] . ">";

$headers[] = "Reply-To: " . $email;

$headers[] = "Content-Type: text/plain; charset=UTF-8";


/* -----------------------------------------
   SEND
------------------------------------------ */

$sent = mail(
    $to,
    $subject,
    $emailBody,
    implode("\r\n", $headers)
);


/* -----------------------------------------
   REDIRECT
------------------------------------------ */

if ($sent) {

    if ($formType === "appointment") {

        header(
            "Location: appointment.html?status=success"
        );

    } else {

        header(
            "Location: contact.html?status=success"
        );

    }

    exit;
}


/* FAILED */

if ($formType === "appointment") {

    header(
        "Location: appointment.html?status=error"
    );

} else {

    header(
        "Location: contact.html?status=error"
    );

}

exit;
?>