var Graph = function(config) {
    this.elem = config.elem;
    this.index;
}

Graph.prototype._scales = function (w,h, data) {
    var self = this;
    var extent = d3.extent(data);

    this.scaleX = d3.scale.linear()
        .domain([extent[0], extent[1]]) 
        .range([0, w]);

    this.dX = d3.scale.linear()
        .domain([0, extent[1] - extent[0]])
        .range([0, w]);

    this.histogram = d3.layout.histogram()
        .bins(self.scaleX.ticks(20))
        (data);

    this.scaleY = d3.scale.linear()
        .domain([0, d3.max(self.histogram, function (d) { return d.y; })])
        .range([h, 0]);
};

module.exports = Graph;
