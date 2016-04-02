var N = require('../src/scripts/animate.js');
var svg;

describe('an animated histogram of a normal distribution', function() {
	beforeEach(function() {
		svg = document.body.appendChild(document.createElement('svg'));
		svg.setAttribute('width', 600);
		svg.setAttribute('height', 600);
		svg.setAttribute('id', 'testing');
		
		n = new N('testing', 10);
	});

	it('should be tested properly', function() {
		expect(document.getElementById('testing').getAttribute('width')).toEqual('600');
	});

	it('should produce a normal distribution', function() {

	});
});
