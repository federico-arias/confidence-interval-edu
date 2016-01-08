var Graph = require('./graph');

function Lines(config) {
    Graph.call(this, config);
};

Lines.prototype.plot = function(data) {
    var root = d3.select(this.elem);
    var circle = root.selectAll('.meancircle')
                    .data(data);
    circle.enter()
        .append('circle')
        .attr('class', 'meancircle')
        .attr('y', function(d, i) {return i * 10})
        .attr('x', function(d) {return d * 10});
};

Lines.prototype = Object.create(Graph.prototype);
Lines.prototype.constructor = Lines;
