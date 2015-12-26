var d3 = require('d3');
var Graph = require('./graph');

if (!Function.prototype.bind) {
  Function.prototype.bind = function(oThis) {
    if (typeof this !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }

    var aArgs   = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP    = function() {},
        fBound  = function() {
          return fToBind.apply(this instanceof fNOP
                 ? this
                 : oThis,
                 aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    if (this.prototype) {
      // native functions don't have a prototype
      fNOP.prototype = this.prototype; 
    }
    fBound.prototype = new fNOP();

    return fBound;
  };
}

function Histogram(config) {
    this.svg = config.elem;
    this.index;
    this.selection;
    this.rect = {};
    this.bar;
    this.group;
    Graph.call(this, config);
};

Histogram.prototype = Object.create(Graph.prototype);
Histogram.prototype.constructor = Histogram;


Histogram.prototype._setHeight= function (data) {
    return this.rect.h - this.scaleY(data.y);
};

Histogram.prototype._positionGroup = function (data) {
    return "translate(" + this.scaleX(data.x)
        + "," + this.scaleY(data.y) + ")" ;
};

Histogram.prototype.plot = function (w, index, data) {
    var self = this;
    var rect = this._getRect(index, w, this.svg.getBoundingClientRect().width);
    this.rect = rect;
    this.index = index;
    this._scales(rect.w, rect.h, data);
    var selection = d3.select(this.svg);

    var g = selection.append('g')
                .attr('transform', 'translate(' + rect.x + ',' + rect.y + ')')
                .attr('id', index.toString());

    var bar = g.selectAll(".bar")
        .data(self.histogram)
      .enter().append("g")
        .attr("class", "bar")
        .attr("transform", this._positionGroup.bind(this) );


    this.bar = bar.append("rect")
        .attr("x", 1)
        .attr("width", this._setWidth.bind(this) )
        .attr("height", this._setHeight.bind(this) );


    this.group = g;
};

Histogram.prototype.redraw = function (newData) {
    this._scales(this.rect.w, this.rect.h, newData);
    var g = this.group.selectAll('.bar')
        .data(this.histogram)

    g.exit()
        .remove();

    g.transition()
        .attr('transform', this._positionGroup.bind(this));


    g.enter()
        .append("g")
        .attr("class", "bar")
        .attr("transform", this._positionGroup.bind(this) )
        .append("rect")
            .attr("x", 1)
            .attr( "width", this._setWidth.bind(this) )
            .attr('height', 0)
            .transition()
                .attr( "height", this._setHeight.bind(this) );

    g.select('rect')
        .transition()
        .attr( "width", this._setWidth.bind(this) )
        .attr('height', this._setHeight.bind(this) );
};

Histogram.prototype._setWidth = function (d) {
    return this.dX(this.histogram[0].dx) - 1
};

Histogram.prototype._getRect = function (i, w, W) {
        var totalCols = Math.floor(W/w);
        var m = (W -(w * totalCols))/(totalCols + 1);
        var col = i % totalCols;
        var row = Math.floor(i / totalCols);
        var h = ((3 * w / 4) + 2 * m)

        var rect = {
            x:(m * (col + 1) + w * col),
            y:(m * (row + 1) + h * row),
            w:w,
            h: h
        };

        return rect;
    };



module.exports = Histogram;
