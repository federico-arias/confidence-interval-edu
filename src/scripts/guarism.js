var Graph = require('./graph');

var Guarism = function(config) {
    if (typeof config.parameter === 'undefined')
        throw new Error('The guarism object type requires a parameter as argument');
    Graph.call(this, config);
    this.parameter = config.parameter;
};

Guarism.prototype = Object.create(Graph.prototype);
Guarism.prototype.constructor = Guarism;

Guarism.prototype.plot = function(w,i, d, oSample) {
    this.elem.innerHTML = oSample[this.parameter].toFixed(2);
};

Guarism.prototype.redraw = function(v, oSample) {
    this.elem.innerHTML = oSample[this.parameter].toFixed(2);
};

module.exports = Guarism;
