<?
$ID = $_POST["ID"];

$mailTo = "contest@eurodate.com";
$subject = "Christmas Tree: user sent account ID";
$body = "User sent ID = ".$ID;
$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=iso-8859-1\r\n";

/* дополнительные шапки */
$headers .= "From: Christmas Tree <contest@eurodate.com>\r\n";

if ($ID && mail($mailTo, $subject, $body, $headers))
{
	echo "MESSAGE_SENT";
}
?>