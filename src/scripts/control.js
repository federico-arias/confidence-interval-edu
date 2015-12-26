var Control = function (elem) {
    this.elem = elem;
    this.onchange;
    //elem.addEventListener('drag', this.

};

Control.prototype.b = function (cb) {
    this.onchange();
};


module.exports = Control;
