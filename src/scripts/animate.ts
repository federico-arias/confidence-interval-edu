var d3 = require('d3');

function Normal(id, n) {
	this.d= {};
	this.d.val = d3.range(n).map( d3.random.normal(170, 10) );
	this.extent = d3.extent(this.d.val);
	var s = document.getElementById(id);
	this.svg = {elem:s,
				rect:s.getBoundingClientRect()}
	this.g = d3.select(this.svg.elem).append('g').attr('class', 'histogram');
}

Normal.prototype._setScales = function() {
    var y = d3.scale.linear()
        .domain([0, this.d.val.length])
        .range([this.svg.rect.height,0]);    

    var x = d3.scale.linear()
        .domain([0, this.d.val.length])
        .range([rect.height,0]);    

	var c = d3.scale.threshold()
		.domain([170 - 20, 170 + 20])
		.range(['black','green','black']);
}

Normal.prototype.plot = function() {
	var c = this.g.selectAll('circle')
		.data(this.d.val);

    c.enter().append('circle')
        .attr('r', 9)
        .attr('fill', (d) => {return this.c(d)})
        .attr('cy', (d, i) => {return this.y(i)})
        .attr('cx', (d) => {return this.x(d)});
}


module.exports = Normal;
