function loadPrintData() {
    var dsList = [];
    var fldsList = [
        // data-01
        [{
            fieldName: "type"
        },{
            fieldName: "monthLastYear",
            dataType: "number"
        },{
            fieldName: "lastMonth",
            dataType: "number"
        },{
            fieldName: "managementGoal",
            dataType: "number"
        },{
            fieldName: "result",
            dataType: "number"
        },{
            fieldName: "targetRate",
            dataType: "number"
        },{
            fieldName: "lastMonthRate",
            dataType: "number"
        }, {
            fieldName: "note"
        }],

        // data-02
        [{
            fieldName: "type"
        },{
            fieldName: "lastMonth",
            dataType: "number"
        },{
            fieldName: "planQty",
            dataType: "number"
        },{
            fieldName: "sum",
            dataType: "number"
        },{
            fieldName: "week1",
            dataType: "number"
        },{
            fieldName: "week2",
            dataType: "number"
        },{
            fieldName: "week3",
            dataType: "number"
        }, {
            fieldName: "week4",
            dataType: "number"
        }, {
            fieldName: "week5",
            dataType: "number"
        }, {
            fieldName: "week6",
            dataType: "number"
        }],

        // data-03
        [{
            fieldName: "label"
        }, {
            fieldName: "monthName"
        },{
            fieldName: "runningRate",
            dataType: "number"
        },{
            fieldName: "sortedQty",
            dataType: "number"
        }, {
            fieldName: "target",
            dataType: "number"
        }],

        // data-04
        [{
            fieldName: "runningRate",
            dataType: "number"
        },{
            fieldName: "sortedQty",
            dataType: "number"
        },{
            fieldName: "target",
            dataType: "number"
        }, {
            fieldName: "week"
        }],

        // data-05
        [{
            fieldName: "date"
        },{
            fieldName: "workDegree"
        },{
            fieldName: "type"
        },{
            fieldName: "planPcs",
            dataType: "number"
        },{
            fieldName: "checkQty",
            dataType: "number"
        },{
            fieldName: "inspectionQty",
            dataType: "number"
        },{
            fieldName: "sortedQty",
            dataType: "number"
        }, {
            fieldName: "stockQty",
            dataType: "number"
        }, {
            fieldName: "calc",
            dataType: "number"
        }],

        // data-06
        [{
            fieldName: "label"
        },{
            fieldName: "date"
        },{
            fieldName: "sortedQty",
            dataType: "number"
        }],

        // data-07
        [{
            fieldName: "label"
        },{
            fieldName: "monthName"
        },{
            fieldName: "runningRate",
            dataType: "number"
        }],

        // data-08
        [{
            fieldName: "date"
        },{
            fieldName: "type"
        },{
            fieldName: "stdPsn",
            dataType: "number"
        },{
            fieldName: "checkPsn",
            dataType: "number"
        },{
            fieldName: "inspectionPsn",
            dataType: "number"
        },{
            fieldName: "sortedPsn",
            dataType: "number"
        }, {
            fieldName: "stockPsn",
            dataType: "number"
        }, {
            fieldName: "calc",
            dataType: "number"
        }],

        // data-09
        [{
            fieldName: "date"
        },{
            fieldName: "type"
        },{
            fieldName: "prePdtRate",
            dataType: "number"
        },{
            fieldName: "targetPdtRate",
            dataType: "number"
        },{
            fieldName: "retCheckValue",
            dataType: "number"
        },{
            fieldName: "retInspectionValue",
            dataType: "number"
        },{
            fieldName: "retSortedValue",
            dataType: "number"
        },{
            fieldName: "retStockValue",
            dataType: "number"
        },{
            fieldName: "retSumValue",
            dataType: "number"
        },{
            fieldName: "retCompareValue",
            dataType: "number"
        }, {
            fieldName: "targetCompareValue",
            dataType: "number"
        }],

        // data-10
        [{
            fieldName: "date"
        },{
            fieldName: "type"
        },{
            fieldName: "stdUnloadPsn",
            dataType: "number"
        },{
            fieldName: "stdLaborCost",
            dataType: "number"
        },{
            fieldName: "stdRentCost",
            dataType: "number"
        },{
            fieldName: "stdSumCost",
            dataType: "number"
        },{
            fieldName: "inspUnloadPsn",
            dataType: "number"
        },{
            fieldName: "inspLaborCost",
            dataType: "number"
        },{
            fieldName: "inspRentCost",
            dataType: "number"
        },{
            fieldName: "inspSumCost",
            dataType: "number"
        }, {
            fieldName: "targetRate",
            dataType: "number"
        }],

        // data-11
        [{
            fieldName: "date"
        },{
            fieldName: "workDegree"
        },{
            fieldName: "type"
        },{
            fieldName: "planPcs",
            dataType: "number"
        },{
            fieldName: "checkQty",
            dataType: "number"
        },{
            fieldName: "inspectionQty",
            dataType: "number"
        },{
            fieldName: "sortedQty",
            dataType: "number"
        },{
            fieldName: "stockQty",
            dataType: "number"
        }, {
            fieldName: "calc",
            dataType: "number"
        }],

        // data-12
        [{
            fieldName: "label"
        },{
            fieldName: "value",
            dataType: "number"
        }],

        // data-13
        [{
            fieldName: "comment"
        }]
    ];

    for (var i = 0; i < fldsList.length; i++) {
        var ds = DataLudi.createGridDataSet(fldsList[i]);
        ds.$_name = 'data_' + (i + 1);
        dsList.push(ds);

        // $.ajax({
        //     dataType: "json",
        //     url: "data/data-" + (i + 1) + ".json",
        //     async: false,
        //     success: function (data) {
        //         new DataLudi.DataLoader(ds).load("json", data);
        //     },
        //     error: function (req, status, err) {
        //         alert("jQuery getJSON() Failed: " + err);
        //     }

        // });
    }
    return dsList;
}
