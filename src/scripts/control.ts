interface Raton {
	down: boolean;
	initX: number;
}

interface Rango {
	min: number;
	max: number;
	quot: number;
}

interface Subscriber {
}

export class Control {
	elem: Element;
	mouse: Raton;
	range: Rango;
	param: number;
	init: number; max: number; min: number;
	subscribers: {(n: number): void;}[];

	constructor(selector: string, init: number, max: number, min: number) {
		this.elem = <Element>document.querySelector(selector);
		this.elem.textContent = init.toString();
		this.elem.addEventListener('mousedown', this.mousedown.bind(this), false);
		this.init = init; this.max = max; this.min = min;
	}

	private mousedown(e): Control {
		if (this.mouse.down) return;
		this.mouse= {down: true, initX:e.clientX};
        document.addEventListener('mousemove', this.mousemove.bind(this), false);
        document.addEventListener('mouseup', this.mouseup.bind(this), false);
        document.body.className = 'cursor';
	}

	private mousemove(e): void {
		let d: number = Math.floor(this.mouse.initX - e.clientX)/62;
		if ((this.init + d) != parseInt(this.elem.textContent)) {
			this.calcValue(d);
			this.elem.textContent = this.param.toString();
			this.subscribers.forEach( fn => {fn(this.param)}, this);
		}
	}

	private calcValue(v: number): void {
		let param = this.init + v;
		this.param = (param > this.max || param < this.min) ? this.param : param;
	}

	private mouseup(e): void {
		this.mouse.down = false;
		document.removeEventListener('mousemove');
		document.removeEventListener('mouseup');
		document.body.className = '';
	}

	public map(fn: (par: number) => void): Control{
		this.subscribers.push(fn);
		return this;
	}

}
