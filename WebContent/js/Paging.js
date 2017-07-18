$(document).ready(function () {
    setTests("actions", "");
    // 반품자동화설비 운영현황
    initHelloGrid();
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
    	 helloGrid()
     }
};

function focusCell() {
	var index = grdMain.focusedIndex();
    index.rowIndex++;
    grdMain.setFocusedIndex(index, true);
}

function helloGrid() {
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
                	start:1
                });
            	grdMain.setPaging(true, 10, -1);
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

var loadHelloGridList = function (data) {
	dsMain.setRows(data);
};

function initHelloGrid() {
	dsMain = DataLudi.createGridDataSet([
        {
            fieldName: "product_id",
            dataType: "text"
        }, {
            fieldName: "product_name"
        }, {
            fieldName: "customer_id"
        }, {
        	fieldName: "customer_name"
        }, {
        	fieldName: "country"
        }, {
        	fieldName: "phone"
        }, {
        	fieldName: "unit"
        }, {
        	fieldName: "currency"
        }, {
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
            dataType: "datetime"
        }
    ]);

    grdMain = DataLudi.createGridView('grdMain', [{
        name: "ProductId",
        fieldName: "product_id",
        width: "90",
        styles: {
        	
        },
        header: {
            text: "제품코드"
        }
    }, {
    	name: "ProductName",
        fieldName: "product_name",
        width: "90",
        styles: {
        	
        },
        header: {
            text: "제품명"
        }
    }, {
    	name: "CustomerId",
        fieldName: "customer_id",
        width: "90",
        styles: {
        	
        },
        header: {
            text: "고객아이디"
        }
    }, {
    	name: "CustomerName",
        fieldName: "customer_name",
        width: "90",
        styles: {
        	
        },
        header: {
            text: "고객명"
        }
    }, {
    	name: "Country",
        fieldName: "country",
        width: "70",
        styles: {
        	
        },
        header: {
            text: "국가"
        }
    }, {
    	name: "Phone",
        fieldName: "phone",
        width: "100",
        styles: {
        	
        },
        header: {
            text: "전화번호"
        }
    }, {
    	name: "Unit",
        fieldName: "unit",
        width: "90",
        styles: {
        	
        },
        header: {
            text: "단위"
        }
    }, {
    	name: "Currency",
        fieldName: "currency",
        width: "60",
        styles: {
        	
        },
        header: {
            text: "통화"
        }
    }, {
    	name: "UnitPrice",
        fieldName: "unit_price",
        width: "100",
        styles: {
        	textAlignment: "far"
        },
        header: {
            text: "UnitPrice"
        },
        footer: {
        	styles: {
        		textAlignment: "far",
        		numberFormat: "0,000",
        		postfix: " $",
        		font: "Arial,12"
        	},
        	text: "SUM",
        	expression: "sum",
            dynamicStyles: [{
                "criteria": "value > 10000",
                "styles": "color=#ff0000"
            }]
        }
    }, {
    	name: "Quantity",
        fieldName: "quantity",
        width: "100",
        styles: {
        	textAlignment: "far"
        },
        header: {
            text: "Quantity"
        },
        footer: {
        	styles: {
        		textAlignment: "far",
        		numberFormat: "0,000",
        		postfix: " $",
        		font: "Arial,12"
        	},
        	text: "SUM",
        	expression: "sum",
            dynamicStyles: [{
                "criteria": "value > 10000",
                "styles": "color=#ff0000"
            }]
        }
    }, {
    	name: "OrderDate",
        fieldName: "order_date",
        width: "90",
        styles: {
        	datetimeFormat: "yyyy-MM-dd",
            textAlignment: "center"
        },
        header: {
            text: "발주일"
        }
    }, {
    	name: "ShipDate",
        fieldName: "ship_date",
        width: "120",
        styles: {
        	datetimeFormat: "yyyy-MM-dd hh:mm",
            textAlignment: "center"
        },
        header: {
            text: "선주일"
        }
    }], true);

    grdMain.setDataSource(dsMain);
    grdMain.setOptions({
        rowIndicator: {
            visible: false
        },
        checkBar: {
            visible: false
        },
        display: {
            selectStyle: DataLudi.SelectionStyle.ROWS
        }
    });
    grdMain.loadStyles({
        selection: {
            background: "#11000000",
            border: "#88000000,1"
        }
    });
    
    //paging
    var checkButtons = function () {
        var count = grdMain.pageCount();
        var page = grdMain.pageIndex();
        
        $('#btnFirst').prop('disabled', page <= 0);
        $('#btnPrev').prop('disabled', page <= 0);
        $('#btnNext').prop('disabled', page >= count - 1);
        $('#btnLast').prop('disabled', page >= count - 1);
    };
    grdMain.onPaged = function (grid, paged) {
        checkButtons();        
    };
    grdMain.onPageCountChanged = function (grid, newCount, oldCount) {
        checkButtons();        
    };
    grdMain.onPageIndexChanging = function (grid, newPage, page) {
    };
    grdMain.onPageIndexChanged = function (grid, newPage, oldPage) {
        $('#edtPage').val(newPage);
        checkButtons();        
        
        var rows = [];
        if (dsMain.rowCount() > 0) {
            while (rows.length < 5) {
                var r = parseInt(Math.random() * dsMain.rowCount());
                if (rows.indexOf(r) < 0) {
                    rows.push(r);
                }
            }
        }
        grid.setPageRows(rows);
    };
}

function btnFirst_click(ev) {
	var p = grdMain.pageIndex() * 10;
    grdMain.setPageAndRows(0, [p + 2, p + 4, p + 3, p + 5, p + 7]);
}
function btnLast_click(ev) {
	var p = grdMain.pageIndex() * 10;
    grdMain.setPageAndRows(grdMain.pageCount() - 1, [p + 2, p + 4, p + 9, p + 5, p + 7]);
}
function btnPrev_click(ev) {
	var p = grdMain.pageIndex() * 10;
    grdMain.setPageAndRows(grdMain.pageIndex() - 1, [p + 2, p + 4, p + 9, p + 5, p + 7]);
}
function btnNext_click(ev) {
	var p = grdMain.pageIndex() * 10;
    grdMain.setPageAndRows(grdMain.pageIndex() + 1, [p + 2, p + 4, p + 3, p + 5, p + 7]);
}