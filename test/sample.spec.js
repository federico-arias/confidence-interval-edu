var Sample  = require('../src/scripts/sample');
var sample;

describe('A sample', function() {

    beforeEach(function() {
        sample = new Sample([1,2,3,4]);
    });

    it('Adds a graph', function() {
        var graph = jasmine.createSpyObj('Histogram', ['elem']);
        sample.addGraph(graph);
        expect(sample.subscribers.length).toEqual(1);
    }); 

    it('plots a graph', function() {
        var graph = jasmine.createSpyObj('Histogram', ['elem', 'plot']);
        sample.addGraph(graph);
        sample.plot();
        expect(graph.plot).toHaveBeenCalledWith(800,0,[1,2,3,4], sample);
    });
});
