var d3 = require('d3');
var Sampling = require('./sampling');
var GraphFactory = require('./graphfactory');
var Control = require('./control');

heights = new Sampling( d3.range(500).map( d3.random.normal(170, 10) ) );

var graph = new Array();

var svg = document.getElementById('single');
var config = {elem:svg};
graph.push(GraphFactory.getGraph('Histogram', config));

var tSampleMean = document.getElementById('display-sample-mean');
var configG = {elem:tSampleMean, parameter:'mean'};
graph.push(GraphFactory.getGraph('Guarism', configG));

//takes a sample of size 80 and plots it to the graphs (histogram, etc)
var sample = heights.plotSample(80, graph, 'single');

var svg2 = document.getElementById('many');
var config = {elem:svg2};
var graphs = new Array;
graphs.push(GraphFactory.getGraph('Histogram', config));
var samples = heights.plotSamples(80, graphs, 20);

var buttonTakeSample = document.getElementById('take-sample');

buttonTakeSample.addEventListener('click', function(e) {
    heights.retakeSample('single', 80);
});

var slider = document.getElementById('slider-sample-size');
slider.addEventListener('change', function(e) {
    heights.retakeSample('single', e.target.value);
});
//var controlSampleSize = new Control(slider);
//controlSampleSize.onchange(function() {
//       heights.retakeSample(sample, this.value);
//       });
