var d3 = require('d3');

var values = d3.range(500).map( d3.random.normal(170, 10) );
var extent = d3.extent(values);
var radius = 5;
var nPoints = svg.getBoundingClientRect().width / (2 * radius + margin);
var interval = (extent[0] - extent[1]) / nPoints;

var toHistogram = function (data) {
    var rData = data.map(function(v, i, window) {
        rObj = {};
        rObj.x = v;
        rObj.y = Math.floor((v - extent[0])/interval);
        return rObj;
    });
    
    return rData;
};
