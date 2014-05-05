<?php
/*
 * ALL Functions is here !!
 */

	// This function return null -or- nothing -or- empty String when $dat is undefined //
	function pinput($dat) {
		return (!empty($dat) ? mysql_real_escape_string($dat) : "");
	}

	function wisset($dat) {
		return (isset($dat) ? $dat : "");
	}