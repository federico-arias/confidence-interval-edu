var Histogram = require('./histogram');
var Guarism = require('./guarism');
var Lines = require('./lines');
var Graph = require('./graph');
//require = ('./meanLine.js');
//require = ('./meanPlot.js');

var GraphFactory = (function () {
 
  // Storage for our graph types
  var types = {};
 
  return {
      getGraph : function (type, config) {
          var Graph = types[type];
 
          return (Graph ? new Graph(config) : null);
      },
 
      registerGraph : function (type, Graph) {
          var proto = Graph.prototype;
 
          // only register classes that fulfill the vehicle contract
          if (proto._scales) {
              types[type] = Graph;
          }
 
          return GraphFactory;
      }
  };
})();

GraphFactory.registerGraph('Histogram', Histogram);
GraphFactory.registerGraph('Guarism', Guarism);

module.exports = GraphFactory;
