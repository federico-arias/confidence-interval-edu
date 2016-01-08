var d3 = require('d3');
var Sample = require('./sample.js');

function Sampling (population) {
    this.population = population;
    this.populationMean;
    this.samples = new Array;
    this.sample = {};
    this.confidenceLevel = 0.95;
    this.init();
};

Sampling.prototype = (function() {

    var Public = {};

    var _randomSample = function(p, size){
       var values = new Array;
       var rand =  Math.floor(Math.random() * p.length);
       var idx = new Array;
       var i;

       for (i=0;i<size;i++) {
           while(idx.indexOf(rand) != -1) {
            rand = Math.floor(Math.random() * p.length);
           }
           values.push(p[rand]); 
           idx.push(rand);
       }

       return values;
    };

    Public._drawSample = function(size) {
        //sample from population
        var values = _randomSample(this.population, size);
        var sample = new Sample(values);
        return sample;
    };

    Public.init = function() {
        this.populationMean = d3.mean(this.population);
    };

    Public.plotSample = function(size,graph, name) {
        var sample = this._drawSample(size).addGraph(graph);
            sample.plot();
        this.sample[name] = sample;
        return sample;
    };

    Public.plotSamples = function(size,graph,n) {
        for (var i=0;i<n;i++) {
            var sample = this._drawSample(size)
                             .addGraph(graph);
            this.samples.push(sample);
        }

        this.samples.forEach(function(sample, i) {
            sample.plot(180, i); //hardcoded width!
        });
    };

    Public.mean = function() {
        var sum = 0;
        this.samples.forEach(function(v,i) {
            sum += this[i].mean;
        });
        return sum/this.samples.length;
    };

    Public.retakeSample = function(name, n) {
        this.sample[name].update(_randomSample(this.population, n));
    };
    
    Public.n = function() {
        return this.samples.length;
    };

    Public.updateConfidence = function() {

    };

    return Public; 

})();  

module.exports = Sampling;

