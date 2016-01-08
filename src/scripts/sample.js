var d3 = require('d3');

function Sample (values) {
    this.values = values;
    this.n = values.length;
    this.name;
    this.mean = d3.mean(values);
    this.subscribers = new Array;
};

Sample.prototype.addGraph = function (aGraph) {
    (Array.isArray(aGraph)) ? 
    Array.prototype.push.apply(this.subscribers, aGraph):
    this.subscribers.push(aGraph);
    return this;
};

Sample.prototype.plot = function (width, index) {
    if (arguments.length < 1) {
        width = 800;
        index = 0;
    }

    this.subscribers.forEach(function(graph) {
        graph.plot(width, index, this.values, this);
    }, this);
};

Sample.prototype.update = function (values) {
    this.values = values;
    this.n = values.length;
    this.mean = d3.mean(values);
    console.log(this.subscribers);

    this.subscribers.forEach(function(graph) {
        graph.redraw(values, this);
    }, this);
};

module.exports = Sample;
