var $ = require('jquery');
var GraphFactory = require('../src/scripts/graphfactory.js');
var Histogram = require('../src/scripts/histogram.js');


describe("An histogram graph type", function() {

    beforeEach(function() {
        single = $("<svg id='single' width='800px' viewport='0 0 800 600'></svg>").appendTo('body')[0];
        config = {elem:single};
        histogram = GraphFactory.getGraph('Histogram', config);
    });

    afterEach(function() {
        $('svg').remove();
    });


    it("calculates the position to plot given width and index", function() {
        var rect = histogram._getRect(1, 300, 810); 
        expect(rect.x).toEqual(440);
    });

    it("scales the values based on width and height", function(){
        histogram._scales(100, 100, [1,1,1,2,3,4,5,20]);
        expect(histogram.scaleX(20)).toEqual(100);
        expect(histogram.scaleY(3)).toEqual(0);
        expect(histogram.dX(19)).toEqual(100);
    });

    it("plots a histogram", function() {
        histogram.plot(200, 1, [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]); 
        expect(document.getElementById('1')).not.toBe(null);
    });

    it("redraws an histogram", function() {
        histogram.plot(300, 1, [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]); 
        var before = histogram.group[0][2].getAttribute('transform');
        histogram.redraw([1,4,4,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]); 
        var after = histogram.group[0][2].getAttribute('transform');
        console.log(before, after);
        expect(after).toEqual(before);
    });

});

