<?php
	include("autostart.php");
	$json = new mysql2json();
	//sleep(2);

	//$data = json_decode(file_get_contents("php://input"));
	if (isset($_GET['id']))
	{
		$courseid = $_GET['id'];
		$db->Columns = "course_id, year, name, shortname, description, startdate, visible, enabled";
		$db->Table = "Course";
		$db->Where = "course_id = '".$courseid."'";
		$result = $db->RawSelect($numr);
		$data = $json->getJSON($result, $numr);
		
		echo $data;
	}
	else
	{
		echo "Error Missing courseid";
	}
