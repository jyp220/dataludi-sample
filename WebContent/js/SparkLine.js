$(document).ready(function () {
    setTests("actions", "");
    // 반품자동화설비 운영현황
    initLoadGrid();
});

function setTests(container, title) {
    if (title) document.title = "Report " + title;
    createButtons(container, setButtons);
}

var grdMain;
var dsMain;

var grdMain2;
var dsMain2;

var setButtons = {
	 back: function() {
    	 javascript:history.back();
     },
     search: function() {
    	 loadData()
     }
};

function loadData() {
    var url = "http://helpme.emro.co.kr/repo/grid/resource/data/eco_growth_rate.csv";
    getInfo(url);
}

function getInfo(tUrl) {
    $.ajax({
        url: tUrl,
        dataType: 'text',
        success: function (data) {
            if(data) {
            } else {
                alert('data is empty');
            }
        }.bind(this),
        error: function (xhr, status, error) {
            var err = status + ', ' + error;
            throw "jQuery Failed: " + err;
        }
    });
}

function initLoadGrid() {
	
}