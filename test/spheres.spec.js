var N = require('../src/scripts/spheres.js');
var svg, n;

describe('Spheres', function () {
    beforeEach(function () {
        svg = document.body.appendChild(document.createElement('svg'));
        svg.setAttribute('width', 1000);
        svg.setAttribute('height', 1000);
        svg.setAttribute('id', 'testing');
    });

	afterEach(function() {
		document.body.removeChild(svg);
	});

    it('should be tested properly', function () {
        expect(document.getElementById('testing').getAttribute('width')).toEqual('1000');
    });

    it('_should scale values', function () {
        var n = new N('testing', 170, 10, 10);
		n.sample = [1 , 2, 3, 4, 5, 6, 7, 8, 9, 10];
		n._scales(5);
    });
});
