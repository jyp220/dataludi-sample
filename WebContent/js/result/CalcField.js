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
    var url = "http://helpme.emro.co.kr/repo/grid/resource/data/orders_s.csv";
    getInfo(url);
}

function getInfo(tUrl) {
    $.ajax({
        url: tUrl,
        dataType: 'text',
        success: function (data) {
            if(data) {
            	new DataLudi.DataLoader(dsMain).load("csv", data, {
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
	var fields =[
        "product_id",
        "product_name",
        "customer_id",
        "customer_name",
    	"country",
    	"phone",
    	"unit",
    	"currency",
        {
        	fieldName: "unit_price",
        	dataType: "number"
        }, {
        	fieldName: "quantity",
        	dataType: "number"
        }, {
        	fieldName: "order_date",
        	dataType: "datetime",
        	datetimeFormat: "yyyy-MM-dd"
        }, {
        	fieldName: "ship_date",
        	dataType: "datetime",
        	datetimeFormat: "iso"
        }
    ];
	
	var calcedFields = [
        {
            fieldName: "amount",
            dataType: "number",
            expression: "unit_price * quantity"
        }, {
            fieldName: "amount2",
            dataType: "number",
            callback: function (ds, fld, row, values) {
                return values[8] * values[9];
            }
        }
    ];
	
	dsMain = DataLudi.createGridDataSet();
    dsMain.setFields(fields, calcedFields);

    grdMain = DataLudi.createGridView('grdMain', [
        {
            "name": "ProductName",
            "fieldName": "product_name",
            "width": 200,
            "styles": {
            },
            "header": {
                "text": "ProductName"
            },
            "footer": {
                "spanNext": 4,
                "text": "SUM (expression, callback)",
                "styles": { 
                    "textAlignment": "far", 
                    "paddingRight": 12,
                    "fontItalic": true
                }
            }
        }, {
            "name": "Country",
            "fieldName": "country",
            "width": 100,
            "styles": {
            },
            "header": {
                "text": "Country"
            }
        }, {
            "name": "Currency",
            "fieldName": "currency",
            "width": 60,
            "styles": {
                "textAlignment": "center"
            },
            "header": {
                "text": "Currency"
            }
        }, {
            "name": "UnitPrice",
            "fieldName": "unit_price",
            "width": 70,
            "styles": {
                "numberFormat": "#,##0.00",
                "textAlignment": "far"
            },
            "header": {
                "text": "UnitPrice"
            }
        }, {
            "name": "Quantity",
            "fieldName": "quantity",
            "width": 70,
            "styles": {
                "numberFormat": "#,##0.00",
                "textAlignment": "far"
            },
            "header": {
                "text": "Quantity"
            }
        }, {
            "name": "Amount",
            "fieldName": "amount",
            "width": 111,
            "styles": {
                "background": "#1000ff88",
                "numberFormat": "#,##0.00",
                "textAlignment": "far"
            },
            "dynamicStyles": {
                "expression": "value > 10000",
                "styles": {
                    "color": "#00f",
                    "fontBold": true
                }
            },
            "header": {
                "text": "Amount"
            },
            "footer": {
                "expression": "sum",
                "styles": {
                    "background": "#2000ff88",
                    "color": "#000088",
                    "numberFormat": "#,##0.00"
                }
            }
        }
    ], true);

    grdMain.setDataSource(dsMain);
    grdMain.setOptions({
    	checkBar: false,
        header: {
            head: {
                popupMenu: {
                    label: 'DataLudi Version',
                    callback: function () { alert(DataLudi.getVersion()); }
                }
            }
        }
    });
    
    grdMain.loadStyles({
    	body: {
            rowDynamic: {
                expression: "numz tag > 0",
                styles: {
                    background: "#10ff0000"
                }
            }
        }
    });
}