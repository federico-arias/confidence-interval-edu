# Description

Set of classes to make an histogram and other graphs. 


```
var d3 = require('d3');
var Sampling = require('./sampling');
var GraphFactory = require('./graphfactory');

heights = new Sampling( d3.range(500).map( d3.random.normal(170, 10) ) );

//Array of graphs associated with the 
var graph = new Array();

//takes a DOM element to display the graph
var svg = document.getElementById('single');
var config = {elem:svg};
graph.push(GraphFactory.getGraph('Histogram', config));

//takes a DOM element to display the graph
var tSampleMean = document.getElementById('display-sample-mean');
var configG = {elem:tSampleMean, parameter:'mean'};
graph.push(GraphFactory.getGraph('Guarism', configG));

//takes a sample of size 80 and plots it to the graphs (histogram et al.)
var sample = heights.plotSample(80, graph, 'single');
```
