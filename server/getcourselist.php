<?php
	include("autostart.php");
	//sleep(2);
	$db->Columns = "course_id, year, name, shortname, description, startdate, visible, enabled";
	$db->Table = "Course";
	$db->Where = "visible = 1";
	$result = $db->RawSelect($numr);
	$json = new mysql2json();
	$data = $json->getJSON($result, $numr);
	
	echo $data;
