<?php
	Class Database{
		private $charset='UTF8';
		public function __construct($host,$user,$pass,$db_name)
		{
				$Connect = mysql_connect($host,$user,$pass) or die(mysql_error());				
				mysql_query("SET NAMES " . $this->charset);
				mysql_select_db($db_name);			   
		}
		// function Insert
		public function Insert()
		{
				$insert = "INSERT INTO $this->Table ($this->Field) VALUES ($this->Value) ";
				return mysql_query($insert) or trigger_error(mysql_error().$insert);
		}
		// function Select
		public function Select1($Columns = "*")
		{
				$Select = "SELECT $Columns FROM $this->Table WHERE $this->Where LIMIT 1";
				$query = @mysql_query($Select);
				return @mysql_fetch_assoc($query);
		}
		public function Select($Columns = "*", $Orderby = "")
		{
			$data = array();
			if ($Columns == "") $Columns = "*";
			$Select = "SELECT $Columns FROM $this->Table WHERE $this->Where $Orderby";
			$result = mysql_query($Select) or trigger_error(mysql_error().$Select);
			if ($result)
			{
				while($row = mysql_fetch_assoc($result))
				{
					$data[] = $row;
				}
			}
			return $data;
		}
		public function RawSelect(&$count)
		{
			$data = array();
			$Select = "SELECT * FROM $this->Table WHERE $this->Where ";
			$result = mysql_query($Select) or trigger_error(mysql_error().$Select);
			$count = mysql_num_rows($result);
			//var_dump($count);
			return $result;
		}
		// function Update
		public function Update()
		{
				$update = "UPDATE $this->Table SET  $this->Set WHERE $this->Where ";
				return @mysql_query($update);
		}
		// function Delete
		public function Delete()
		{
				$delete = "DELETE FROM $this->Table WHERE $this->Where ";
				return @mysql_query($delete);
		}
		
		public function __destruct() {
				return @mysql_close($Connect);
		}
	}			

?>