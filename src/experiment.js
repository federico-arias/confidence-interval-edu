import "babel-polyfill";
import * as d3 from "d3";
import * as Redux from "redux";
import * as Rx from "rx-lite";

var w = 800,
	h = 600,
	m = 20;

	var data = getData();

	var area = d3.svg.area()
	.x( d=>x(d[0]) )
.y0(h)
	.y1( d=>y(d[1]) );

	var line = d3.svg.line()
.x( d=>x(d[0]) )
	.y( d=>y(d[1]) );

	var svg = d3.select('body').append('svg')
	.attr('width', w + 2*m)
	.attr('height', h + 2*m);

	var defs = svg.append('defs');

	defs.append('pattern')
	.attr('id', 'pattern1')
	.attr({x: '1', y:'1', width:'10', height:'10', patternUnits:'userSpaceOnUse'})
	.append('circle')
	.attr({cx: '4', cy:'4', r:'2', fill:'green'});

	var infra = defs.append('mask').attr('id', 'infra').append('rect')
	.attr({id:'infra',x:0,y:0,width:w,height:h,fill:'white'});

	var g = svg.append('g')
	.attr('width', w)
	.attr('height', h)
	.attr('transform', 'translate(' + m + ',' + m + ')');

	var x = d3.scale.linear()
	.range([0, w])
	.domain(d3.extent(data, equis)); 

	var y = d3.scale.linear()
	.range([h, 0])
	.domain(d3.extent(data, griega));

	g.append('path')
	.datum(data)
	.attr('class', 'line')
	.attr('fill', 'none')
	.attr('d', line);

	g.append('path')
.datum(data)
	.attr('class', 'area')
	.attr('mask', 'url(#infra)')
	.attr('d', area);
	//.call( man.init() );



function equis(d) {
	return d[0];
}	

function griega(d) {
	return d[1];
}

function getData() {

	// loop to populate data array with 
	// probabily - quantile pairs
	var data = new Array();

	for (var i = -4000; ++i < 4000;) {
		var q = i/1000, // calc random draw from normal dist
			p = gaussian(q); // calc prob of rand draw

		var datum = [q, p];

		data.push(datum);
	};

	return data;
}

//taken from Jason Davies science library
// https://github.com/jasondavies/science.js/
function gaussian(x) {
	var gaussianConstant = 1 / Math.sqrt(2 * Math.PI),
	mean = 0,
	sigma = 1;

	x = (x - mean) / sigma;
	return gaussianConstant * Math.exp(-.5 * x * x) / sigma;
}

const CHANGE_INTERVAL = 'CHANGE_INTERVAL'; 

const changeInterval = (data) => {
	return {
		type:CHANGE_INTERVAL,
		data
	}
};

const interval = (state = {}, action) => {
	switch(action.type) {
		case CHANGE_INTERVAL:
		   	return {
				interval: action.data
			};
		default:
			return state;
	}
};

const store = Redux.createStore(interval);

const renderPlot = () => {
	const interval = store.getState().interval;

	d3.select('rect#infra')
		.transition()
		.attr('x', x(interval * -1))
		.attr('width',   x(interval) - x(interval * -1));
};

const renderGuarism = () => {

}

store.subscribe(renderPlot);

document.getElementById('interval')
	.addEventListener('change', (e) => {
		store.dispatch(changeInterval(e.target.value))
	}, false);


