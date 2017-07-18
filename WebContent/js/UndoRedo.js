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
            	dsMain.setUndoable(true);
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
	dsMain = DataLudi.createGridDataSet([
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
    ]);

    grdMain = DataLudi.createGridView('grdMain', [
    	{
    		"name": "ProductName",
    		"fieldName": "product_name",
    		"width": 90,
    		"styles": {
    		},
    		"header": {
    			"text": "ProductName"
    		}
    	}, {
    		"name": "UnitPrice",
    		"fieldName": "unit_price",
    		"width": 50,
    		"styles": {
    		    "numberFormat": "#,##0.00",
    			"textAlignment": "far"
    		},
    		"header": {
    			"text": "UnitPrice"
    		},
    		"filters": [{
                "name": "High Price",
                "expression": "value > 800"
    		}, {
                "name": "Mid Price",
                "expression": "(value > 500) && (value <= 800)"
    		}, {
                "name": "Low Price",
                "expression": "value <= 500"
    		}]
    	}, {
    		"name": "Quantity",
    		"fieldName": "quantity",
    		"width": 50,
    		"styles": {
    			"textAlignment": "far"
    		},
    		"header": {
    			"text": "Quantity"
    		},
    		"footer": {
    		    "expression": "sum",
    		    "styles": {
    		        "fontName": "Arial",
    		        "fontBold": true,
    		        "numberFormat": "#,##0"
    		    }
    		}
    	}, {
    		"name": "Country",
    		"fieldName": "country",
    		"width": 70,
    		"styles": {
    		},
    		"header": {
    			"text": "Country"
    		}
    	}, {
    		"name": "Unit",
    		"fieldName": "unit",
    		"width": 60,
    		"styles": {
    		},
    		"header": {
    			"text": "Unit"
    		}
    	}, {
    		"name": "Currency",
    		"fieldName": "currency",
    		"width": "50",
    		"styles": {
    		    "textAlignment": "center"
    		},
    		"header": {
    			"text": "Currency"
    		}
    	}, {
    		"name": "CustomerName",
    		"fieldName": "customer_name",
    		"width": 80,
    		"styles": {
    		},
    		"header": {
    			"text": "CustomerName"
    		}
    	},  {
    		"name": "OrderDate",
    		"fieldName": "order_date",
    		"width": 90,
    		"styles": {
    		    "datetimeFormat": "yyyy-MM-dd",
    		    "textAlignment": "center"
    		},
    		"header": {
    			"text": "OrderDate"
    		}
    	},  {
    		"name": "ShipDate",
    		"fieldName": "ship_date",
    		"width": 90,
    		"styles": {
                "datetimeFormat": "yyyy-MM-dd",
                "textAlignment": "center"
    		},
    		"header": {
    			"text": "ShipDate"
    		}
        }
    ], true);

    grdMain.setDataSource(dsMain);
    grdMain.setOptions({
    	rowIndicator: {
            stateVisible: true
        },
        checkBar: true,
        header: {
            head: {
                popupMenu: {
                    label: 'DataLudi Version',
                    callback: function () { alert(DataLudi.getVersion()); }
                }
            }
        },
        vscrollBar: {
            barWidth: 12
        },
        hscrollBar: {
            barWidth: 12
        },
        edit: {
            insertable: true,
            appendable: true,
            deletable: true,
            erasable: true
        }
    });
    grdMain.setUndoable(true);
    
    grdMain.loadStyles({
    	selection: {
            background: "#11000000",
            border: "#88000000,1"
        }
    });
    
    dsMain.setUndoable(true);
    grdMain.setUndoable(true);
    grdMain.editOptions().setErasable(true);
    grdMain.setFocus();
}

function btnUndo_click() {
	grdMain.undo();
    grdMain.setFocus();
}

function btnRedo_click() {
	grdMain.redo();
    grdMain.setFocus();
}