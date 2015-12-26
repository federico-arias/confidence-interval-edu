var Sampling = require('../src/scripts/sampling');

describe('Sampling of many samples', function(){
    beforeEach(function(){
        measurements = new Sampling([1,2,2,3,4,5]);
        graph = jasmine.createSpyObj('Histogram',['elem','plot']);
    });

    it('takes a random sample', function() {
        var sample = measurements.plotSample(2, graph);
        expect(graph.plot).toHaveBeenCalled();
    });

    it('takes many samples', function() {
       measurements.plotSamples(2, graph, 4); 
       expect(measurements.samples.length).toEqual(4);
    });
});
