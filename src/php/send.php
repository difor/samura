<?php
$from = 'no-reply@'.$_SERVER[ "HTTP_HOST" ];
$to = array(
	'fl.kiselev@ya.ru',
	'control.zayavok@yandex.ru',
	'anastasiya.booket@mail.ru',
	'admin@booket.wedding',
	'director@booket.wedding'
	);

error_reporting(0);
if ( $_SERVER[ "REQUEST_METHOD" ] == "POST")
{
	require_once( "phpmailer/class.phpmailer.php" );

	$errors = array();


	function CheckValue($value=array())
	{
		foreach ($value as $key => $val) {
			$req[$val] = addslashes( trim( $_REQUEST[ $val ] ) );
		}
		return $req;
	}
	



	$inputs = CheckValue(array(
		'cars',
		'menu',
		'name',
		'phone',
		'email',
		'reason', 
		'dontchange',
		'leaveblank',
		'utm_source',
		'utm_medium',
		'utm_campaign',
		'utm_content',
		'utm_term',
		'link_referrer',
		'geo_country',
		'geo_region', 
		'geo_city'
		));


	$use_checkbox = isset($_POST['use_checkbox'])?$_POST['use_checkbox']:'';
	if(isset($_POST['use_checkbox'])){
	    foreach ($_POST['use_checkbox'] as $key=>$value) echo "$value <br>";
	    $use_checkbox = implode(", ", $_POST['use_checkbox']);
	}


	$mail = new PHPMailer( true );
	$mail->CharSet = "UTF-8";
	$mail->AddReplyTo( $from );
	$mail->From = $from; 
	$mail->FromName = $_SERVER[ "HTTP_HOST" ]; 
	foreach($to as $to_add){
		$mail->AddAddress($to_add); 
	}
	$mail->Subject = "Письмо с сайта ".$_SERVER[ "HTTP_HOST" ];

	$mail->MsgHTML(
		"Причина: ".$inputs['reason']." <br>\r\n".
		"Заполнено: ".date( "d.m.y H:i" )."<br>\r\n".
		( strlen( $inputs['name'] ) > 0 ? "Имя: ".$inputs['name']." <br>\r\n" : "" ) . 
		( strlen( $inputs['phone'] ) > 0 ? "Телефон: ".$inputs['phone']." <br>\r\n" : "" ) . 
		( strlen( $inputs['email'] ) > 0 ? "E-mail: ".$inputs['email']." <br>\r\n" : "" ) .
		( strlen( $inputs['menu'] ) > 0 ? "Меню на человека: ".$inputs['menu']."  руб.<br>\r\n" : "" ) .
		( strlen( $inputs['cars'] ) > 0 ? "Количество машин: ".$inputs['cars']." <br>\r\n" : "" ) .
		( strlen( $use_checkbox ) > 0 ? "Дополнительно выбрали: $use_checkbox<br>\r\n" : "" ) . 


		( strlen( $inputs['maket'] ) > 0 ? "Тип макета: ".$inputs['maket']."<br>\r\n" : "" ) . 
		( strlen( $inputs['equipment'] ) > 0 ? "Комплектация макета: ".$inputs['equipment']."<br>\r\n" : "" ) . 

		( strlen( $inputs['size'] ) > 0 ? "Размер макета: ".$inputs['size']."<br>\r\n" : "" ) .  
		( strlen( $inputs['no-size'] ) > 0 ? "Размер макета: ".$inputs['no-size']."<br>\r\n" : "" ) .  

		( strlen( $inputs['scale'] ) > 0 ? "Масштаб: ".$inputs['scale']."<br>\r\n" : "" ) .  
		( strlen( $inputs['no-scale'] ) > 0 ? "Масштаб: ".$inputs['no-scale']."<br>\r\n" : "" ) .  


		"<br>Источник: ".$inputs['utm_source']."<br>\r\n" . 
		"Средство: ".$inputs['utm_medium']."<br>\r\n" . 
		"Название: ".$inputs['utm_campaign']."<br>\r\n" . 
		"Содержание: ".$inputs['utm_content']."<br>\r\n" . 
		"Ключевое слово: ".$inputs['utm_term']."<br>\r\n" . 
		"Перешел с: ".$inputs['link_referrer']."<br>\r\n" . 
		"Страна: ".$inputs['geo_country']."<br>\r\n" . 
		"Регион / Область: ".$inputs['geo_region']."<br>\r\n" .
		"Город: ".$inputs['geo_city']."<br>\r\n"
		);

	if (isset($_FILES['file'])  && $_FILES['file']['error'] == UPLOAD_ERR_OK) {
		$mail->AddAttachment($_FILES['file']['tmp_name'],
			$_FILES['file']['name']);
	}


	if ( !$mail->Send() )
		$errors[ "send" ] = true;

	echo json_encode( $errors );
}




?> 
