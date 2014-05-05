<?php
	include("autostart.php");
	$json = new mysql2json();
	//sleep(2);

	//$data = json_decode(file_get_contents("php://input"));
	if (isset($_GET['id']))
	{

		$courseid = $_GET['id'];
		$db->Columns = "s.stu_id, name, lname, birth, gender, year, faculty, branch, pic";
		$db->Table = "students s Left Join Student_Enroll_Detail sed on (s.stu_id = sed.stu_id)";
		$db->Where = "course_id = '".$courseid."'";
		$result = $db->RawSelect($numr);
		$data = $json->getJSON($result, $numr);
		
		echo $data;
	}
	else
	{
		echo "Error Missing courseid";
	}
