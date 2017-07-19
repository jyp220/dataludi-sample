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

function focusCell() {
	var index = grdMain.focusedIndex();
    index.rowIndex++;
    grdMain.setFocusedIndex(index, true);
}

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
            	new DataLudi.DataLoader(dsMain).load("csv", data, {
                	start:3
                });
            	var rows = dsMain.getRows();
                dsMain2.setRows(rows);
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
	dsMain = DataLudi.createGridDataSet(fields = [{
        fieldName: "continent",
        dataType: "text"
    }, {
        fieldName: "country",
        dataType: "text"
    }, {
        fieldName: "2000",
        dataType: "number"
    }, {
        fieldName: "2001",
        dataType: "number"
    }, {
        fieldName: "2002",
        dataType: "number"
    }, {
        fieldName: "2003",
        dataType: "number"
    }, {
        fieldName: "2004",
        dataType: "number"
    }, {
        fieldName: "2005",
        dataType: "number"
    }, {
        fieldName: "2006",
        dataType: "number"
    }, {
        fieldName: "2007",
        dataType: "number"
    }, {
        fieldName: "2008",
        dataType: "number"
    }, {
        fieldName: "2009",
        dataType: "number"
    }, {
        fieldName: "2010",
        dataType: "number"
    }]);
    dsMain2 = new DataLudi.createGridDataSet(fields);
    
    dsMain.onRowCountChanged = function (ds) {
        var count = ds.rowCount();
        $("#rowCount").css("color", "green").text(count.toLocaleString());
    };
    dsMain2.onRowCountChanged = function (ds) {
        var count = ds.rowCount();
        $("#rowCount2").css("color", "green").text(count.toLocaleString());
    };

    grdMain = DataLudi.createGridView('grdMain', [{
        fieldName: "continent",
        width: 70,
        styles: { textAlignment: "near" },
        header: { text: "continent" }
    }, {
        name: "colSeries1",
        type: "series",
        fieldNames: "2000..2010",
        width: 100,
        renderer: {
            type: "sparkColumn",
            highColor: "#ff0088ff",
            lowColor: "#ffff0000"
        },
        header: { text: "Spark Column" },
        styles: {
            shapeColor: "#ffbbbbbb",
            paddingLeft: 4,
            paddingRight: 4,
            paddingTop: 4,
            paddingBottom: 4
        }
    }, {
        name: "colSeries2",
        type: "series",
        fieldNames: "2000..2010",
        width: 100,
        renderer: {
            type: "sparkColumn",
            barWidth: 0.5,
            highColor: "#ff00ff00",
            lowColor: "#ffff0000",
        },
        header: { text: "Spark Column" },
        styles: {
            background: "#000",
            shapeColor: "#ccc",
            paddingLeft: 4,
            paddingRight: 4,
            paddingTop: 4,
            paddingBottom: 4
        }
    }, {
        name: "colSeries3",
        type: "series",
        fieldNames: "2000..2010",
        width: 100,
        renderer: {
            type: "sparkColumn",
            barWidth: 0.3,
            highColor: "#ff008800",
            lowColor: "#ffff0000",
        },
        header: { text: "Spark Column" },
        styles: {
            shapeColor: "#ff000088",
            paddingLeft: 4,
            paddingRight: 4,
            paddingTop: 4,
            paddingBottom: 4
        }
    }, {
        fieldName: "country",
        width: 80,
        styles: { textAlignment: "near" },
        header: { text: "Country" }
    }, {
        fieldName: "2000",
        width: 50,
        styles: { textAlignment: "far" },
        header: { text: "2000" }
    }, {
        fieldName: "2001",
        width: 50,
        styles: { textAlignment: "far" },
        header: { text: "2001" }
    }, {
        fieldName: "2002",
        width: 50,
        styles: { textAlignment: "far" },
        header: { text: "2002" }
    }, {
        fieldName: "2003",
        width: 50,
        styles: { textAlignment: "far" },
        header: { text: "2003" }
    }, {
        fieldName: "2004",
        width: 50,
        styles: { textAlignment: "far" },
        header: { text: "2004" }
    }, {
        fieldName: "2005",
        width: 50,
        styles: { textAlignment: "far" },
        header: { text: "2005" }
    }, {
        fieldName: "2006",
        width: 50,
        styles: { textAlignment: "far" },
        header: { text: "2006" }
    }, {
        fieldName: "2007",
        width: 50,
        styles: { textAlignment: "far" },
        header: { text: "2007" }
    }, {
        fieldName: "2008",
        width: 50,
        styles: { textAlignment: "far" },
        header: { text: "2008" }
    }, {
        fieldName: "2009",
        width: 50,
        styles: { textAlignment: "far" },
        header: { text: "2009" }
    }, {
        fieldName: "2010",
        width: 50,
        styles: { textAlignment: "far" },
        header: { text: "2010" }
    }], true);

    grdMain.setDataSource(dsMain);
    grdMain.setOptions({
    	checkBar: false,
        rowIndicator: {
            stateVisible: false
        },
        header: {
            head: {
                popupMenu: {
                    label: 'DataLudi Version',
                    callback: function () { alert(DataLudi.getVersion()); }
                }
            }
        },
        display: {
            rowHeight: 27
        }
    });
    grdMain.loadStyles({
        body: {
            cellDynamic: {
                expression: 'rowtag == field',
                styles: {
                    background: '#100000ff',
                    fontBold: true
                }
            },
            updated: {
                background: undefined    
            }
        }
    });
    
    
    
    
    grdMain2 = DataLudi.createGridView('grdMain2', [{
        fieldName: "continent",
        width: 70,
        styles: { textAlignment: "near" },
        header: { text: "continent" }
    }, {
        name: "colSeries1",
        type: "series",
        fieldNames: "2000..2010",
        width: 100,
        renderer: {
            type: "sparkLine",
            lineColor: "#40ff0000",
            highColor: "#ff008800",
            lowColor: "#ffff0000",
            lastColor: "#ff888888"
        },
        header: { text: "Spark Line" },
        styles: {
            shapeColor: "#ff000088",
            paddingLeft: 4,
            paddingRight: 4,
            paddingTop: 4,
            paddingBottom: 4
        }
    }, {
        name: "colSeries2",
        type: "series",
        fieldNames: "2000..2010",
        width: 100,
        renderer: {
            type: "sparkLine",
            highColor: "#ff008800",
            lowColor: "#ffff0000",
            lastColor: "#ff888888"
        },
        header: { text: "Spark Line" },
        styles: {
            shapeColor: "#ff000088",
            paddingLeft: 4,
            paddingRight: 4,
            paddingTop: 4,
            paddingBottom: 4
        }
    }, {
        name: "colSeries3",
        type: "series",
        fieldNames: "2000..2010",
        width: 100,
        renderer: {
            type: "sparkLine",
            lineColor: "#fff",
            highColor: "#0f0",
            lowColor: "#f00",
            lastColor: "#fff"
        },
        header: { text: "Spark Line" },
        styles: {
            background: "#000",
            shapeColor: "#ff000088",
            paddingLeft: 4,
            paddingRight: 4,
            paddingTop: 4,
            paddingBottom: 4
        }
    }, {
        fieldName: "country",
        width: 80,
        styles: { textAlignment: "near" },
        header: { text: "Country" }
    }, {
        fieldName: "2000",
        width: 50,
        styles: { textAlignment: "far" },
        header: { text: "2000" }
    }, {
        fieldName: "2001",
        width: 50,
        styles: { textAlignment: "far" },
        header: { text: "2001" }
    }, {
        fieldName: "2002",
        width: 50,
        styles: { textAlignment: "far" },
        header: { text: "2002" }
    }, {
        fieldName: "2003",
        width: 50,
        styles: { textAlignment: "far" },
        header: { text: "2003" }
    }, {
        fieldName: "2004",
        width: 50,
        styles: { textAlignment: "far" },
        header: { text: "2004" }
    }, {
        fieldName: "2005",
        width: 50,
        styles: { textAlignment: "far" },
        header: { text: "2005" }
    }, {
        fieldName: "2006",
        width: 50,
        styles: { textAlignment: "far" },
        header: { text: "2006" }
    }, {
        fieldName: "2007",
        width: 50,
        styles: { textAlignment: "far" },
        header: { text: "2007" }
    }, {
        fieldName: "2008",
        width: 50,
        styles: { textAlignment: "far" },
        header: { text: "2008" }
    }, {
        fieldName: "2009",
        width: 50,
        styles: { textAlignment: "far" },
        header: { text: "2009" }
    }, {
        fieldName: "2010",
        width: 50,
        styles: { textAlignment: "far" },
        header: { text: "2010" }
    }], true);
    
    grdMain2.setDataSource(dsMain2);
    grdMain2.setOptions({
    	checkBar: false,
        rowIndicator: {
            stateVisible: false
        },
        header: {
            head: {
                popupMenu: {
                    label: 'DataLudi Version',
                    callback: function () { alert(DataLudi.getVersion()); }
                }
            }
        },
        display: {
            rowHeight: 27
        }
    });
    grdMain2.loadStyles({
    	body: {
            updated: {
                background: undefined    
            }
        }
    });
}