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

var setButtons = {
	 back: function() {
    	 javascript:history.back();
     },
     search: function() {
    	 loadData()
     }
};

function loadData() {
    var url = "http://helpme.emro.co.kr/repo/grid/resource/data/enrollment_tertiary_edu.csv";
    getInfo(url);
}

function getInfo(tUrl) {
    $.ajax({
        url: tUrl,
        dataType: 'text',
        success: function (data) {
            if(data) {
            	new DataLudi.DataLoader(dsMain).load("csv", data, {
            		delimiter: ';',
                    start: 1
                });
            	$("#rowCount").css("color", "blue").text(dsMain.rowCount().toLocaleString());
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
	var fields;
	dsMain = DataLudi.createGridDataSet([{
        fieldName: "area",
        header: "Area"
    }, {
        fieldName: "subgroup",
        header: "Subgroup"
    }, {
        fieldName: "year",
        dataType: "number",
        header: "Year"
    }, {
        fieldName: "source",
        header: "Source"
    }, {
        fieldName: "unit",
        header: "Unit"
    }, {
        fieldName: "value",
        dataType: "number",
        header: "Value"
    }]);

    grdMain = DataLudi.createGridView('grdMain', [{
        fieldName: "area",
        width: 40
    }, {
        fieldName: "subgroup",
        width: 50,
        header: "Gender",
        styles: {
            textAlignment: "center"
        }
    }, {
        fieldName: "year",
        width: 40,
        styles: {
            textAlignment: "center"
        }
    }, {
        fieldName: "source",
        width: 55
    }, {
        fieldName: "unit",
        width: 35,
        styles: {
            textAlignment: "center"
        }
    }, {
        fieldName: "value",
        width: 50,
        styles: {
            textAlignment: "far",
            numberFormat: "#,##0"
        }
    }, {
        type: "chart",
        fieldNames: "subgroup,year,value",
        width: 370,
        header: "Chart",
        mergeExpression: "values['area']",
        chart: {
            type: "column",
            legend: {
                visible: true,
                styles: {
                    /*border: "#800"*/
                }
            },
            xAxes: {
                padding: 0.1,
                styles: {
                    line: "#333"
                },
                tickStyles: {
                    line: "#333"
                }
            },
            yAxes: {
                indicators: [{
                    type: "line",
                    front: true,
                    series: "serFemale",
                    value: "avg",
                    label: "Average:${value}",
                    styles: {
                        line: "#600000ff,1px,dotted",
                        color: "#e00000ff",
                        fontSize: 10,
                        fontBold: true,
                        textAlignment: "far",
                        numberFormat: "#,##0"
                    }
                }, {
                    type: "line",
                    front: true,
                    series: "serMale",
                    value: "avg",
                    label: "Average:${value}",
                    styles: {
                        line: "#60ff0000,1px,dashed",
                        color: "#e0800000",
                        fontSize: 10,
                        fontBold: true,
                        textAlignment: "near",
                        numberFormat: "#,##0"
                    }
                }]
            },
            series: [{
                name: "serFemale",
                caption: "Female",
                filter: "values['subgroup'] == 'Female'",
                labelField: "year",
                valueField: "value",
                summaryMode: "aggregate",
                labelLocation: "none",
                styles: {
                    background: "#AFD8F8"
                }
            }, {
                name: "serMale",
                caption: "Male",
                filter: "values['subgroup'] == 'Male'",
                labelField: "year",
                valueField: "value",
                summaryMode: "aggregate",
                styles: {
                    background: "#F6BD0F"
                }
            }]
        }
    }], true);

    grdMain.setDataSource(dsMain);
    grdMain.setOptions({
    	footer: {
            visible: true
        },
        stateBar: {
            visible: true
        },
        checkBar: {
            /*width: 50*/
        },
        header: {
        },
        display: {
        },
        operate: {
            sortHandleVisibility: "hidden"
        },
        edit: {
            deletable: true
        },
        autoFill: {
            enabled: true
        }
    });
    
    grdMain.header().head().setPopupMenu({
        label: 'DataLudi Grid Version',
        callback: function () { alert(DataLudi.getVersion()); }
    });
    
    grdMain.loadStyles({
    	selection: {
            background: "#11000000",
            border: "#88000000,1"
        }
    });
    
    grdMain.loadPalettes([{
        name: "pal01",
        fills: ["#ffe17F", "#97CBE7", "#074868", "#B0D67A", "#2C560A", "#DD9D82", "#578Ba7"]
    }, {
        name: "pal02",
        fills: ["#ffcccccc", "#ffaaaaaa", "#ff999999", "#ff777777", "#ff555555", "#ff333333", "#ff111111"]
    }, {
        name: "pal03",
        fills: ["#100000ff", "#200000ff", "#300000ff"]
    }]);
    grdMain.groupBy(['area']);
}