var Control = function (elem, min, max, initialValue) {
    var r = elem.getBoundingClientRect();
    this.elem = elem;
    this.onchange = function(){};
    this.range = {};
    this.range.min = min;
    this.range.max = max;
    this.elemCenter = {};
    this.elemCenter.x = r.left + r.width / 2;
    //this.elemCenter.y = r.top + r.height/ 2;
    this.isPressed = false;
    this.mouse = {};
    this.domain;
    this.value = initialValue;
    this.elem.addEventListener('click', this.init.bind(this), false);
};

Control.prototype.init = function (e) {
    if (!this.isPressed) {
        var browserW = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        var rightOffset = browserW - this.elemCenter.x;
        this.domain = rightOffset > this.elemCenter.x ?
            rightOffset
            :this.elemCenter.x; 
        this.mouse.initX = e.clientX;
        this.mouse.initY = e.clientY;
        this.isPressed = true;
        document.addEventListener('mousemove', this.mousemove, false);
        document.addEventListener('mouseup', this.release, false);
        document.body.className = 'cursor';
    }
};

Control.prototype.release = function(e) {
    this.isPressed = false;
    document.removeEventListener('mousemove');
    document.removeEventListener('mouseup');
    document.body.className = '';
    this.onchange(this.value);
};

Control.prototype.mousemove = function(e) {
    var d = Math.abs(this.mouse.initX - e.clientX);
    this.value = this.scale(d);
    this.elem.textContent = this.value;
};

Control.prototype.scale = function(diff) {
    return (this.range.max - this.range.min) * (diff/this.domain) + this.range.max;
};

module.exports = Control;

//var domControl = document.getElementById('control');
//var testControl = new Control(domControl, 5, 10, 0);
