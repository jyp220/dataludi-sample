<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script type="text/javascript" src="../../lib/dataludi-eval-lic.js"></script>
<script type="text/javascript" src="../../lib/dataludi-eval.min.js"></script>
<script type="text/javascript" src="../../lib/dataludi-report.min.js"></script>
<script type="text/javascript" src="../../lib/domutils.js"></script>
<script type="text/javascript" src="../../lib/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="../../lib/jszip.min.js"></script>
<script type="text/javascript" src="../../lib/PrintData.js"></script>

<script type="text/javascript" src="../../js/result/Paging.js"></script>

<link rel="stylesheet" href="../../lib/style.css">
<title>Paging</title>
</head>
<body>
	<div class="wrap">
		<div id="actions" style="margin-bottom:4px"></div>
	    <div class="dot-title">Grid-1</div>
	    <div id="grdMain" style="height:220px;min-width:100px"></div>
	</div>
	
	<button type="button" id="btnFirst" onClick="btnFirst_click()">btnFirst</button>
	<button type="button" id="btnPrev" onClick="btnPrev_click()">btnPrev</button>
	<button type="button" id="btnNext" onClick="btnNext_click()">btnNext</button>
	<button type="button" id="btnLast" onClick="btnLast_click()">btnLast</button>
</body>
</html>