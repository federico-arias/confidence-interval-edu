var Graph = require('./graph');
var d3 = require('d3');

function Spheres(el, m, sd, n) {
	this.m = m; this.sd = sd;
	this.sample = d3.range(n).map( d3.random.normal(m, sd) );
	this.svg = document.getElementById(el);
	this.rect = this.svg.getBoundingClientRect();
}

Spheres.prototype._scales = function (margin) {
	this._scaleColor = d3.scale.threshold()
						.domain([this.m - this.sd, this.m + this.sd])
						.range(['black', 'green', 'black']);

    this.y = d3.scale.linear()
        .domain([0, this.sample.length])
        .range([this.rect.height - margin, margin]);    

    this.x = d3.scale.linear()
        .domain(d3.extent(this.sample))
        .range([margin, this.rect.width - margin]);
}

Spheres.prototype.plot = function (radius) {
	this._scales(2 * radius);
    var g = d3.select(this.svg).append('g').attr('class', 'hist');
    var c = g.selectAll('circle')
        .data(this.sample)

    c.enter().append('circle')
        .attr('r', radius)
        .attr('fill', (d, i) => {return this._scaleColor(d);})
        .attr('cy', (d,i) => {this.y(i)})
        .attr('cx', (d,i) => {this.x(i)})
		.attr('fill-opacity', 1e-6)
	  .transition()
		.duration(750)
		.attr('fill-opacity', 1);
}

module.exports = Spheres;
