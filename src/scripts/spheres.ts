import * as d3 from "d3";

export interface Representation {
	plot: (values: number[]) => void;
}

export class Spheres implements Representation {
	el: any;
	rect: any;
	constructor(selector: string) {
		this.el = d3.select(selector);
		this.rect = document.querySelector(selector).getBoundingClientRect();
	};

	plot(vals: number[]): void {
		let m = 10; //margin

		let x = d3.scale.linear()
			.domain(d3.extent(vals))
			.range([0 + m, this.rect.width - m]);

		let y = d3.scale.linear()
				.domain([0, vals.length])
				.range([this.rect.height - m, m]);

		this.el.append('g').selectAll('circle')		
			.data(vals)
			.enter()
			.append('circle')
				.attr('cx', (_, i) => x(i))
				.attr('cy', y)
				.attr('fill-color', 'green')
				.attr('r', m/2);
	};
};
